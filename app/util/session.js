import * as Storage from "../util/storage";

import * as CONST_Storage from "../constants/storage";

export async function getAll() {
    let session = await Storage.getItem(CONST_Storage.Session);
    if (session === null) {
        session = deleteAll();
    }
    return session;
}

export async function setDefault() {
    let session = await Storage.getItem(CONST_Storage.Session);
    session.login_index = -1;
    await Storage.setItem(CONST_Storage.Session, session);
    return session;
}
export async function setIndex(index) {
    let session = await Storage.getItem(CONST_Storage.Session);
    session.login_index = index;
    await Storage.setItem(CONST_Storage.Session, session);
    return session;
}

export async function getDomainAndToken() {
    let session = await Storage.getItem(CONST_Storage.Session);
    if (session && session.login_index > -1) {
        return session.accounts[session.login_index];
    }
    return {
        domain: null,
        access_token: null,
        username: null,
        avatar: null
    };
}

export async function add(domain, access_token, username, avatar) {
    let session = await Storage.getItem(CONST_Storage.Session);
    let existsCheck = -1;
    if (!session || !session.accounts) {
        deleteAll();
    }
    for (let accountsIndex in session.accounts) {
        if (session.accounts[accountsIndex] === access_token) {
            existsCheck = accountsIndex;
            break;
        }
    }
    if (existsCheck < 0) {
        //存在しないので追加します
        let newlength = session.accounts.push({
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
    let oldSession = await Storage.getItem(CONST_Storage.Session);
    if (!oldSession) {
        oldSession = deleteAll();
    }
    return oldSession;
}

export async function deleteCurrentItems() {
    let session = await Storage.getItem("session");
    if (session.login_index > -1) {
        session.accounts.splice(session.login_index, 1);
        session.login_index = -1;
    }
    await Storage.setItem("session", session);
}

export async function deleteItems(index) {
    let session = await Storage.getItem("session");
    if (index > -1) {
        session.accounts.splice(index, 1);
        session.login_index = -1;
    }
    await Storage.setItem("session", session);
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
