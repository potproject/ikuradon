import He from "he";
import DayJS from "dayjs";

export function bodyFormat(body) {
    //改行 <br />
    //<p></p>を改行に変換
    let newbody = body.replace(/(<br\s*>|<br\s*\/>)/g, "\n").replace(/<p>/g, "").replace(/<\/p>/g, "\n\n");
    //URL <a > </a>
    newbody = newbody.replace(/(<a("[^"]*"|'[^']*'|[^'">])*>|<\/a>)/g, " ");
    //Other HTML Tag
    newbody = newbody.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
    return He.unescape(newbody).trim();
}

export function bodyExtractionUrl(body) {
    //a hrefのURLを抜き出す
    let urlReg = /<a[^>]href\s?=\s?[\"\']([^\"\']+)[\"\'][^>]*>/i;
    let list = body.match(urlReg);
    if (list && list[1]) {
        return list[1];
    }
    return null;
}

export function bodySearchUrl(body) {
    //(http|https)のリンクが含まれているかどうかの判定
    return ~body.indexOf("http://") || ~body.indexOf("https://");
}

export function dateFormat(date) {
    return DayJS(date).format("YYYY/MM/DD HH:mm:ss");
}

export function emojisArrayToObject(emojis){
    if (!emojis){
        return {};
    }
    let emojiObject = {};
    for (const emoji of emojis) {
        emojiObject[emoji.shortcode] = { uri: emoji.url };
    }
    return emojiObject;
}