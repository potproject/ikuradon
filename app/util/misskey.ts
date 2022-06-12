// Misskey Migrate Support Util

export function accountURLMigrate(url: string){
    if (url.indexOf("@") !== -1){
        const urlSplit = url.split("@");
        return urlSplit.length === 2 ? `https://${urlSplit[1]}/@${urlSplit[0]}` : url;
    }
    return url;
}