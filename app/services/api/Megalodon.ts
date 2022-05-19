import generator, { Entity } from "megalodon";
import { sns } from "../../constants/sns";

export async function getInstance(sns: sns, domain: string, access_token: string): Promise<Entity.Instance>{
    const client = generator(sns, getBaseUrl(domain), access_token);
    const { data }  = await client.getInstance();
    return data;
}

function getBaseUrl(domain: string):string{
    return "https://" + domain + "";
}