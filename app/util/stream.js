import * as CONST_API from "../constants/api";
import { start, stop, receive } from "../actions/actioncreators/streaming";

export function getStreamingURL(streamingAPI, type, access_token){
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
    return streamingAPI + CONST_API.STREAMING.url + "?access_token=" + access_token + "&stream=" + stream;
}

export function on(ref, dispatch, useEnabled, type, url){
    ref.current = new WebSocket(url);
    ref.current.onopen = () => {
        // connection opened
        console.log("[WS] OPEN:" + type);
    };
    ref.current.onmessage = (message) => {
        try {
            let data = JSON.parse(message.data);
            let { event, payload } = data;
            dispatch(receive(type, event, JSON.parse(payload)));
        } catch (e){
            console.log("[WS] MESSAGE JSON Parse Error:" + e.message);
        }
    };
    ref.current.onclose = (event) => {
        console.log("[WS] CLOSE:" + type + " event:" + JSON.stringify(event));
        dispatch(stop(type));
        useEnabled(false);
    };
    ref.current.onerror = (event) => {
        console.log("[WS] ERROR:" + type + " event:" + JSON.stringify(event));
    };
    dispatch(start(type));
}

export function off(ref, dispatch, useEnabled, type){
    dispatch(stop(type));
    if (ref.current !== null && ref.current.readyState === WebSocket.OPEN){
        ref.current.close();
    }
    useEnabled(false);
}