// @ts-nocheck
import { Entity, OAuth, Response } from "megalodon";
import * as Atproto from "@atproto/api";
import { refreshSession, getPopular, getProfile, getProfiles, getTimeline, listNotifications, getPosts, getPostThread, getAuthorFeed, createRecord, getRecord, deleteRecord, searchActors, listRecords } from "./Xrpc";
import MastodonAPI from "megalodon/lib/src/mastodon/api_client";
import * as Session from "../../../util/session";
import { NOTIFICATION_TYPE } from "../../../util/notification";
import TaskQueue from "../../../util/taskQueue";

import { appName } from "../../../constants/login";

const SESSION_EXPIREDTIMESEC = 30 * 60 * 1000;
export default class blueSkyGenerator{
    baseUrl: string;
    accessToken: {
        did: string;
        handle: string;
        email: string;
        accessJwt: string;
        refreshJwt: string;
        createdAt: string; // ISO8601
    };

    constructor(baseUrl: string, accessToken: string = "") {
        this.baseUrl = baseUrl;
        this.accessToken = JSON.parse(accessToken);
    }

    async refresh(){
        // 30分が経っている時に強制的にセッションを更新する
        if (new Date().getTime() - new Date(this.accessToken.createdAt).getTime() > SESSION_EXPIREDTIMESEC) {
            const newSession = await refreshSession(this.baseUrl, this.accessToken.refreshJwt);
            console.log("Session Refreshed.");
            this.accessToken = JSON.parse(newSession);
            Session.refreshToken(newSession);
        }
    }

    async createApp(client_name: string, params: { scopes: string[], redirect_uris: string }): Promise<OAuth.AppData> {
        throw new Error("Method not implemented.");
    }

    async fetchAccessToken(client_id: string | null, client_secret: string, code: string, redirect_uri?: string): Promise<OAuth.TokenData> {
        throw new Error("Method not implemented.");
    }

    async getInstance(): Promise<Response<Entity.Instance>> {
        return {
            data: MastodonAPI.Converter.instance(
                {
                    uri: this.baseUrl,
                    title: "Bluesky",
                    description: "Bluesky",
                    email: "",
                    urls: {
                        streaming_api: "DUMMY",
                    },
                }
            ),
            status: 200,
            statusText: "",
            headers: {},
        };
    }   

