import { AsyncStorage } from "react-native";

export async function getAll(){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = JSON.parse(sessionstr);
    return session;
}

export async function setDefault(){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = JSON.parse(sessionstr);
    if(session.login_index){
        session.login_index = -1;
    }
    await AsyncStorage.setItem("session", JSON.stringify(session));
    return session;
}

export async function getDomainAndToken(){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = JSON.parse(sessionstr);
    if(session && session.login_index > -1){
        return session.accounts[session.login_index];
    }
    return {
        domain:null,
        access_token:null,
        username:null,
        avatar:null
    };
}

export async function add(domain, access_token, username, avatar){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = Object.assign({},JSON.parse(sessionstr));
    let existsCheck = -1;
    if(!session.accounts){
        deleteAll
    }
    for(let accountsIndex in session.accounts){
        if(accounts.access_token[accountsIndex] === access_token){
            existsCheck = accountsIndex;
            break;
        }
    }
    if(existsCheck < 0){
        //存在しないので追加します
        let newlength = session.accounts.push({
            domain,
            access_token,
            username,
            avatar
        });
        session.login_index = newlength - 1;
    }else{
        session.login_index = existsCheck;
    }
    console.log(session);
    await AsyncStorage.setItem("session", JSON.stringify(session));
}

export async function init(){
    //存在してないければsessionを作る
    let oldSession = await AsyncStorage.getItem("session");
    if(!oldSession){
        oldSession = deleteAll();
    }
    return oldSession;
}

export async function deleteCurrentItems(){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = Object.assign({},JSON.parse(sessionstr));
    if(session.login_index > -1){
        session.accounts.splice(session.login_index,1);
        session.login_index = -1;
    }
    await AsyncStorage.setItem("session", JSON.stringify(session));
}

export async function deleteItems(index){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = Object.assign({},JSON.parse(sessionstr));
    if(index > -1){
        session.accounts.splice(index,1);
        session.login_index = -1;
    }
    await AsyncStorage.setItem("session", JSON.stringify(session));
}

export async function deleteAll(){
    await AsyncStorage.removeItem("session");
    let session = {
        login_index: -1,
        accounts: []
    };
    await AsyncStorage.setItem("session", JSON.stringify(session));
    return session;
}