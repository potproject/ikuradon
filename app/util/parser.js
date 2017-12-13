import He from "he";
import Moment from "moment";

export function bodyFormat(body) {
    let newbody = body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
    return He.unescape(newbody);
}
export function dateFormat(date) {
    return Moment(date).format("YYYY/MM/DD HH:mm:ss") + " - " + Moment(date).fromNow();
}