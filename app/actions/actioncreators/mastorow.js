import * as Mastorow from "../actiontypes/mastorow";
import * as CONST_API from "../../constants/api";
import Networking from "../../services/Networking";
import t from "../../services/I18n";
import DropDownHolder from "../../services/DropDownHolder";
import * as Session from "../../util/session";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";

export function boost(id, tootid, boosted) {
    return async dispatch => {
        try {
            dispatch({ type: Mastorow.BOOST_MASTOROW, id, boosted });
            let { domain, access_token } = await Session.getDomainAndToken();
            let POST_URL = boosted ? CONST_API.POST_REBLOG : CONST_API.POST_UNREBLOG;
            let { reblogged: reblogedResult } = await Networking.fetch(domain, POST_URL, tootid, {}, access_token);
            console.log("boost:", tootid, boosted, "result:", reblogedResult);
        } catch (e) {
            DropDownHolder.error(t("messages.network_error"), e.message);
            dispatch({ type: Mastorow.BOOST_MASTOROW, id, boosted: !boosted });
        }
        return;
    };
}

export function favourite(id, tootid, favourited) {
    return async dispatch => {
        try {
            dispatch({ type: Mastorow.FAVOURITE_MASTOROW, id, favourited });
            let { domain, access_token } = await Session.getDomainAndToken();
            let POST_URL = favourited ? CONST_API.POST_FAVOURITED : CONST_API.POST_UNFAVOURITED;
            let { favourited: favouritedResult } = await Networking.fetch(domain, POST_URL, tootid, {}, access_token);
            console.log("favourite:", tootid, favourited, "result:", favouritedResult);
        } catch (e) {
            DropDownHolder.error(t("messages.network_error"), e.message);
            dispatch({ type: Mastorow.FAVOURITE_MASTOROW, id, favourited: !favourited });
            return;
        }
        return;
    };
}

export function bookmark(id, tootid, bookmarked) {
    return async dispatch => {
        try {
            dispatch({ type: Mastorow.BOOKMARK_MASTOROW, id, bookmarked });
            let { domain, access_token } = await Session.getDomainAndToken();
            let POST_URL = bookmarked ? CONST_API.POST_BOOKMARKED : CONST_API.POST_UNBOOKMARKED;
            let { bookmarked: bookmarkedResult } = await Networking.fetch(domain, POST_URL, tootid, {}, access_token);
            console.log("bookmark:", tootid, bookmarked, "result:", bookmarkedResult);
        } catch (e) {
            DropDownHolder.error(t("messages.network_error"), e.message);
            dispatch({ type: Mastorow.BOOKMARK_MASTOROW, id, bookmarked: !bookmarked });
            return;
        }
        return;
    };
}