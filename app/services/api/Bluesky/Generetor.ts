// @ts-nocheck
import { Entity, OAuth, Response } from "megalodon";
import { getPopular, getProfile, getTimeline } from "./Xrpc";
import MastodonAPI from "megalodon/lib/src/mastodon/api_client";
export default class blueSkyGenerator{
    baseUrl: string;
    accessToken: {
        did: string;
        handle: string;
        email: string;
        accessJwt: string;
        refreshJwt: string;
    };
    constructor(baseUrl: string, accessToken: string = "") {
        this.baseUrl = baseUrl;
        this.accessToken = JSON.parse(accessToken);
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
        const profile = await getProfile(this.baseUrl, this.accessToken.accessJwt, this.accessToken.did);
        const account = MastodonAPI.Converter.account({
            id: profile.did,
            username: profile.handle,
            acct: profile.handle,
            display_name: profile.displayName,
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
        const getTimelineFn = type === "timeline" ? getTimeline : getPopular;
        const { cursor, feed } = await getTimelineFn(this.baseUrl, this.accessToken.accessJwt, options.max_id, options.limit);
        let status = [];
        for (const { post, reason } of feed) {
            if (reason && reason.$type === "app.bsky.feed.defs#reasonRepost") {
                status.push(MastodonAPI.Converter.status({
                    id: post.cid,
                    uri: post.uri,
                    account: MastodonAPI.Converter.account({
                        id: reason.by.did,
                        username: reason.by.handle,
                        acct: reason.by.handle,
                        display_name: reason.by.displayName,
                        avatar: reason.by.avatar,
                    }),
                    content: post.record.text,
                    replies_count: post.replyCount,
                    reblogs_count: post.repostCount,
                    favourites_count: post.likeCount,
                    created_at: post.indexedAt,
                    reblog: MastodonAPI.Converter.status({
                        id: post.cid,
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
                            display_name: post.author.displayName,
                            avatar: post.author.avatar,
                        }),
                    }),
                }));
                continue;
            }

            status.push(MastodonAPI.Converter.status({
                id: post.cid,
                uri: post.uri,
                account: MastodonAPI.Converter.account({
                    id: post.author.did,
                    username: post.author.handle,
                    acct: post.author.handle,
                    display_name: post.author.displayName,
                    avatar: post.author.avatar,
                }),
                media_attachments: embedImagesToMediaAttachments(post.embed),
                content: post.record.text,
                replies_count: post.replyCount,
                reblogs_count: post.repostCount,
                favourites_count: post.likeCount,
                created_at: post.indexedAt,
            }));
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
        return this.getTimeline("timeline", options);
    }

    async getLocalTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        return [];
    }

    async getPublicTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        return this.getTimeline("popular", options);
    }

    async getNotifications(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Notification[]>> {
        return [];
    }

    async getFavourites(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        return [];
    }

    async getBookmarks(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        return [];
    }

    async postStatus(status: string, options: { in_reply_to_id?: string, media_ids?: string[], sensitive?: boolean, spoiler_text?: string, visibility?: "public" | "unlisted" | "private" | "direct" }): Promise<Response<Entity.Status>> {
        return {};
    }

    async getStatus(id: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async getStatusContext(id: string): Promise<Response<Entity.Context>> {
        return {};
    }

    async deleteStatus(id: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async reblogStatus(id: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async unreblogStatus(id: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async favouriteStatus(id: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async unfavouriteStatus(id: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async bookmarkStatus(id: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async unbookmarkStatus(id: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async createEmojiReaction(id: string, name: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async deleteEmojiReaction(id: string, name: string): Promise<Response<Entity.Status>> {
        return {};
    }

    async followAccount(id: string): Promise<Response<Entity.Relationship>> {
        return {};
    }

    async unfollowAccount(id: string): Promise<Response<Entity.Relationship>> {
        return {};
    }

    async getRelationships(ids: string[]): Promise<Response<Entity.Relationship[]>> {
        return [];
    }

    async getInstanceCustomEmojis(): Promise<Response<Entity.Emoji[]>> {
        return [];
    }

    async getPoll(id: string): Promise<Response<Entity.Poll>> {
        return {};
    }

    async getPollVotes(id: string): Promise<Response<Entity.Poll[]>> {
        return [];
    }

    async votePoll(id: string, choices: number[]): Promise<Response<Entity.Poll>> {
        return {};
    }
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