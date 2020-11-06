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
            let serverData = serverDataParse(data);
            DropDownHolder.success("JSON Download Success!", data.data.length + " server counts."); 
            return dispatch({ type: OpenSticker.OPENSTICKER_ON, server, data: serverData });
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

function serverDataParse(json){
    /*
    // Before
    let example = {
        data: [{
            domain: "mastodon.potproject.net",
            name: "mastodon.potproject.net",
            type: "mastodon",
            withoutCDN: "https://s.0px.io/a/md",
            isDefault: true,
            favicon: "https://s.0px.io/a/md"
        }],
        updated: "Thu Nov 05 2020 00:00:03 GMT+0000 (UTC)",
        default: {
            mastodon: {
                bgColor: [
                    "#26a"
                ],
                fontColor: "#fff"
            },
            pleroma: {
                bgColor: [
                    "#123"
                ],
                fontColor: "#da5"
            },
            misskey: {
                bgColor: [
                    "#444"
                ],
                fontColor: "#3c9"
            },
            misskeylegacy: {
                bgColor: [
                    "#444"
                ],
                fontColor: "#3c9"
            },
            pixelfed: {
                bgColor: [
                    "#fff"
                ],
                fontColor: "#000"
            }
        }
    };

    // After
    let exampleAfter = {
        "mastodon.potproject.net" :{
            domain: "mastodon.potproject.net",
            name: "mastodon.potproject.net",
            type: "mastodon",
            withoutCDN: "https://s.0px.io/a/md",
            isDefault: true,
            favicon: "https://s.0px.io/a/md",
            bgColor: [
                "#26a"
            ],
            fontColor: "#fff"
        },
    };
    */
    let serverData = {};
    for (let d of json.data){
        serverData[d.domain] = d;
        if (typeof d.isDefault === "boolean" && d.isDefault){
            serverData[d.domain].bgColor = json.default[d.type].bgColor;
            serverData[d.domain].fontColor = json.default[d.type].fontColor;
        }
    }
    return serverData;
}