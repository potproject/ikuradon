import generator, { Entity } from "megalodon";
import { sns } from "../../constants/sns";

export async function getInstance(sns: sns, domain: string, access_token: string){
    const { data } = await generator(sns, getBaseUrl(domain), access_token).getInstance();
    return data;
}

export async function getCurrentUser(sns: sns, domain: string, access_token: string){
    const { data }  = await generator(sns, getBaseUrl(domain), access_token).verifyAccountCredentials();
    return data;
}

function getBaseUrl(domain: string):string{
    return "https://" + domain + "";
}