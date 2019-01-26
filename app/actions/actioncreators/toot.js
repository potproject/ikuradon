import * as CONST_API from "../../constants/api";
import Networking from "../../networking";
import I18n from "../../i18n";
import { MessageBarManager } from "react-native-message-bar";
import * as Session from "../../util/session";

import NavigationService from "../../navigationservice";
import * as Nav from "../actiontypes/nav";

export function toot(status, visibility, sensitive, spoiler_text, media_ids = [], reply = null, scheduled_at = null) {
    return async dispatch => {
        try {
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
                title: I18n.t("messages.toot_success"),
                alertType: "success"
            });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.toot_failed"),
                alertType: "error"
            });
        }
        NavigationService.back();
        dispatch({ type: Nav.NAV_GO_BACK });
        return;
    };
}
