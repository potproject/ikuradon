import * as OpenSticker from "../actiontypes/opensticker";
import Networking from "../../services/Networking";

import DropDownHolder from "../../services/DropDownHolder";

export function on(server){
    return async dispatch => {
        try {
            let data = await Networking.openStickerGetJSON(server);
            // validate
            if (typeof data.data !== "object" || typeof data.updated !== "string" || typeof data.default !== "object"){
                throw new Error("Validate Failure.");
            }
            // TODO: データ加工必要かもしれんな
            DropDownHolder.success("JSON Download Success!", data.data.length + " server counts."); 
            return dispatch({ type: OpenSticker.OPENSTICKER_ON, server, data });
        } catch (e){
            // fail
            DropDownHolder.error("JSON Download Failure!", e.message); 
            return dispatch({ type: OpenSticker.OPENSTICKER_OFF });
        }
    };
}

export function off(){
    return { type: OpenSticker.OPENSTICKER_OFF };
}