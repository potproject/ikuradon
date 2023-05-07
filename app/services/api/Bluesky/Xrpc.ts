// @ts-nocheck
import axios from "axios";
const xrpc = "xrpc";

export async function createSession(baseUrl: string, identifier: string, password: string): Promise<string> {
    const { data } = await axios.post(getEndpoint(baseUrl, "com.atproto.server.createSession"), {
        identifier,
        password,
    });
    data.createdAt = new Date().toISOString();
    return JSON.stringify(data);
}

export async function refreshSession(baseUrl:string, accessJwt: string): Promise<string> {
    const { data } = await axios.post(getEndpoint(baseUrl, "com.atproto.server.refreshSession"), null, {
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }).catch((e) => {
        console.log(e.response.data.message);
        throw e;
    });
    data.createdAt = new Date().toISOString();
    return JSON.stringify(data);
}

export async function getProfile(baseUrl: string, accessJwt: string, did: string) {
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.actor.getProfile"), {
        params: {
            actor: did,
        },
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    });

    return data;
}

export async function getProfiles(baseUrl: string, accessJwt: string, dids: string[]) {
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.actor.getProfiles"), {
        params: {
            actors: dids,
        },
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    });
    return data;
}

export async function getTimeline(baseUrl: string, accessJwt: string, cursor: string = "", limit: number = 20, algorithm: string = "reverse-chronological") {
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.feed.getTimeline"), {
        params: {
            algorithm,
            limit,
            cursor,
        },
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    });
    return data;
}

export async function getPopular(baseUrl: string, accessJwt: string, cursor: string = "", limit: number = 20, algorithm: string = "reverse-chronological") {
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.unspecced.getPopular"), {
        params: {
            algorithm,
            limit,
            cursor,
        },
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    });

    return data;
}


export async function listNotifications(baseUrl: string, accessJwt: string, seenAt: Date|null, cursor: string = "", limit: number = 20) {
    const strSeenAt = seenAt ? seenAt.toISOString() : null;
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.notification.listNotifications"), {
        params: {
            seenAt: strSeenAt,
            limit,
            cursor,
        },
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    });

    return data;
}

export async function getPosts(baseUrl: string, accessJwt: string, uris: string[]) {
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.feed.getPosts"), {
        params: {
            uris,
        },
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }).catch((e) => {
        throw e;
    });

    return data;
}


export async function getPostThread(baseUrl: string, accessJwt: string, uri: string) {
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.feed.getPostThread"), {
        params: {
            uri,
        },
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    });

    return data;
}

type collectionType = "app.bsky.feed.like" | "app.bsky.feed.repost" | "app.bsky.feed.post";
type recordType = {
    $type: collectionType,
    createdAt: string,
    subject: {
        cid: string,
        uri: string,
    } | undefined,
    text: string | undefined, // only for app.bsky.feed.post
    reply: {
        root: {
            cid: string,
            uri: string,
        },
        parent: {
            cid: string,
            uri: string,
        },
    } | undefined, // only for app.bsky.feed.post
    embed: embedType | undefined, // embed image. only for app.bsky.feed.post
}

type embedType = {
    $type: string,
    images: {
        alt: string,
        image: any
    }[],
}

export async function listRecords(baseUrl: string, accessJwt: string, collection: collectionType, repo: string, cursor: string = "", limit: number = 20) {
    const { data } = await axios.get(getEndpoint(baseUrl, "com.atproto.repo.listRecords"), {
        params: {
            collection,
            repo,
            limit,
            cursor,
        },
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }).catch((e) => {
        throw e;
    }
    );
    return data;
}

export async function createRecord(baseUrl: string, accessJwt: string, collection: collectionType, record: recordType, repo: string){
    const { data } = await axios.post(getEndpoint(baseUrl, "com.atproto.repo.createRecord"), {
        collection,
        record,
        repo,
    }, {
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }).catch((e) => {
        throw e;
    });
    return data;
}

export async function deleteRecord(baseUrl: string, accessJwt: string, collection: collectionType, rkey: string, repo: string){
    const { data } = await axios.post(getEndpoint(baseUrl, "com.atproto.repo.deleteRecord"), {
        collection,
        rkey,
        repo,
    }, {
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    }).catch((e) => {
        throw e;
    });
    return data;
}

export async function searchActors(baseUrl: string, accessJwt: string, term: string, limit: number = 20, cursor: string = "") {
    const { data } = await axios.get(getEndpoint(baseUrl, "app.bsky.actor.searchActors"), {
        params: {
            term,
            limit,
            cursor,
        },
        headers: {
            Authorization: "Bearer " + accessJwt,
        },
    });
    return data;
}

function getEndpoint(baseUrl: string, endpoint: string) {
    return baseUrl + "/" + xrpc + "/" + endpoint;
}