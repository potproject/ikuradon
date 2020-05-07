import * as CONST_API from "../../constants/api";
import Networking from "../../services/networking";
import t from "../../services/I18n";
import { MessageBarManager } from "react-native-message-bar";
import * as Session from "../../util/session";

import NavigationService from "../../services/NavigationService";
import * as Nav from "../actiontypes/nav";
import * as Toot from "../actiontypes/toot";

export function toot(status, visibility, sensitive, spoiler_text, media_ids = [], reply = null, scheduled_at = null) {
    return async dispatch => {
        try {
            dispatch({ type: Toot.TOOT_WAITING });
            let { domain, access_token } = await Session.getDomainAndToken();
            let in_reply_to_id = null;
            if (reply !== null && typeof reply === "object" && typeof reply.tootid !== "undefined") {
                in_reply_to_id = reply.tootid;
            }
            await Networking.fetch(
                domain,
                CONST_API.POST_STATUS,
                null,
                {
                    status,
                    visibility,
                    sensitive,
                    spoiler_text,
                    media_ids,
                    in_reply_to_id,
                    scheduled_at
                },
                access_token
            );
            MessageBarManager.showAlert({
                title: t("messages.toot_success"),
                alertType: "success"
            });
            NavigationService.back();
            dispatch({ type: Toot.TOOT_OK });
            dispatch({ type: Nav.NAV_GO_BACK });
        } catch (e) {
            MessageBarManager.showAlert({
                title: t("messages.toot_failed"),
                alertType: "error"
            });
            dispatch({ type: Toot.TOOT_FAILURE });
        }
        return;
    };
}
