import * as CONST_API from "../constants/api";
import { start, stop, receive } from "../actions/actioncreators/streaming";
import { sns } from "../constants/sns";
import MisskeyAPI from "megalodon/lib/src/misskey/api_client";


const misskeyTypeMigration = {
    "home":"homeTimeline",
    "local":"localTimeline",
    "federal":"globalTimeline",
};

export function streamSupported(sns: sns){
    return sns === "mastodon" || sns === "misskey";
}

export function on(sns: sns, ref, dispatch, useEnabled, type, url){
    if (sns==="mastodon"){
        return onMastodon(ref, dispatch, useEnabled, type, url);
    }
    if (sns==="misskey"){
        return onMisskey(ref, dispatch, useEnabled, type, url);
    }
}


export function off(sns: sns, ref, dispatch, useEnabled, type){
    if (sns==="mastodon"){
        return offMastodon(ref, dispatch, useEnabled, type);
    }
    if (sns==="misskey"){
        return offMisskey(ref, dispatch, useEnabled, type);
    }
}

export function getStreamingURL(sns: sns, streamingAPI, type, access_token){
    if (sns==="mastodon"){
        return getStreamingMastodonURL(streamingAPI, type, access_token);
    }
    if (sns==="misskey"){
        return getStreamingMisskeyURL(streamingAPI, access_token);
    }
}

export function getStreamingMastodonURL(streamingAPI, type, access_token){
    let stream;
    switch (type) {
        case "federal":
            stream = "public";
            break;
        case "local":
            stream = "public:local";
            break;
        case "home":
        default:
            stream = "user";
            break;
    }
    return streamingAPI + CONST_API.STREAMING_MASTODON.url + "?access_token=" + access_token + "&stream=" + stream;
}

function onMastodon(ref, dispatch, useEnabled, type, url){
    ref.current = new WebSocket(url);
    ref.current.onopen = () => {
        // connection opened
        console.log("[WS-MASTODON] OPEN:" + type);
    };
    ref.current.onmessage = (message) => {
        try {
            let data = JSON.parse(message.data);
            let { event, payload } = data;
            dispatch(receive(type, event, JSON.parse(payload)));
        } catch (e){
            console.log("[WS-MASTODON] MESSAGE JSON Parse Error:" + e.message);
        }
    };
    ref.current.onclose = (event) => {
        console.log("[WS-MASTODON] CLOSE:" + type + " event:" + JSON.stringify(event));
        dispatch(stop(type));
        useEnabled(false);
    };
    ref.current.onerror = (event) => {
        console.log("[WS-MASTODON] ERROR:" + type + " event:" + JSON.stringify(event));
    };
    dispatch(start(type));
}

export function offMastodon(ref, dispatch, useEnabled, type){
    dispatch(stop(type));
    if (ref.current !== null && ref.current.readyState === WebSocket.OPEN){
        ref.current.close();
    }
    useEnabled(false);
}

export function getStreamingMisskeyURL(streamingAPI, access_token){
    return streamingAPI + CONST_API.STREAMING_MISSKEY.url + "?i=" + access_token;
}


function onMisskey(ref, dispatch, useEnabled, type, url){
    const channel = misskeyTypeMigration[type];
    ref.current = new WebSocket(url);
    ref.current.onopen = () => {
        // connection opened
        console.log("[WS-MISSKEY] OPEN:" + type);
        ref.current.send(JSON.stringify({
            type: "connect",
            body: {
                channel: channel,
                id: type,
            }
        }));
    };
    ref.current.onmessage = (message) => {
        try {
            let data = JSON.parse(message.data);
            if (data && data.body && data.body.body){
                const status = MisskeyAPI.Converter.note(data.body.body);
                dispatch(receive(type, "update", status));
            }
        } catch (e){
            console.log("[WS-MISSKEY] MESSAGE JSON Parse Error:" + e.message);
        }
    };
    ref.current.onclose = (event) => {
        console.log("[WS-MISSKEY] CLOSE:" + type + " event:" + JSON.stringify(event));
        dispatch(stop(type));
        useEnabled(false);
    };
    ref.current.onerror = (event) => {
        console.log("[WS-MISSKEY] ERROR:" + type + " event:" + JSON.stringify(event));
    };
    dispatch(start(type));
}

export function offMisskey(ref, dispatch, useEnabled, type){
    dispatch(stop(type));
    if (ref.current !== null && ref.current.readyState === WebSocket.OPEN){
        ref.current.send(JSON.stringify({
            type: "disconnect",
            body: {
                id: type,
            }
        }));
        ref.current.close();
    }
    useEnabled(false);
}