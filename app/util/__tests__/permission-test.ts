import { getBeforeAskMediaLibrary } from "../../util/permission";
import * as ImagePicker from "expo-image-picker";

jest.mock("expo-image-picker", () => ({
    requestMediaLibraryPermissionsAsync: jest.fn(),
    getMediaLibraryPermissionsAsync: jest.fn(),
}));

describe("Util/Permission", () => {
    it("getBeforeAskMediaLibrary request:granted", async () => {
        ImagePicker.requestMediaLibraryPermissionsAsync.mockImplementation(() => { return { status: "granted" }});
        ImagePicker.getMediaLibraryPermissionsAsync.mockImplementation(() => { return { accessPrivileges: "all" }});
        expect(await getBeforeAskMediaLibrary()).toEqual(true);
        ImagePicker.requestMediaLibraryPermissionsAsync.mockClear();
        ImagePicker.getMediaLibraryPermissionsAsync.mockClear();
    });
    it("getBeforeAskMediaLibrary get:all", async () => {
        ImagePicker.requestMediaLibraryPermissionsAsync.mockImplementation(() => { return { status: "denied" }});
        ImagePicker.getMediaLibraryPermissionsAsync.mockImplementation(() => { return { accessPrivileges: "all" }});
        expect(await getBeforeAskMediaLibrary()).toEqual(true);
        ImagePicker.requestMediaLibraryPermissionsAsync.mockClear();
        ImagePicker.getMediaLibraryPermissionsAsync.mockClear();
    });
    it("getBeforeAsk get:limited", async () => {
        ImagePicker.requestMediaLibraryPermissionsAsync.mockImplementation(() => { return { status: "denied" }});
        ImagePicker.getMediaLibraryPermissionsAsync.mockImplementation(() => { return { accessPrivileges: "limited" }});
        expect(await getBeforeAskMediaLibrary()).toEqual(true);
        ImagePicker.requestMediaLibraryPermissionsAsync.mockClear();
        ImagePicker.getMediaLibraryPermissionsAsync.mockClear();
    });
    it("getBeforeAsk get:none", async () => {
        ImagePicker.requestMediaLibraryPermissionsAsync.mockImplementation(() => { return { status: "denied" }});
        ImagePicker.getMediaLibraryPermissionsAsync.mockImplementation(() => { return { accessPrivileges: "none" }});
        expect(await getBeforeAskMediaLibrary()).toEqual(false);
        ImagePicker.requestMediaLibraryPermissionsAsync.mockClear();
        ImagePicker.getMediaLibraryPermissionsAsync.mockClear();
    });
});