import "text-encoding-polyfill";
import { BskyAgent } from "@atproto/api";
import { Entity, OAuth, Response } from "megalodon";

export default class blueSkyGenerator{
    baseUrl: string;
    identifier: string;
    password: string;
    agent?: BskyAgent;

    constructor(baseUrl: string, access_token: string = "") {
        this.baseUrl = baseUrl;
        const [identifier, password] = access_token.split(":");
        this.identifier = identifier;
        this.password = password;
    }

    async setAgent() {
        console.log("setAgent");
        const agent = new BskyAgent({
            service: new URL("https://" + this.baseUrl),
        });
        console.log("setAgent2", this.identifier, this.password);
        await agent.login({
            identifier: this.identifier,
            password: this.password,
        });
        console.log("setAgent3");
        this.agent = agent;
    }

    async createApp(client_name: string, params: { scopes: string[], redirect_uris: string }): Promise<OAuth.AppData> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async fetchAccessToken(client_id: string | null, client_secret: string, code: string, redirect_uri?: string): Promise<OAuth.TokenData> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async getInstance(): Promise<Response<Entity.Instance>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }   

    async verifyAccountCredentials(): Promise<Response<Entity.Account>> {
        if (!this.agent) {await this.setAgent()}
        const profile = await this.agent.getProfile({
            actor: this.identifier,
        });
        console.log(profile);
        return {
            data: {
                id: profile.data.did,
            },
        };
    }

    async getHomeTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        if (!this.agent) {await this.setAgent()}
        return [];
    }

    async getLocalTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        if (!this.agent) {await this.setAgent()}
        return [];
    }

    async getPublicTimeline(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        if (!this.agent) {await this.setAgent()}
        return [];
    }

    async getNotifications(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Notification[]>> {
        if (!this.agent) {await this.setAgent()}
        return [];
    }

    async getFavourites(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        if (!this.agent) {await this.setAgent()}
        return [];
    }

    async getBookmarks(options: { limit?: number, max_id?: string, since_id?: string }): Promise<Response<Entity.Status[]>> {
        if (!this.agent) {await this.setAgent()}
        return [];
    }

    async postStatus(status: string, options: { in_reply_to_id?: string, media_ids?: string[], sensitive?: boolean, spoiler_text?: string, visibility?: "public" | "unlisted" | "private" | "direct" }): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async getStatus(id: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async getStatusContext(id: string): Promise<Response<Entity.Context>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async deleteStatus(id: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async reblogStatus(id: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async unreblogStatus(id: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async favouriteStatus(id: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async unfavouriteStatus(id: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async bookmarkStatus(id: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async unbookmarkStatus(id: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async createEmojiReaction(id: string, name: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async deleteEmojiReaction(id: string, name: string): Promise<Response<Entity.Status>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async followAccount(id: string): Promise<Response<Entity.Relationship>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async unfollowAccount(id: string): Promise<Response<Entity.Relationship>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async getRelationships(ids: string[]): Promise<Response<Entity.Relationship[]>> {
        if (!this.agent) {await this.setAgent()}
        return [];
    }

    async getInstanceCustomEmojis(): Promise<Response<Entity.Emoji[]>> {
        if (!this.agent) {await this.setAgent()}
        return [];
    }

    async getPoll(id: string): Promise<Response<Entity.Poll>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }

    async getPollVotes(id: string): Promise<Response<Entity.Poll[]>> {
        if (!this.agent) {await this.setAgent()}
        return [];
    }

    async votePoll(id: string, choices: number[]): Promise<Response<Entity.Poll>> {
        if (!this.agent) {await this.setAgent()}
        return {};
    }
}