    async verifyAccountCredentials(): Promise<Response<Entity.Account>> {
        await this.refresh();
        const profile = await getProfile(this.baseUrl, this.accessToken.accessJwt, this.accessToken.did);
        const account = MastodonAPI.Converter.account({
            id: profile.did,
            username: profile.handle,
            acct: profile.handle,
            display_name: profile.displayName ?? "",
            followers_count: profile.followersCount,
            following_count: profile.followsCount,
            statuses_count: profile.postsCount,
            note: profile.description,
            avatar: profile.avatar,
            url: generateProfileUrl(profile.handle),
        });
        return {
            data: account,
            status: 200,
            statusText: "",
            headers: {},
        };
    }
    async getTimeline(type: "timeline"|"popular"|"authorFeed", options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        await this.refresh();
        let cursor: any, feed: any;

        if (type === "popular") {
            ({ cursor, feed } = await getPopular(this.baseUrl, this.accessToken.accessJwt, options.max_id, options.limit));
        } else if (type === "authorFeed") {
            ({ cursor, feed } = await getAuthorFeed(this.baseUrl, this.accessToken.accessJwt, this.accessToken.did, options.max_id, options.limit));
        } else {
            ({ cursor, feed } = await getTimeline(this.baseUrl, this.accessToken.accessJwt, options.max_id, options.limit));
            // 自分以外のmetionの場合は除外
            feed = feed.filter((item) => {
                if (item.reply && item.reply.parent && item.reply.parent.author.did !== this.accessToken.did) {
                    return false;
                }
                return true;
            });
        }

        let status = [];
        const queue = new TaskQueue(20, 30);
        for (let i = 0; i < feed.length; i++) {
            const { post, reason } = feed[i];
            if (reason && reason.$type === "app.bsky.feed.defs#reasonRepost") {
                const task = async () => {
                    status[i] = MastodonAPI.Converter.status({
                        id: post.uri + "#repost-for-" + reason.by.did,
                        uri: post.uri,
                        url: generatePostUrl(post.author.handle, post.cid),
                        account: MastodonAPI.Converter.account({
                            id: reason.by.did,
                            username: reason.by.handle,
                            acct: reason.by.handle,
                            display_name: reason.by.displayName ?? "",
                            avatar: reason.by.avatar,
                            url: generateProfileUrl(reason.by.handle),
                        }),
                        in_reply_to_account_id: post.record && post.record.reply && post.record.reply.parent && post.record.reply.parent.uri ? postUriToDid(post.record.reply.parent.uri) : null,
                        in_reply_to_id: post.record && post.record.reply && post.record.reply.parent && post.record.reply.parent.uri ? post.record.reply.parent.uri : null,
                        content: post.record.text,
                        replies_count: post.replyCount,
                        reblogs_count: post.repostCount,
                        favourites_count: post.likeCount,
                        created_at: post.indexedAt,
                        reblog: await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did),
                    });
                };
                queue.pushTask(task);
            } else {
                const task = async () => {
                    status[i] = await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did);
                };
                queue.pushTask(task);
            }
        }

        await queue.wait();

        if (cursor) {
            status[status.length - 1].cursor = cursor;
        }

        return {
            data: status,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getHomeTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        await this.refresh();
        return this.getTimeline("timeline", options);
    }

    async getLocalTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        await this.refresh();
        return this.getTimeline("authorFeed", options);
    }

    async getPublicTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        await this.refresh();
        return this.getTimeline("popular", options);
    }

    async getNotifications(options: { limit?: number, max_id?: string, seenAt?: Date }): Promise<Response<Entity.Notification[]>> {
        await this.refresh();
        const { cursor, notifications } = await listNotifications(this.baseUrl, this.accessToken.accessJwt, options.seenAt, options.max_id, options.limit);
        
        const uris = [];
        for (const notification of notifications) {
            if ((notification.reason === "like" && notification.record.$type === "app.bsky.feed.like") ||
                (notification.reason === "repost" && notification.record.$type === "app.bsky.feed.repost")
            ) {
                if (uris.includes(notification.record.subject.uri)) {
                    continue;
                }
                uris.push(notification.record.subject.uri);
            }
        }
        const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, uris);

        const mNotifications = [];
        for (const notification of notifications) {
            if ((notification.reason === "like" && notification.record.$type === "app.bsky.feed.like") ||
                (notification.reason === "repost" && notification.record.$type === "app.bsky.feed.repost")
            ) {
                // get posts
                const post = posts.find((p) => p.uri === notification.record.subject.uri);
                if (!post) {
                    continue;
                }
                if (notification.reason === "like" && typeof notification.record.emoji === "string"){
                    const mNotification = MastodonAPI.Converter.notification({
                        id: notification.uri,
                        account: MastodonAPI.Converter.account({
                            id: notification.author.did,
                            username: notification.author.handle,
                            acct: notification.author.handle,
                            display_name: notification.author.displayName ?? "",
                            avatar: notification.author.avatar,
                            url: generateProfileUrl(notification.author.handle),
                        }),
                        emoji: notification.record.emoji,
                        status: await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did),
                        type: NOTIFICATION_TYPE.EMOJIREACTION,
                        created_at: notification.indexedAt,
                    });
                    mNotification.account.emojis = [MastodonAPI.Converter.emoji({
                        shortcode: notification.record.emoji,
                        url: notification.record.emoji,
                    })];
                    mNotification.emoji = notification.record.emoji;
                    mNotifications.push(mNotification);
                    continue;
                }
                mNotifications.push(MastodonAPI.Converter.notification({
                    id: notification.uri,
                    account: MastodonAPI.Converter.account({
                        id: notification.author.did,
                        username: notification.author.handle,
                        acct: notification.author.handle,
                        display_name: notification.author.displayName ?? "",
                        avatar: notification.author.avatar,
                        url: generateProfileUrl(notification.author.handle),
                    }),
                    status: await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did),
                    type: notification.reason === "like" ? NOTIFICATION_TYPE.FAVOURITE : NOTIFICATION_TYPE.BOOST,
                    created_at: notification.indexedAt,
                }));

            }
            if (notification.reason === "follow" && notification.record.$type === "app.bsky.graph.follow"){
                mNotifications.push(MastodonAPI.Converter.notification({
                    id: notification.uri,
                    account: MastodonAPI.Converter.account({
                        id: notification.author.did,
                        username: notification.author.handle,
                        acct: notification.author.handle,
                        display_name: notification.author.displayName ?? "",
                        avatar: notification.author.avatar,
                        url: generateProfileUrl(notification.author.handle),
                    }),
                    type: NOTIFICATION_TYPE.FOLLOW,
                    created_at: notification.indexedAt,
                }));
            }
            if (notification.reason === "reply" && notification.record.$type === "app.bsky.feed.post"){
                const uri = notification.uri;
                const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, [uri]);
                const post = posts.find((p) => p.uri === uri);
                if (!post) {
                    continue;
                }
                mNotifications.push(MastodonAPI.Converter.notification({
                    id: notification.uri,
                    account: MastodonAPI.Converter.account({
                        id: notification.author.did,
                        username: notification.author.handle,
                        acct: notification.author.handle,
                        display_name: notification.author.displayName ?? "",
                        avatar: notification.author.avatar,
                        url: generateProfileUrl(notification.author.handle),
                    }),
                    status: await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did),
                    type: NOTIFICATION_TYPE.MENTION,
                    created_at: notification.indexedAt,
                }));
            }
        }
        
        if (cursor) {
            mNotifications[mNotifications.length - 1].cursor = cursor;
        }
    
        return {
            data: mNotifications,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getFavourites(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        await this.refresh();
        const type = "app.bsky.feed.like";
        const { cursor, records } = await listRecords(this.baseUrl, this.accessToken.accessJwt, type, this.accessToken.did, options.max_id, options.limit);
        const uris = [];
        const status = [];
        for (const { value } of records) {
            const record = value as Atproto.AppBskyFeedLike.Record;
            if (record.$type !== "app.bsky.feed.like") {
                continue;
            }
            if (uris.includes(record.subject.uri)) {
                continue;
            }
            uris.push(record.subject.uri);
        }
        // urisを20個ずつに分割
        const uriChunks = [];
        for (let i = 0; i < uris.length; i += 20) {
            uriChunks.push(uris.slice(i, i + 20));
        }
        const posts = [];
        for (const uris of uriChunks) {
            const { posts: posts20 } = await getPosts(this.baseUrl, this.accessToken.accessJwt, uris);
            posts.push(...posts20);
        }
        const queue = new TaskQueue(20, 30);
        for (const { value } of records) {
            const record = value as Atproto.AppBskyFeedLike.Record;
            const post = posts.find((p) => p.uri === record.subject.uri);
            if (post) {
                const task = async () => {
                    status.push(await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did));
                };
                queue.pushTask(task);
            }
        }

        await queue.wait();
        
        if (cursor) {
            status[status.length - 1].cursor = cursor;
        }
        return {
            data: status,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getBookmarks(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        return {
            data: [],
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async postStatus(status: string, options: { in_reply_to_id?: string, media_ids?: string[], sensitive?: boolean, spoiler_text?: string, visibility?: "public" | "unlisted" | "private" | "direct", quote_id?: string }): Promise<Response<Entity.Status>> {
        await this.refresh();
        const type = "app.bsky.feed.post";
        let reply = undefined;
        if (options.in_reply_to_id) {
            const { thread } = await getPostThread(this.baseUrl, this.accessToken.accessJwt, options.in_reply_to_id);
            let root = thread;
            while (root.parent) {
                root = root.parent as typeof root;
            }
            reply = {
                root: {
                    cid: root.post.cid,
                    uri: root.post.uri,
                },
                parent: {
                    cid: thread.post.cid,
                    uri: thread.post.uri,
                },
            };
        }
        const images = options.media_ids ? options.media_ids.map((data) => {
            return {
                alt: "",
                image: JSON.parse(data).blob,
            };
        }) : undefined;
        let embed = images ? {
            $type: "app.bsky.embed.images",
            images,
        } : undefined as Atproto.AppBskyEmbedImages.View | Atproto.AppBskyEmbedRecord.View | Atproto.AppBskyEmbedRecordWithMedia.View | undefined;
        if (options.quote_id) {
            const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, [options.quote_id]);
            if (posts.length > 0) {
                const post = posts[0];
                if (embed){
                    embed = {
                        $type: "app.bsky.embed.recordWithMedia",
                        record: {
                            $type: "app.bsky.embed.record",
                            record: {
                                cid: post.cid,
                                uri: post.uri,
                            }
                        },
                        media: embed,
                    };
                } else {
                    embed = {
                        $type: "app.bsky.embed.record",
                        record: {
                            cid: post.cid,
                            uri: post.uri,
                        },
                    };
                }
            }
        }
        const { uri } = await createRecord(this.baseUrl, this.accessToken.accessJwt, type, {
            $type: type,
            createdAt: new Date().toISOString(),
            text: status,
            via: appName,
            embed,
            reply,
        },
        this.accessToken.did,
        );
        const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, [uri]);
        if (posts.length === 0) {
            return {
                data: {},
                status: 404,
                statusText: "",
                headers: {},
            };
        }
        const post = posts[0];
        return {
            data: convertStatuse(post, this.accessToken.did),
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getStatus(uri: string): Promise<Response<Entity.Status>> {
        await this.refresh();
        const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, [uri]);
        if (posts.length === 0) {
            return {
                data: {},
                status: 404,
                statusText: "",
                headers: {},
            };
        }
        const post = posts[0];
        return {
            data: await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did),
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getStatusContext(uri: string): Promise<Response<Entity.Context>> {
        await this.refresh();
        const ancestors = [];
        const descendants = [];
        const { thread } = await getPostThread(this.baseUrl, this.accessToken.accessJwt, uri);
        let parent = thread;
        while (parent.parent) {
            const post = (parent.parent as typeof parent).post;
            ancestors.unshift(await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did));
            parent = parent.parent as typeof parent;
        }

        if (thread && (thread.replies as typeof parent[]).length > 0) {
            for (const reply of thread.replies as typeof parent[]) {
                const post = reply.post;
                descendants.push(await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did));
            }
        }
        return {
            data: {
                ancestors,
                descendants,
            },
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async deleteStatus(uri: string): Promise<Response<Entity.Status>> {
        await this.refresh();
        const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, [uri]);
        if (posts.length === 0) {
            return {
                data: {},
                status: 404,
                statusText: "",
                headers: {},
            };
        }
        const post = posts[0];
        const type = "app.bsky.feed.post";
        const rkey = post.uri.split("/").pop();
        await deleteRecord(this.baseUrl, this.accessToken.accessJwt, type, rkey, this.accessToken.did);
        return {
            data: await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did),
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async reblogStatus(uri: string): Promise<Response<Entity.Status>> {
        await this.refresh();
        uri = deleteSharp(uri);
        const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, [uri]);
        if (posts.length === 0) {
            return {
                data: {},
                status: 404,
                statusText: "",
                headers: {},
            };
        }
        const post = posts[0];
        const type = "app.bsky.feed.repost";
        await createRecord(this.baseUrl, this.accessToken.accessJwt, type, {
            $type: type,
            via: appName,
            createdAt: new Date().toISOString(),
            subject: {
                cid: post.cid,
                uri: post.uri,
            },
        },
        this.accessToken.did,
        );
        const data = await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did);
        data.reblogged = true;
        return {
            data,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async unreblogStatus(uri: string): Promise<Response<Entity.Status>> {
        await this.refresh();
        uri = deleteSharp(uri);
        const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, [uri]);
        if (posts.length === 0 || !posts[0].viewer.repost) {
            return {
                data: {},
                status: 404,
                statusText: "",
                headers: {},
            };
        }
        const post = posts[0];
        const type = "app.bsky.feed.repost";
        const rkey = post.viewer.repost.split("/").pop();

        await deleteRecord(this.baseUrl, this.accessToken.accessJwt, type, rkey, this.accessToken.did);
        const data = await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did);
        data.reblogged = false;
        return {
            data,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async favouriteStatus(uri: string): Promise<Response<Entity.Status>> {
        return this.favouriteStatusWithEmoji(uri);
    }

    private async favouriteStatusWithEmoji(uri: string, emoji?: string): Promise<Response<Entity.Status>> {
        await this.refresh();
        uri = deleteSharp(uri);
        const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, [uri]);
        if (posts.length === 0) {
            return {
                data: {},
                status: 404,
                statusText: "",
                headers: {},
            };
        }
        const post = posts[0];
        const type = "app.bsky.feed.like";
        await createRecord(this.baseUrl, this.accessToken.accessJwt, type, {
            $type: type,
            via: appName,
            emoji: emoji,
            createdAt: new Date().toISOString(),
            subject: {
                cid: post.cid,
                uri: post.uri,
            }
        },
        this.accessToken.did,
        );
        const data = await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did);
        data.favourited = true;
        return {
            data,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async unfavouriteStatus(uri: string): Promise<Response<Entity.Status>> {
        await this.refresh();
        uri = deleteSharp(uri);
        const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, [uri]);
        if (posts.length === 0 || !posts[0].viewer.like) {
            return {
                data: {},
                status: 404,
                statusText: "",
                headers: {},
            };
        }
        const post = posts[0];
        const type = "app.bsky.feed.like";
        const rkey = post.viewer.like.split("/").pop();

        await deleteRecord(this.baseUrl, this.accessToken.accessJwt, type, rkey, this.accessToken.did);
        const data = await convertStatuseWithQuotePost(this.baseUrl, this.accessToken.accessJwt, post, this.accessToken.did);
        data.favourited = false;
        return {
            data,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async bookmarkStatus(id: string): Promise<Response<Entity.Status>> {
        throw new Error("Method not implemented.");
    }

    async unbookmarkStatus(id: string): Promise<Response<Entity.Status>> {
        throw new Error("Method not implemented.");
    }

    async createEmojiReaction(uri: string, emoji: string): Promise<Response<Entity.Status>> {
        let status = await this.favouriteStatusWithEmoji(uri, emoji);
        status.data.emoji_reactions = [{
            name: emoji,
            count: 1,
            me: true,
        }];
        status.data.favourited = true;
        status.data.emojis = [];
        return status;
    }

    async deleteEmojiReaction(id: string, name: string): Promise<Response<Entity.Status>> {
        return this.unfavouriteStatus(id);
    }

    async followAccount(did: string): Promise<Response<Entity.Relationship>> {
        await this.refresh();
        const type = "app.bsky.graph.follow";
        await createRecord(this.baseUrl, this.accessToken.accessJwt, type, {
            $type: type,
            via: appName,
            createdAt: new Date().toISOString(),
            subject: did
        },
        this.accessToken.did,
        );
        return {
            data: MastodonAPI.Converter.relationship({
                id: did,
                following: true,
            }),
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async unfollowAccount(did: string): Promise<Response<Entity.Relationship>> {
        await this.refresh();
        const profile = await getProfile(this.baseUrl, this.accessToken.accessJwt, did);
        if (!profile) {
            return {
                data: {},
                status: 404,
                statusText: "",
                headers: {},
            };
        }
        const rkey = profile.viewer.following.split("/").pop();
        const type = "app.bsky.graph.follow";
        await deleteRecord(this.baseUrl, this.accessToken.accessJwt, type, rkey, this.accessToken.did);
        return {
            data: MastodonAPI.Converter.relationship({
                id: did,
                following: false,
            }),
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getRelationships(dids: string[]): Promise<Response<Entity.Relationship[]>> {
        await this.refresh();
        if (dids.length === 0) {
            return {
                data: [],
                status: 200,
                statusText: "",
                headers: {},
            };
        }
        const  { profiles } = await getProfiles(this.baseUrl, this.accessToken.accessJwt, dids);
        if (!profiles || profiles.length === 0) {
            return {
                data: [],
                status: 404,
                statusText: "",
                headers: {},
            };
        }
        const relationships = profiles.map((profile) => {
            return MastodonAPI.Converter.relationship({
                id: profile.did,
                following: profile.viewer.following ? true : false,
                blocking: profile.viewer.blockedBy ? true : false,
                muting: profile.viewer.muted ? true : false,
            });
        }
        );
        return {
            data: relationships,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getInstanceCustomEmojis(): Promise<Response<Entity.Emoji[]>> {
        return {
            data: [],
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getPoll(id: string): Promise<Response<Entity.Poll>> {
        throw new Error("Method not implemented.");
    }

    async getPollVotes(id: string): Promise<Response<Entity.Poll[]>> {
        return [];
    }

    async votePoll(id: string, choices: number[]): Promise<Response<Entity.Poll>> {
        throw new Error("Method not implemented.");
    }

    async search(q: string, type: "accounts" | "hashtags" | "statuses"){
        await this.refresh();
        let accounts = [];
        let statuses = [];
        let hashtags = [];
        // Account Only
        if (type === "accounts"){
            const { actors } = await searchActors(this.baseUrl, this.accessToken.accessJwt, q, 100);
            accounts = actors.map((actor) => {
                return MastodonAPI.Converter.account({
                    id: actor.did,
                    username: actor.handle,
                    acct: actor.handle,
                    display_name: actor.displayName ?? "",
                    avatar: actor.avatar,
                    url: generateProfileUrl(actor.handle),
                });
            });
        }
        return {
            data: {
                accounts,
                statuses,
                hashtags,
            },
            status: 200,
            statusText: "",
            headers: {},
        };
    }
}

async function convertStatuseWithQuotePost(baseUrl: string, accessJWT: string, post: any, myDid: string): Promise<Entity.Status> {
    let status = convertStatuse(post, myDid);
    if (post.embed && (post.embed.$type === "app.bsky.embed.record#view" || post.embed.$type === "app.bsky.embed.recordWithMedia#view")) {
        let uri: string;
        if (post.embed.$type === "app.bsky.embed.record#view"){
            uri = post.embed.record.uri;
        } else if (post.embed.$type === "app.bsky.embed.recordWithMedia#view"){
            uri = post.embed.record.record.uri;
        }
        status = await addQuotePost(baseUrl, accessJWT, status, uri, myDid);
    }

    if (status.favourited){
        const rkey = post.viewer.like.split("/").pop();
        const record = await getRecord(baseUrl, accessJWT, "app.bsky.feed.like", rkey, postUriToDid(post.viewer.like)) as Atproto.AppBskyFeedLike.Record;
        if (record.value && record.value.$type === "app.bsky.feed.like" && typeof record.value.emoji === "string"){
            status.emoji_reactions = [{
                name: record.value.emoji,
                count: 1,
                me: true,
            }];
        }
    }
    return status;
}

async function addQuotePost(baseUrl: string, accessJWT: string, status: Entity.Status, quoteDid: string, myDid: string): Promise<Entity.Status> {
    const { posts } = await getPosts(baseUrl, accessJWT, [quoteDid]);
    if (posts.length === 0) {
        return status;
    }
    const quotePost = posts[0];
    status.reblog = convertStatuse(quotePost, myDid);
    status.quote = true;
    return JSON.parse(JSON.stringify(status));
}

function convertStatuse(post: any, myDid: string): Entity.Status {
    let favourited = false;
    let reblogged = false;
    let application = null;
    if (post.viewer && post.viewer.like && post.viewer.like.includes(myDid)){
        favourited = true;
    }
    if (post.viewer && post.viewer.repost && post.viewer.repost.includes(myDid)){
        reblogged = true;
    }
    if (post.record && typeof post.record.via === "string"){
        application = MastodonAPI.Converter.application({
            name: post.record.via,
        });
    }
    return MastodonAPI.Converter.status({
        id: post.uri,
        uri: post.uri,
        url: generatePostUrl(post.author.handle, post.uri),
        content: post.record.text,
        replies_count: post.replyCount,
        reblogs_count: post.repostCount,
        favourites_count: post.likeCount,
        created_at: post.indexedAt,
        media_attachments: embedImagesToMediaAttachments(post.embed),
        account: MastodonAPI.Converter.account({
            id: post.author.did,
            username: post.author.handle,
            acct: post.author.handle,
            display_name: post.author.displayName ?? "",
            avatar: post.author.avatar,
            url: generateProfileUrl(post.author.handle),
        }),
        in_reply_to_account_id: post.record && post.record.reply && post.record.reply.parent && post.record.reply.parent.uri ? postUriToDid(post.record.reply.parent.uri) : null,
        in_reply_to_id: post.record && post.record.reply && post.record.reply.parent && post.record.reply.parent.uri ? post.record.reply.parent.uri : null,
        favourited,
        reblogged,
        application,
    });

}

function embedImagesToMediaAttachments(embed: { $type: string; images: any; }){
    let mediaAttachments = [];
    if (embed && embed.$type === "app.bsky.embed.images#view"){
        for (const img of embed.images) {
            mediaAttachments.push(MastodonAPI.Converter.attachment({
                id: img.fullsize,
                type: "image",
                url: img.fullsize,
                preview_url: img.thumb,
                remote_url: img.fullsize,
            }));
        }
    }
    if (embed && embed.$type === "app.bsky.embed.recordWithMedia#view" && embed.media.$type === "app.bsky.embed.images#view"){
        for (const img of embed.media.images) {
            mediaAttachments.push(MastodonAPI.Converter.attachment({
                id: img.fullsize,
                type: "image",
                url: img.fullsize,
                preview_url: img.thumb,
                remote_url: img.fullsize,
            }));
        }
    }
    return mediaAttachments;

}

function deleteSharp(uri: string): string {
    return uri.split("#")[0];
}

// uri: at://did:plc:XXXXXXXX/app.bsky.feed.post/XXXXXXXX
// did: did:plc:XXXXXXXX
function postUriToDid(uri: string): string {
    return uri.split("/")[2];
}

// generate URL
// TODO: これは公式のURLです。サードパーティPDSを使用している場合は異なる可能性があります

const BLUESKY_SOCIAL = "bsky.app";
export function generateProfileUrl(handle: string): string {
    return `https://${BLUESKY_SOCIAL}/profile/${handle}`;
}

export function generatePostUrl(handle: string, uri: string): string {
    return `https://${BLUESKY_SOCIAL}/profile/${handle}/post/${uri.split("/").pop()}`;
}