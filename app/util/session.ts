import * as Storage from "../util/storage";

import * as CONST_Storage from "../constants/storage";
import { sns } from "../constants/sns";

type Session = {
    accounts: SessionInstance[];
    login_index: number;
} | null;

type SessionInstance = {
    sns?: sns
    domain?: string;
    access_token?: string;
    username?: string;
    avatar?: string;
};

export async function getAll() {
    let session = await Storage.getItem(CONST_Storage.Session) as Session;
    if (session === null) {
        session = await deleteAll();
    }
    return session;
}

export async function setDefault() {
    let session = await Storage.getItem(CONST_Storage.Session) as Session;
    session.login_index = -1;
    await Storage.setItem(CONST_Storage.Session, session);
    return session;
}

export async function setIndex(index: number) {
    let session = await Storage.getItem(CONST_Storage.Session) as Session;
    session.login_index = index;
    await Storage.setItem(CONST_Storage.Session, session);
    return session;
}

export async function getDomainAndToken(): Promise<SessionInstance>{
    let session = await Storage.getItem(CONST_Storage.Session) as Session;
    if (session && session.login_index > -1) {
        return session.accounts[session.login_index];
    }
    return {
        sns: null,
        domain: null,
        access_token: null,
        username: null,
        avatar: null
    };
}

export async function add(sns: sns, domain: string, access_token: string, username: string, avatar: string) {
    let session = await Storage.getItem(CONST_Storage.Session) as Session;
    let existsCheck = -1;
    if (!session || !session.accounts) {
        session = { login_index: -1, accounts: [] };
    }
    for (let accountsIndex in session.accounts) {
        if (session.accounts[accountsIndex].access_token === access_token) {
            existsCheck = Number(accountsIndex);
            break;
        }
    }
    if (existsCheck < 0) {
        //存在しないので追加します
        let newlength = session.accounts.push({
            sns,
            domain,
            access_token,
            username,
            avatar
        });
        session.login_index = newlength - 1;
    } else {
        session.login_index = existsCheck;
    }
    await Storage.setItem(CONST_Storage.Session, session);
}

export async function init() {
    //存在してないければsessionを作る
    let oldSession = await Storage.getItem(CONST_Storage.Session) as Session;
    if (!oldSession) {
        oldSession = await deleteAll();
    }
    return oldSession;
}

export async function deleteCurrentItems() {
    let session = await Storage.getItem("session") as Session;
    if (session.login_index > -1) {
        session.accounts.splice(session.login_index, 1);
        session.login_index = -1;
        await Storage.setItem("session", session);
    }
}

export async function deleteItems(index: number) {
    let session = await Storage.getItem("session") as Session;
    if (index > -1) {
        session.accounts.splice(index, 1);
        session.login_index = -1;
        await Storage.setItem("session", session);
    }
}

export async function deleteAll() {
    await Storage.removeItem("session");
    let session = {
        login_index: -1,
        accounts: []
    };
    await Storage.setItem("session", session);
    return session;
}
