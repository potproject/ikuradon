import * as ImagePicker from "expo-image-picker";
import * as Permission from "../util/permission";
import * as Session from "../util/session";
import Networking from "../services/Networking";
import t from "../services/I18n";
import DropDownHolder from "../services/DropDownHolder";

const MEDIA_UPLOAD_TIMEOUT = 60000;

export async function upload(openType = "library") {
    let fileData;
    try {
        if (openType === "library") {
            await Permission.getBeforeAsk(Permission.CAMERA_ROLL);
            fileData = await ImagePicker.launchImageLibraryAsync();
        }
        if (openType === "camera") {
            await Permission.getBeforeAsk(Permission.CAMERA);
            fileData = await ImagePicker.launchCameraAsync();
        }
        if (!fileData || fileData.cancelled) {
            return null;
        }
        let { domain, access_token } = await Session.getDomainAndToken();
        //アップロード中とかほしいね
        let res = await Networking.fileUpload(domain, access_token, fileData, "image/jpeg", MEDIA_UPLOAD_TIMEOUT);
        if (!res && !res.id) {
            throw new Error("ID Unknown Error!");
        }
        return res;
    } catch (e) {
        DropDownHolder.error(t("messages.toot_mediaopen_failed"), e.message);
    }
    return null;
}