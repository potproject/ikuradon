import generator, { Entity } from "megalodon";
import { sns } from "../../constants/sns";
export async function GetInstance(sns: sns, domain: string, access_token: string): Promise<Entity.Instance>{
    const client = generator(sns, domain, access_token);
    const { data }  = await client.getInstance();
    return data;
}