// @ts-nocheck
import { Entity, OAuth, Response } from "megalodon";
import { refreshSession, getPopular, getProfile, getProfiles, getTimeline, listNotifications, getPosts, getPostThread, createRecord, deleteRecord, searchActors, listRecords } from "./Xrpc";
import MastodonAPI from "megalodon/lib/src/mastodon/api_client";
import * as Session from "../../../util/session";
import { NOTIFICATION_TYPE } from "../../../util/notification";

const SESSION_EXPIREDTIMESEC = 60 * 60 * 1000;
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
        // 1時間が経っている時に強制的にセッションを更新する
        if (new Date().getTime() - new Date(this.accessToken.createdAt).getTime() > SESSION_EXPIREDTIMESEC) {
            refreshSession(this.baseUrl, this.accessToken.refreshJwt).then((newSession) => {
                console.log("Session Refreshed.");
                this.accessToken = JSON.parse(newSession);
                Session.refreshToken(newSession);
            });
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
            data: MastodonAPI.Converter.instance({} as any),
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
        });
        return {
            data: account,
            status: 200,
            statusText: "",
            headers: {},
        };
    }
    async getTimeline(type: "timeline"|"popular", options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        await this.refresh();
        const getTimelineFn = type === "timeline" ? getTimeline : getPopular;
        const { cursor, feed } = await getTimelineFn(this.baseUrl, this.accessToken.accessJwt, options.max_id, options.limit);
        let status = [];
        for (const { post, reason } of feed) {
            if (reason && reason.$type === "app.bsky.feed.defs#reasonRepost") {
                status.push(MastodonAPI.Converter.status({
                    id: post.uri + "#repost-for-" + reason.by.did,
                    uri: post.uri,
                    account: MastodonAPI.Converter.account({
                        id: reason.by.did,
                        username: reason.by.handle,
                        acct: reason.by.handle,
                        display_name: reason.by.displayName ?? "",
                        avatar: reason.by.avatar,
                    }),
                    content: post.record.text,
                    replies_count: post.replyCount,
                    reblogs_count: post.repostCount,
                    favourites_count: post.likeCount,
                    created_at: post.indexedAt,
                    reblog: convertStatuse(post, this.accessToken.did)
                }));
                continue;
            }
            status.push(convertStatuse(post, this.accessToken.did));
        }

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
        return [];
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
                
                mNotifications.push(MastodonAPI.Converter.notification({
                    id: notification.uri,
                    account: MastodonAPI.Converter.account({
                        id: notification.author.did,
                        username: notification.author.handle,
                        acct: notification.author.handle,
                        display_name: notification.author.displayName ?? "",
                        avatar: notification.author.avatar,
                    }),
                    status: convertStatuse(post, this.accessToken.did),
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
                    }),
                    status: convertStatuse(post, this.accessToken.did),
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
            if (value.$type !== "app.bsky.feed.like") {
                continue;
            }
            if (!value.subject || !value.subject.uri || uris.includes(value.subject.uri)) {
                continue;
            }
            uris.push(value.subject.uri);
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
        for (const { value } of records) {
            const post = posts.find((p) => p.uri === value.subject.uri);
            if (post) {
                status.push(convertStatuse(posts.find((p) => p.uri === value.subject.uri), this.accessToken.did));
            }
        }
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
        return [];
    }

    async postStatus(status: string, options: { in_reply_to_id?: string, media_ids?: string[], sensitive?: boolean, spoiler_text?: string, visibility?: "public" | "unlisted" | "private" | "direct" }): Promise<Response<Entity.Status>> {
        await this.refresh();
        const type = "app.bsky.feed.post";
        let reply = undefined;
        if (options.in_reply_to_id) {
            const { thread } = await getPostThread(this.baseUrl, this.accessToken.accessJwt, options.in_reply_to_id);
            let root = thread;
            while (root.parent) {
                root = root.parent;
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
        const embed = images ? {
            $type: "app.bsky.embed.images",
            images,
        } : undefined;
        const { uri } = await createRecord(this.baseUrl, this.accessToken.accessJwt, type, {
            $type: type,
            createdAt: new Date().toISOString(),
            text: status,
            embed,
            reply,
        },
        this.accessToken.did,
        );
        const { posts } = await getPosts(this.baseUrl, this.accessToken.accessJwt, uri);
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
            data: convertStatuse(post, this.accessToken.did),
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getStatusContext(uri: string): Promise<Response<Entity.Context>> {
        await this.refresh();
        const ancestors = [];
        const descendants = [];
        const { thread } = await getPostThread(this.baseUrl, this.accessToken.accessJwt, [uri]);
        let parent = thread;
        while (parent.parent) {
            const post = parent.parent.post;
            ancestors.unshift(convertStatuse(post, this.accessToken.did));
            parent = parent.parent;
        }

        if (thread && thread.replies.length > 0) {
            for (const reply of thread.replies) {
                const post = reply.post;
                descendants.push(convertStatuse(post, this.accessToken.did));
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
            data: convertStatuse(post, this.accessToken.did),
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
            createdAt: new Date().toISOString(),
            subject: {
                cid: post.cid,
                uri: post.uri,
            }
        },
        this.accessToken.did,
        );
        const data = convertStatuse(post, this.accessToken.did);
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
        const data = convertStatuse(post, this.accessToken.did);
        data.reblogged = false;
        return {
            data,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async favouriteStatus(uri: string): Promise<Response<Entity.Status>> {
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
            createdAt: new Date().toISOString(),
            subject: {
                cid: post.cid,
                uri: post.uri,
            }
        },
        this.accessToken.did,
        );
        const data = convertStatuse(post, this.accessToken.did);
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
        const data = convertStatuse(post, this.accessToken.did);
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

    async createEmojiReaction(id: string, name: string): Promise<Response<Entity.Status>> {
        throw new Error("Method not implemented.");
    }

    async deleteEmojiReaction(id: string, name: string): Promise<Response<Entity.Status>> {
        throw new Error("Method not implemented.");
    }

    async followAccount(did: string): Promise<Response<Entity.Relationship>> {
        await this.refresh();
        const type = "app.bsky.graph.follow";
        await createRecord(this.baseUrl, this.accessToken.accessJwt, type, {
            $type: type,
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
        return [];
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

function convertStatuse(post: any, did: string): Entity.Status {
    let favourited = false;
    let reblogged = false;
    if (post.viewer && post.viewer.like && post.viewer.like.includes(did)){
        favourited = true;
    }
    if (post.viewer && post.viewer.repost && post.viewer.repost.includes(did)){
        reblogged = true;
    }
    return MastodonAPI.Converter.status({
        id: post.uri,
        uri: post.uri,
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
        }),
        favourited,
        reblogged
    });

}

function embedImagesToMediaAttachments(embed){
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
    return mediaAttachments;

}

function deleteSharp(uri: string): string {
    return uri.split("#")[0];
}