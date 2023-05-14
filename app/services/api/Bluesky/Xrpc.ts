import axios from "axios";
import * as Atproto from "@atproto/api";
const xrpc = "xrpc";

export async function createSession(baseUrl: string, identifier: string, password: string): Promise<string> {
    const inputs : Atproto.ComAtprotoServerCreateSession.InputSchema = { identifier, password };
    const { data } = await axios.post(getEndpoint(baseUrl, "com.atproto.server.createSession"), inputs) as Atproto.ComAtprotoServerCreateSession.Response;
    data.createdAt = new Date().toISOString();
    return JSON.stringify(data);
}

export async function refreshSession(baseUrl:string, accessJwt: string): Promise<string> {
    const { data } = await axios.post(getEndpoint(baseUrl, "com.atproto.server.refreshSession"), null, {
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.ComAtprotoServerRefreshSession.Response;
    data.createdAt = new Date().toISOString();
    return JSON.stringify(data);
}

export async function getProfile(baseUrl: string, accessJwt: string, did: string) {
    const params : Atproto.AppBskyActorGetProfile.QueryParams = { actor: did };
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.actor.getProfile"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.AppBskyActorGetProfile.Response;

    return data;
}

export async function getProfiles(baseUrl: string, accessJwt: string, dids: string[]) {
    const params : Atproto.AppBskyActorGetProfiles.QueryParams = { actors: dids };
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.actor.getProfiles"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.AppBskyActorGetProfiles.Response;
    return data;
}

export async function getTimeline(baseUrl: string, accessJwt: string, cursor: string = "", limit: number = 20, algorithm: string = "reverse-chronological") {
    const params : Atproto.AppBskyFeedGetTimeline.QueryParams = { algorithm, limit, cursor };
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.feed.getTimeline"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.AppBskyFeedGetTimeline.Response;
    return data;
}

export async function getPopular(baseUrl: string, accessJwt: string, cursor: string = "", limit: number = 20, algorithm: string = "reverse-chronological") {
    const params : Atproto.AppBskyUnspeccedGetPopular.QueryParams = { limit, cursor };
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.unspecced.getPopular"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.AppBskyUnspeccedGetPopular.Response;

    return data;
}


export async function listNotifications(baseUrl: string, accessJwt: string, seenAt: Date|null, cursor: string = "", limit: number = 20) {
    const strSeenAt = seenAt ? seenAt.toISOString() : null;
    const params : Atproto.AppBskyNotificationListNotifications.QueryParams = { limit, cursor, seenAt: strSeenAt };
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.notification.listNotifications"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.AppBskyNotificationListNotifications.Response;

    return data;
}

export async function getPosts(baseUrl: string, accessJwt: string, uris: string[]) {
    const params : Atproto.AppBskyFeedGetPosts.QueryParams = { uris };
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.feed.getPosts"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.AppBskyFeedGetPosts.Response;

    return data;
}


export async function getPostThread(baseUrl: string, accessJwt: string, uri: string) {
    const params : Atproto.AppBskyFeedGetPostThread.QueryParams = { uri };
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.feed.getPostThread"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.AppBskyFeedGetPostThread.Response;

    return data;
}

export async function getAuthorFeed(baseUrl: string, accessJwt: string, did: string, cursor: string = "", limit: number = 20) {
    const params : Atproto.AppBskyFeedGetAuthorFeed.QueryParams = { actor: did, limit, cursor };
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.feed.getAuthorFeed"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.AppBskyFeedGetAuthorFeed.Response;

    return data;
}

type collectionType = "app.bsky.feed.like" | "app.bsky.feed.repost" | "app.bsky.feed.post";
type recordType = {
    $type: collectionType,
    createdAt: string,
    subject?: {
        cid: string,
        uri: string,
    },
    via?: string, // unofficial field
    text?: string, // only for app.bsky.feed.post
    reply?: {
        root: {
            cid: string,
            uri: string,
        },
        parent: {
            cid: string,
            uri: string,
        },
    }, // only for app.bsky.feed.post
    embed?: embedType, // embed image. only for app.bsky.feed.post
}

type embedType = {
    $type: string,
    images: {
        alt: string,
        image: any
    }[],
}

export async function listRecords(baseUrl: string, accessJwt: string, collection: collectionType, repo: string, cursor: string = "", limit: number = 20) {
    const params : Atproto.ComAtprotoRepoListRecords.QueryParams = { collection, repo, cursor, limit };
    const { data } = await axios.get(getEndpoint(baseUrl, "com.atproto.repo.listRecords"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.ComAtprotoRepoListRecords.Response;
    return data;
}

export async function createRecord(baseUrl: string, accessJwt: string, collection: collectionType, record: recordType, repo: string){
    const inputs: Atproto.ComAtprotoRepoCreateRecord.InputSchema = { collection, record, repo };
    const { data } = await axios.post(getEndpoint(baseUrl, "com.atproto.repo.createRecord"), inputs, {
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.ComAtprotoRepoCreateRecord.Response;
    return data;
}

export async function deleteRecord(baseUrl: string, accessJwt: string, collection: collectionType, rkey: string, repo: string){
    const inputs: Atproto.ComAtprotoRepoDeleteRecord.InputSchema = { collection, rkey, repo };
    const { success } = await axios.post(getEndpoint(baseUrl, "com.atproto.repo.deleteRecord"), inputs, {
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.ComAtprotoRepoDeleteRecord.Response;
    return success;
}

export async function searchActors(baseUrl: string, accessJwt: string, term: string, limit: number = 20, cursor: string = "") {
    const params : Atproto.AppBskyActorSearchActors.QueryParams = { term, limit, cursor };
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.actor.searchActors"), {
        params,
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }) as Atproto.AppBskyActorSearchActors.Response;
    return data;
}

function getEndpoint(baseUrl: string, endpoint: string) {
    return baseUrl + "/" + xrpc + "/" + endpoint;
}