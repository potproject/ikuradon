import * as Mastorow from "../actiontypes/mastorow";
import t from "../../services/I18n";
import DropDownHolder from "../../services/DropDownHolder";
import * as Session from "../../util/session";
import * as Rest from "../../services/api/Rest";

export function boost(id, tootid, boosted) {
    return async dispatch => {
        try {
            dispatch({ type: Mastorow.BOOST_MASTOROW, id, boosted });
            const { sns, domain, access_token } = await Session.getDomainAndToken();
            const postapi = boosted ? Rest.reblogStatus : Rest.unreblogStatus;
            const { reblogged: reblogedResult } = await postapi(sns, domain, access_token, id);
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
            const { sns, domain, access_token } = await Session.getDomainAndToken();
            const postapi = favourited ? Rest.favouriteStatus : Rest.unfavouriteStatus;
            const { favourited: favouritedResult } = await postapi(sns, domain, access_token, id);
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
            let { sns, domain, access_token } = await Session.getDomainAndToken();
            const postapi = bookmarked ? Rest.bookmarkStatus : Rest.unbookmarkStatus;
            const { bookmarked: bookmarkedResult } = await postapi(sns, domain, access_token, id);
            console.log("bookmark:", tootid, bookmarked, "result:", bookmarkedResult);
        } catch (e) {
            DropDownHolder.error(t("messages.network_error"), e.message);
            dispatch({ type: Mastorow.BOOKMARK_MASTOROW, id, bookmarked: !bookmarked });
            return;
        }
        return;
    };
}

export function follow(id, followed) {
    return async dispatch => {
        try {
            dispatch({ type: Mastorow.FOLLOW_MASTOROW, id, followed });
            let { sns, domain, access_token } = await Session.getDomainAndToken();
            const postapi = followed ? Rest.followAccount : Rest.unfollowAccount;
            const { following: followedResult } = await postapi(sns, domain, access_token, id);
            console.log("follow:", id, followed, "result:", followedResult);
        } catch (e) {
            DropDownHolder.error(t("messages.network_error"), e.message);
            dispatch({ type: Mastorow.FOLLOW_MASTOROW, id, followed: !followed });
            return;
        }
        return;
    };
}