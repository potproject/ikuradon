import Networking from "./Networking";
import * as CONST_API from "../constants/api";

export function createReactions(sns: "misskey", domain: string, access_token: string, noteId: string, reaction: string){
    return new Promise<void>(async (resolve, reject) => {
        try {
            const { status } = await Networking.fetch(domain, CONST_API.MISSKEY_CREATE_REACTION, {
                i: access_token,
                noteId,
                reaction,
            }, null);
            status === 204 ? resolve() : reject(status);
        } catch (e) {
            reject(e);
        }
    });
}

export function deleteReactions(sns: "misskey", domain: string, access_token: string, noteId: string){
    return new Promise<void>(async (resolve, reject) => {
        try {
            const { status } = await Networking.fetch(domain, CONST_API.MISSKEY_DELETE_REACTION, {
                i: access_token,
                noteId,
            }, null);
            status === 204 ? resolve() : reject(status);
        } catch (e) {
            reject(e);
        }
    });
}