import t from "../services/I18n";
import DayJS from "dayjs";
import * as Session from "../util/session";
import * as Rest from "../services/api/Rest";

/**
 * Poll投票
 * @param {string} id 
 * @param {number[]} choices
 * @returns {Promise<object>}
 */
export async function votePoll(id, choices) {
    try {
        let { sns, domain, access_token } = await Session.getDomainAndToken();
        const data = await Rest.votePoll(sns, domain, access_token, id, choices);
        return { data, error: null };
    } catch (e){
        return { data: null, error: e.message };
    }
}


/**
 * Poll取得
 * @param {string} id 
 * @returns {Promise<object>}
 */
export async function getPoll(id) {
    try {
        let { sns, domain, access_token } = await Session.getDomainAndToken();
        let data = await Rest.getPoll(sns, domain, access_token, id);
        return { data, error: null };
    } catch (e){
        return { data: null, error: e.message };
    }
}

/**
 * 残り時間
 * @param {string|null} expires_at 
 * @param {boolean} expired
 * @param {boolean} multiple
 * @returns {string}
 */
export function timeStr(expires_at, expired, multiple){
    if (expired){
        return t("polls.ended");
    }
    if (!expired && expires_at === null && multiple){
        return t("polls.voting_multiple");
    }
    if (!expired && expires_at === null && !multiple){
        return t("polls.voting");
    }
    if (multiple){
        return t("polls.voting_multiple") + " " + DayJS(expires_at).diff(DayJS(), "h") + " " + t("polls.hours");
    }
    return t("polls.voting") + " " + DayJS(expires_at).diff(DayJS(), "h") + " " + t("polls.hours");
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