import Networking from "./Networking";
import * as CONST_API from "../constants/api";
import * as FileSystem from "expo-file-system";

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

export default function fileUpload(domain, access_token, file, type) {
    return new Promise(async (resolve, reject) => {
        try {
            let baseurl = "https://" + domain + "";
            let api = CONST_API.UPLOAD_POST_MEDIA;
            let url = baseurl + api.url;
            let headers = createHeaders(access_token);
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

function createHeaders(access_token = null) {
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    if (access_token !== null) {
        headers.Authorization = "Bearer " + access_token;
    }
    return headers;
}