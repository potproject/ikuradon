import t from "../services/I18n";
import DayJS from "dayjs";

/**
 * 残り時間
 * @param {string|null} expires_at 
 * @param {boolean} expired
 * @returns {string}
 */
export function timeStr(expires_at, expired){
    if (expired){
        return t("polls.ended");
    }
    if (!expired && expires_at === null){
        return t("polls.voting");
    }
    return DayJS(expires_at).diff(DayJS(), "h") + " " + t("polls.hours");
}

/**
 * 投票率
 * @param {number} count 
 * @param {number} total 
 * @returns {string}
 */
export function votePer(count, total){
    if (count === 0 || total === 0){
        return "0%";
    }
    let p = Math.floor(count / total * 100);
    
    return !isNaN(p) ? p + "%" : "0%";
}

/**
 * 投票人数
 * @param {number|null} voters_count 
 * @returns {string}
 */
export function voters(voters_count){
    if (voters_count === null){
        return "";
    }
    if (voters_count === 1){
        return voters_count + t("polls.total_one");
    }
    return voters_count + t("polls.total_people");
}

/**
 * 投票数
 * @param {number} votes_count
 * @returns {string}
 */
export function votes(votes_count){
    if (votes_count === null){
        return "";
    }
    return "(" + votes_count +  t("polls.total_votes") + ")";
}