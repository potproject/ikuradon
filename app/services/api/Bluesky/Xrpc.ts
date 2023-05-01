// @ts-nocheck
import axios from "axios";
const xrpc = "xrpc";

export async function createSession(baseUrl: string, identifier: string, password: string): Promise<string> {
    const { data } = await axios.post(getEndpoint(baseUrl, "com.atproto.server.createSession"), {
        identifier,
        password,
    });
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

function getEndpoint(baseUrl: string, endpoint: string) {
    return baseUrl + "/" + xrpc + "/" + endpoint;
}