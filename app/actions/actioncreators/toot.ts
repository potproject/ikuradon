import t from "../../services/I18n";
import DropDownHolder from "../../services/DropDownHolder";
import * as Session from "../../util/session";

import NavigationService from "../../services/NavigationService";
import * as Toot from "../actiontypes/toot";
import * as Rest from "../../services/api/Rest";

export function toot(status, visibility, sensitive, spoiler_text, media_ids = [], reply = null, scheduled_at = null) {
    return async dispatch => {
        try {
            dispatch({ type: Toot.TOOT_WAITING });
            let { sns, domain, access_token } = await Session.getDomainAndToken();
            let in_reply_to_id = null;
            if (reply !== null && typeof reply === "object" && typeof reply.tootid !== "undefined") {
                in_reply_to_id = reply.tootid;
            }
            if (media_ids.length === 0){
                media_ids = undefined;
            }
            await Rest.postStatus(sns, domain, access_token, status,
                {
                    visibility,
                    sensitive,
                    spoiler_text,
                    media_ids,
                    in_reply_to_id,
                    scheduled_at
                }
            );
            DropDownHolder.success(t("messages.toot_success"));
            NavigationService.back();
            dispatch({ type: Toot.TOOT_OK });
        } catch (e) {
            DropDownHolder.error(t("messages.toot_failed"), e.message);
            dispatch({ type: Toot.TOOT_FAILURE });
        }
        return;
    };
}
