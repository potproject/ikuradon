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
    return session;
}

export async function getDomainAndToken(){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = JSON.parse(sessionstr);
    if(session && session.login_index > -1){
        return {
            domain:session.domain[session.login_index],
            access_token:session.access_token[session.login_index]
        };
    }
    return {
        domain:null,
        access_token:null
    };
}

export async function add(domain,access_token){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = Object.assign({},JSON.parse(sessionstr));
    let nextIndex = session.access_token.indexOf(access_token);
    if(nextIndex < 0){
        //存在しないので追加します
        let newlength = session.domain.push(domain);
        session.access_token.push(access_token);
        session.login_index = newlength - 1;
    }else{
        session.login_index = nextIndex;
    }
    await AsyncStorage.setItem("session", JSON.stringify(session));
}

export async function init(){
    //存在してないければsessionを作る
    let oldSession = await AsyncStorage.getItem("session");
    if(!oldSession){
        deleteAll();
    }
}

export async function deleteCurrentItems(){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = Object.assign({},JSON.parse(sessionstr));
    if(session.login_index > -1){
        session.access_token.splice(session.login_index,1);
        session.domain.splice(session.login_index,1);
        session.login_index = -1;
    }
    await AsyncStorage.setItem("session", JSON.stringify(session));
}

export async function deleteItems(index){
    let sessionstr = await AsyncStorage.getItem("session");
    let session = Object.assign({},JSON.parse(sessionstr));
    if(index > -1){
        session.access_token.splice(index,1);
        session.domain.splice(index,1);
        session.login_index = -1;
    }
    await AsyncStorage.setItem("session", JSON.stringify(session));
}

export async function deleteAll(){
    await AsyncStorage.removeItem("session");
    let session = {
        login_index: -1,
        domain: [],
        access_token: [],
    };
    await AsyncStorage.setItem("session", JSON.stringify(session));
    return;
}