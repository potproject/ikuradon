import * as Main from "../actiontypes/main";
import t from "../../services/I18n";
import DropDownHolder from "../../services/DropDownHolder";
import * as Session from "../../util/session";
import * as Rest from "../../services/api/Rest";

const reducerTypeArray = {
    home: Rest.getHomeTimeline,
    local: Rest.getLocalTimeline,
    federal: Rest.getPublicTimeline,
    notifications: Rest.getNotifications,
    favourites: Rest.getFavourites,
    bookmarks: Rest.getBookmarks
};

export function hide(id) {
    return { type: Main.HIDE_MASTOLIST, id: id };
}

export function deleting(id) {
    return async dispatch => {
        try {
            let { sns, domain, access_token } = await Session.getDomainAndToken();
            await Rest.deleteStatus(sns, domain, access_token, id);
            dispatch({ type: Main.HIDE_MASTOLIST, id: id });
            DropDownHolder.success(t("messages.toot_deleted_success"));
        } catch (e) {
            DropDownHolder.error(t("messages.toot_deleted_failed"), e.message);
        }
    };
}

export function newLoadingTimeline(reducerType, since_id, clear = false, limit = 40) {
    return async dispatch => {
        dispatch({ type: Main.REFRESHING_MASTOLIST, reducerType });
        try {
            let { sns, domain, access_token } = await Session.getDomainAndToken();
            const data = await reducerTypeArray[reducerType](sns, domain, access_token, { limit, since_id, max_id: null });
            dispatch({ type: Main.NEW_UPDATE_MASTOLIST, data: data, reducerType, clear, streaming: false });
        } catch (e) {
            DropDownHolder.error(t("messages.network_error"), e.message);
            dispatch({ type: Main.STOP_REFRESHING_MASTOLIST, reducerType });
        }
    };
}

export function oldLoadingTimeline(reducerType, max_id, limit = 40) {
    return async dispatch => {
        dispatch({ type: Main.LOADING_MASTOLIST, reducerType });
        try {
            let { sns, domain, access_token } = await Session.getDomainAndToken();
            const data = await reducerTypeArray[reducerType](sns, domain, access_token, { limit, since_id: null, max_id });
            dispatch({ type: Main.OLD_UPDATE_MASTOLIST, data: data, reducerType, clear: false });
        } catch (e) {
            DropDownHolder.error(t("messages.network_error"), e.message);
            dispatch({ type: Main.STOP_LOADING_MASTOLIST, reducerType });
        }
    };
}
