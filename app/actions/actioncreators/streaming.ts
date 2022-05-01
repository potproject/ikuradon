import * as Main from "../actiontypes/main";
import t from "../../services/I18n";
import DropDownHolder from "../../services/DropDownHolder";
import { bodyFormat } from "../../util/parser";
import * as Streaming from "../../actions/actiontypes/streaming";

export function receive(reducerType, event, data){
    return async dispatch => {
        switch (event){
            case "update":
                dispatch({ type: Main.NEW_UPDATE_MASTOLIST, data: [data], reducerType, streaming: true });
                break;
            case "notification":
                let name = data.account.display_name !== "" ? data.account.display_name : data.account.username;
                let title = "";
                let message = "";
                switch (data.type) {
                    case "follow":
                        title = name + t("notifications.followed");
                        message = null;
                        break;
                    case "favourite":
                        title = name + t("notifications.favourited");
                        message = bodyFormat(data.status.content);
                        break;
                    case "reblog":
                        title = name + t("notifications.boosted");
                        message = bodyFormat(data.status.content);
                        break;
                    case "mention":
                        title = name + t("notifications.mentioned");
                        message = bodyFormat(data.status.content);
                        break;
                    default:
                        return;
                }
                DropDownHolder.info(title, message);
                dispatch({ type: Main.NEW_UPDATE_MASTOLIST, data: [data], reducerType: "notifications", streaming: true });    
                break;
            case "delete":
                break;
        }
    };
}

export function stop(reducerType){
    return { type: Streaming.STREAM_STOP, reducerType };
}

export function start(reducerType){
    return { type: Streaming.STREAM_START, reducerType };
}