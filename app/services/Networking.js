import axios from "axios";
import * as CONST_API from "../constants/api";
import * as FileSystem from "expo-file-system";

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

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
                resolve({ data: response.data, status: response.status });
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
                let url = baseurl + api.url;
                let headers = this.createHeaders(access_token);
                let response = await FileSystem.uploadAsync(url, file.uri, {
                    headers,
                    fieldName: "file",
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    mimeType: type
                });
                if (response.status === 200){
                    resolve(JSON.parse(response.body));
                    return;
                }
                
                if (response.status === 202){
                    const { id } = JSON.parse(response.body);
                    let data = {};
                    let status = 206;
                    while (status !== 200){
                        await sleep(1000);
                        const res = await Networking.fetch(domain, CONST_API.UPLOAD_GET_MEDIA, id, {}, access_token);
                        status = res.status;
                        data = res.data;
                    }
                    resolve(data);
                } else {
                    throw new Error("Error Status Code:" + response.status);
                }
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