// @ts-nocheck
import { Entity, OAuth, Response } from "megalodon";
import { getProfile, getTimeline } from "./Xrpc";
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

    async getHomeTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        const { feed } = await getTimeline(this.baseUrl, this.accessToken.accessJwt, options.max_id, options.limit);
        let status = [];
        for (const { post } of feed) {
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
                content: post.record.text,
                replies_count: post.replyCount,
                reblogs_count: post.repostCount,
                favourites_count: post.likeCount,
                created_at: post.indexedAt,
            }));
        }

        return {
            data: status,
            status: 200,
            statusText: "",
            headers: {},
        };
    }

    async getLocalTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        return [];
    }

    async getPublicTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        return [];
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