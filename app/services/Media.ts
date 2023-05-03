import * as ImagePicker from "expo-image-picker";
import * as Permission from "../util/permission";
import * as Session from "../util/session";
import t from "../services/I18n";
import DropDownHolder from "../services/DropDownHolder";
import fileUpload from "./FileUpload";

export async function upload() {
    let fileData: ImagePicker.ImagePickerResult;
    try {
        await Permission.getBeforeAskMediaLibrary();
        fileData = await ImagePicker.launchImageLibraryAsync();
        if (!fileData || fileData.canceled || fileData.assets.length === 0) {
            return null;
        }
        let { sns, domain, access_token } = await Session.getDomainAndToken();
        //アップロード中とかほしいね
        let res = await fileUpload(sns, domain, access_token, fileData.assets[0].uri, "image/jpeg");
        if (!res || !res.id) {
            throw new Error("ID Unknown Error!");
        }
        return res;
    } catch (e) {
        DropDownHolder.error(t("messages.toot_mediaopen_failed"), e.message);
    }
    return null;
}