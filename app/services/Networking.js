import axios from "axios";
import * as CONST_API from "../constants/api";

export default class Networking {
    static fetch(domain, api, restParams = null, postParams = {}, access_token = null) {
        return new Promise(async (resolve, reject) => {
            try {
                let baseurl = "https://" + domain + "";
                let url = restParams !== null ? api.url.replace(":param:", restParams) : api.url;
                let response = await axios({
                    url: baseurl + url,
                    method: api.method,
                    headers: this.createHeaders(access_token),
                    params: Object.assign(api.form, postParams)
                });
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    static createHeaders(access_token = null) {
        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        if (access_token !== null) {
            headers.Authorization = "Bearer " + access_token;
        }
        return headers;
    }

    //MEDIA UPLOAD ONLY
    static fileUpload(domain, access_token, file, type) {
        return new Promise(async (resolve, reject) => {
            try {
                let baseurl = "https://" + domain + "";
                let api = CONST_API.UPLOAD_POST_MEDIA;
                let headers = Object.assign(this.createHeaders(access_token), { "content-type": "multipart/form-data" });
                const data = new FormData();
                data.append("file", {
                    uri: file.uri,
                    type: type,
                    name: "upload.jpg"
                });
                let response = await axios({
                    url: baseurl + api.url,
                    method: api.method,
                    headers,
                    data
                });
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    //Push Server Subscribe / Unsubscribe
    static pushServer(endpoint, domain, exponent_push_token, access_token){
        return new Promise(async (resolve, reject) => {
            try {
                let params = new URLSearchParams();
                params.append("domain", domain);
                params.append("exponent_push_token", exponent_push_token);
                params.append("access_token", access_token);
                let response = await axios.post(endpoint, params);
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }
}