import * as ImagePicker from "expo-image-picker";
import * as Permission from "../util/permission";
import * as Session from "../util/session";
import Networking from "../services/Networking";
import t from "../services/I18n";
import DropDownHolder from "../services/DropDownHolder";

export async function upload() {
    let fileData;
    try {
        await Permission.getBeforeAskMediaLibrary();
        fileData = await ImagePicker.launchImageLibraryAsync();
        if (!fileData || fileData.cancelled) {
            return null;
        }
        let { domain, access_token } = await Session.getDomainAndToken();
        //アップロード中とかほしいね
        let res = await Networking.fileUpload(domain, access_token, fileData, "image/jpeg");
        if (!res || !res.id) {
            throw new Error("ID Unknown Error!");
        }
        return res;
    } catch (e) {
        DropDownHolder.error(t("messages.toot_mediaopen_failed"), e.message);
    }
    return null;
}