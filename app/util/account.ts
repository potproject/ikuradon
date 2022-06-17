import { sns }  from "../constants/sns";

export function accountURLMigrate(sns: sns, domain: string, url: string){
    // Misskey Migrate Support
    if (sns === "misskey" && url.indexOf("http") !== 0){
        if (url.indexOf("@") !== -1){
            const urlSplit = url.split("@");
            return urlSplit.length === 2 ? `https://${urlSplit[1]}/@${urlSplit[0]}` : url;
        }
        return `https://${domain}/@${url}`;
    }
    return url;
}

export function urlMigrate(sns: sns, domain: string, url: string, tootid: string){
    if (sns === "misskey" && url === ""){
        return `https://${domain}/notes/${tootid}`;
    }
    return url;
}