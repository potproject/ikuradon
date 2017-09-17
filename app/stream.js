export default class Stream {
    constructor(domain, api, access_token = null) {
        this.url = "wss://" + domain + api.url + "?access_token=" + access_token + "&stream=" + api.stream;
        this.ws = new WebSocket(this.url);
    }

    open() {
        return new Promise((resolve) => {
            this.ws.onopen = () => {
                console.log("[WS]websocket opened:" + this.url);
                resolve();
            };
        });
    }

    receive(callback) {
        this.ws.onmessage = (event) => {
           callback(JSON.parse(event.data));
        };
    }

    close() {
        return new Promise((resolve) => {
            this.ws.onclose = (event) => {
                console.log("[WS]websocket closed:" + this.url);
                resolve(event.code);
            };
        });
    }

    error() {
        return new Promise((resolve) => {
            this.ws.onerror = (event) => {
                console.log("[WS]websocket error:" + this.url);
                resolve(event);
            };
        });
    }
}