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
export function dateFormat(date) {
    return Moment(date).format("YYYY/MM/DD HH:mm:ss") + " - " + Moment(date).fromNow();
}