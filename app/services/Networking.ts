import axios from "axios";
import * as qs from "qs";
import { api } from "../constants/api";

export default class Networking {
    static fetch(domain: string, api: api, restParams = null, postParams = {}, access_token = null){
        return new Promise<{data:any, status:number}>(async (resolve, reject) => {
            try {
                let baseurl = "https://" + domain + "";
                let url = restParams !== null ? api.url.replace(":param:", restParams) : api.url;
                let response = await axios({
                    url: baseurl + url,
                    method: api.method,
                    headers: this.createHeaders(access_token),
                    params: Object.assign(api.form, postParams)
                });
                resolve({ data: response.data, status: response.status });
            } catch (e) {
                reject(e);
            }
        });
    }

    static createHeaders(access_token = null) {
        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: undefined
        };
        if (access_token !== null) {
            headers.Authorization = "Bearer " + access_token;
        }
        return headers;
    }

    //Push Server Subscribe / Unsubscribe
    static pushServer(endpoint, domain, exponent_push_token, access_token){
        return new Promise(async (resolve, reject) => {
            try {
                const form = qs.stringify({ 
                    "domain": domain,
                    "exponent_push_token": exponent_push_token,
                    "access_token": access_token
                });
                let response = await axios.post(endpoint, form);
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    //OpenSticker Server
    static openStickerGetJSON(endpoint){
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.get(endpoint);
                resolve(response.data);
            } catch (e) {
                reject(e);
            }
        });
    }
}