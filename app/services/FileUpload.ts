import Networking from "./Networking";
import * as CONST_API from "../constants/api";
import * as FileSystem from "expo-file-system";
import { sns } from "../constants/sns";
import { Buffer } from "buffer";
import axios from "axios";

const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

export default function fileUpload(sns: sns|undefined, domain: string, access_token: string, fileUri: string, type: string) {
    if (sns === "mastodon" || sns === undefined){
        return fileUploadMastodonV2(domain, access_token, fileUri, type);
    }
    if (sns === "misskey"){
        return fileUploadMisskey(domain, access_token, fileUri, type);
    }
    if (sns === "bluesky"){
        return fileUploadBluesky(domain, access_token, fileUri, type);
    }
    return fileUploadMastodonV1(domain, access_token, fileUri, type);
}

function fileUploadBluesky(domain: string, access_token: string, fileUri: string, type: string){
    return new Promise(async (resolve, reject) => {
        try {
            const baseurl = "https://" + domain + "";
            const api = CONST_API.UPLOAD_POST_MEDIA_BLUESKY;
            const url = baseurl + api.url;
            const headers = createHeaders(JSON.parse(access_token).accessJwt);
            const base64 = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64
            });
            let bin = Buffer.from(base64, "base64");
            axios.post(url, bin, {
                headers:{
                    ...headers,
                    "Content-Type": type,
                    "Content-Length": bin.length
                }
            }).then((res) => {
                const id = JSON.stringify(res.data);
                const preview_url = fileUri;
                resolve({
                    id,
                    preview_url
                });
            });
        } catch (e) {
            reject(e);
        }
    });
}

function fileUploadMisskey(domain: string, access_token: string, fileUri: string, type: string){
    return new Promise(async (resolve, reject) => {
        try {
            let baseurl = "https://" + domain + "";
            let api = CONST_API.UPLOAD_POST_MEDIA_MISSKEY;
            let url = baseurl + api.url;
            let headers = createHeaders();
            let response = await FileSystem.uploadAsync(url, fileUri, {
                headers,
                fieldName: "file",
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                mimeType: type,
                parameters: {
                    "i": access_token,
                }
            });
            if (response.status === 200){
                const { id, thumbnailUrl } = JSON.parse(response.body);
                resolve({
                    id,
                    preview_url: thumbnailUrl
                });
                return;
            }
            throw new Error("Error Status Code:" + response.status + "Body: " + response.body);
        } catch (e) {
            reject(e);
        }
    });
}

function fileUploadMastodonV2(domain: string, access_token: string, fileUri: string, type: string) {
    return new Promise(async (resolve, reject) => {
        try {
            let baseurl = "https://" + domain + "";
            let api = CONST_API.UPLOAD_POST_MEDIA_V2;
            let url = baseurl + api.url;
            let headers = createHeaders(access_token);
            let response = await FileSystem.uploadAsync(url, fileUri, {
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

function fileUploadMastodonV1(domain: string, access_token: string, fileUri: string, type: string) {
    return new Promise(async (resolve, reject) => {
        try {
            let baseurl = "https://" + domain + "";
            let api = CONST_API.UPLOAD_POST_MEDIA_V1;
            let url = baseurl + api.url;
            let headers = createHeaders(access_token);
            let response = await FileSystem.uploadAsync(url, fileUri, {
                headers,
                fieldName: "file",
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                mimeType: type
            });
            if (response.status === 200){
                resolve(JSON.parse(response.body));
                return;
            } else {
                throw new Error("Error Status Code:" + response.status);
            }
        } catch (e) {
            reject(e);
        }
    });
}

function createHeaders(access_token = null) {
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    } as any;
    if (access_token !== null) {
        headers.Authorization = "Bearer " + access_token;
    }
    return headers;
}