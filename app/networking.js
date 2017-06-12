import axios from 'axios';
export default class Networking {
    static fetch(domain, api, params = {}, access_token = null) {
        return new Promise(async (resolve, reject) => {
            try {
                let baseurl = "https://" + domain + "";
                let response = await axios({
                    url: baseurl + api.url,
                    method: api.method,
                    headers: this.createHeaders(access_token),
                    params: Object.assign(api.form, params)
                })
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    static createHeaders(access_token = null) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        if (access_token !== null) {
            headers['Authorization'] = "Bearer " + access_token;
        }
        return headers;
    }
}