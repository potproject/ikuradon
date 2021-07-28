import * as ImagePicker from "expo-image-picker";

export async function getBeforeAskMediaLibrary(){
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        const { accessPrivileges } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (accessPrivileges === "none") {
            return false;
        }
    }
    return true;
}