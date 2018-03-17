import He from "he";
import Moment from "moment/min/moment-with-locales";

export function bodyFormat(body) {
    console.log(body);
    //改行
    let newbody = body.replace(/(<br\s*>|<br\s*\/>)/g, "\n");
    newbody = newbody.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
    return He.unescape(newbody);
}
export function dateFormat(date) {
    return Moment(date).format("YYYY/MM/DD HH:mm:ss") + " - " + Moment(date).fromNow();
}