export default class Stream {
    static ws = {
        home: null,
        local: null,
        federal: null
    };
    static init(domain, api, access_token = null, reducerType = "home") {
        let stream;
        switch (reducerType) {
            case "federal":
                stream = "public";
                break;
            case "local":
                stream = "public:local";
            case "home":
            default:
                stream = "user";
                break;
        }
        let url = "wss://" + domain + api.url + "?access_token=" + access_token + "&stream=" + stream;
        this.ws[reducerType] = new WebSocket(url);
    }

    static open(reducerType) {
        return new Promise((resolve, reject) => {
            if (!this.ws[reducerType]) {
                reject();
                return;
            }
            this.ws[reducerType].onopen = () => {
                console.log("[WS]websocket opened:" + reducerType);
                resolve();
            };
            this.ws[reducerType].onerror = () => {
                console.log("[WS]websocket error:" + reducerType);
                reject();
            };
        });
    }

    static receive(callback, reducerType) {
        this.ws[reducerType].onmessage = event => {
            callback(JSON.parse(event.data));
        };
    }

    static close(reducerType) {
        return new Promise(resolve => {
            if (!this.ws[reducerType] || !this.ws[reducerType].close) {
                resolve(1001);
                return;
            }
            this.ws[reducerType].onclose = event => {
                console.log("[WS]websocket closed code:" + event.code + " type:" + reducerType);
                resolve(event.code);
            };
            this.ws[reducerType].close();
        });
    }
}