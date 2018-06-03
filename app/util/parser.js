import He from "he";
import Moment from "moment/min/moment-with-locales";

export function bodyFormat(body) {
    //改行 <br />
    let newbody = body.replace(/(<br\s*>|<br\s*\/>)/g, "\n");
    //URL <a > </a>
    newbody = newbody.replace(/(<a("[^"]*"|'[^']*'|[^'">])*>|<\/a>)/g, " ");
    //Other HTML Tag
    newbody = newbody.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
    return He.unescape(newbody);
}

export function bodyExtractionUrl(body) {
    //a hrefのURLを抜き出す
    let urlReg = /<a[^>]href\s?=\s?[\"\']([^\"\']+)[\"\'][^>]*>/i;
    let list = body.match(urlReg);
    if(list && list[1]){
        return list[1];
    }
    return null;
}

export function dateFormat(date) {
    return Moment(date).format("YYYY/MM/DD HH:mm:ss") + " - " + Moment(date).fromNow();
}