import { STREAMING } from "../constants/api";
import { start, stop, receive } from "../actions/actioncreators/streaming";

export function on(webSocket, dispatch, useEnabled, type, instance, access_token){
    // ON
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
    let url = instance.urls.streaming_api + STREAMING.url + "?access_token=" + access_token + "&stream=" + stream;
    webSocket.current = new WebSocket(url);
    webSocket.current.onopen = () => {
        // connection opened
        console.log("[WS] OPEN:" + type);
    };
    webSocket.current.onmessage = (message) => {
        let data = JSON.parse(message.data);
        if (data !== null){
            let { event, payload } = data;
            dispatch(receive(type, event, JSON.parse(payload)));
        }
    };
    webSocket.current.onclose = (event) => {
        console.log("[WS] CLOSE:" + type + " event:" + JSON.stringify(event));
    };
    webSocket.current.onerror = (event) => {
        console.log("[WS] ERROR:" + type + " event:" + JSON.stringify(event));
        off(webSocket, dispatch, useEnabled, type);
        useEnabled(false);
    };
    dispatch(start(type));
}

export function off(webSocket, dispatch, useEnabled, type){
    dispatch(stop(type));
    if (webSocket.current !== null && webSocket.current.readyState === WebSocket.OPEN){
        webSocket.current.close();
    }
    useEnabled(false);
}