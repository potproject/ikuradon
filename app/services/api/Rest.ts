import generator from "megalodon";
import { sns } from "../../constants/sns";

export async function getInstance(sns: sns, domain: string, access_token: string){
    const { data } = await generator(sns, getBaseUrl(domain), access_token).getInstance();
    return data;
}

export async function getCurrentUser(sns: sns, domain: string, access_token: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).verifyAccountCredentials();
    return data;
}

type tlOptions = {
    limit?: number;
    max_id?: string;
    since_id?: string;
};

export async function getHomeTimeline(sns: sns, domain: string, access_token: string, options: tlOptions){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getHomeTimeline(options);
    return data;
}

export async function getLocalTimeline(sns: sns, domain: string, access_token: string, options: tlOptions){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getLocalTimeline(options);
    return data;
}

export async function getPublicTimeline(sns: sns, domain: string, access_token: string, options: tlOptions){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getPublicTimeline(options);
    return data;
}

export async function getNotifications(sns: sns, domain: string, access_token: string, options: tlOptions){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getNotifications(options);
    return data;
}

export async function getFavourites(sns: sns, domain: string, access_token: string, options: tlOptions){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getFavourites(options);
    return data;
}

export async function getBookmarks(sns: sns, domain: string, access_token: string, options: tlOptions){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getBookmarks(options);
    return data;
}

type statusOptions = {
    visibility?: "public" | "unlisted" | "private" | "direct";
    sensitive?: boolean,
    spoiler_text?: string,
    media_ids?: Array<string>,
    in_reply_to_id?: string,
    scheduled_at?: string;
};

export async function postStatus(sns: sns, domain: string, access_token: string, status: string, options: statusOptions){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).postStatus(status, options);
    return data;
}

export async function getStatus(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getStatus(id);
    return data;
}

export async function getStatusContext(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getStatusContext(id);
    return data;
}

export async function deleteStatus(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).deleteStatus(id);
    return data;
}

export async function reblogStatus(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).reblogStatus(id);
    return data;
}

export async function unreblogStatus(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).unreblogStatus(id);
    return data;
}

export async function favouriteStatus(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).favouriteStatus(id);
    return data;
}

export async function unfavouriteStatus(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).unfavouriteStatus(id);
    return data;
}

export async function bookmarkStatus(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).bookmarkStatus(id);
    return data;
}

export async function unbookmarkStatus(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).unbookmarkStatus(id);
    return data;
}

export async function followAccount(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).followAccount(id);
    return data;
}

export async function unfollowAccount(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).unfollowAccount(id);
    return data;
}

export async function getRelationships(sns: sns, domain: string, access_token: string, ids: string[]){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getRelationships(ids);
    return data;
}

export async function getInstanceCustomEmojis(sns: sns, domain: string){
    const { data }  = await generator(sns, getBaseUrl(domain)).getInstanceCustomEmojis();
    return data;
}

export async function getPoll(sns: sns, domain: string, access_token: string, id: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).getPoll(id);
    return data;
}

export async function search(sns: sns, domain: string, access_token: string, q: string, type: "accounts" | "hashtags" | "statuses"){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).search(q, type);
    return data;
}
function getBaseUrl(domain: string):string{
    return "https://" + domain + "";
}