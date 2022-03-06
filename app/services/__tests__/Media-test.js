import { upload } from "../Media";
import * as Session from "../../util/session";
import fileUpload from "../../services/FileUpload";
import * as ImagePicker from "expo-image-picker";
import ExampleSession from "../../example/session";
import ExampleMedia from "../../example/media";

jest.mock("../../util/permission");

jest.mock("../../services/FileUpload");

jest.mock("../../util/session", () => ({
    getDomainAndToken: jest.fn(),
}));

jest.mock("expo-image-picker", () => ({
    launchImageLibraryAsync: jest.fn(),
    launchCameraAsync: jest.fn(),
}));

jest.mock("../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn()
}));

const fileDataMock = {
    "cancelled":false,
    "height":1611,
    "width":2148,
    "uri":"file:///data/user/0/host.exp.exponent/cache/cropped1814158652.jpg"
};
const fileDataMockCancelled = {
    "cancelled":false
};

describe("Services/Media", () => {
    it("upload library", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        ImagePicker.launchImageLibraryAsync.mockImplementation(() => fileDataMock);
        fileUpload.mockImplementation(() => ExampleMedia());
        expect(await upload()).toEqual(ExampleMedia());
        Session.getDomainAndToken.mockClear();
        ImagePicker.launchImageLibraryAsync.mockClear();
        fileUpload.mockClear();
    });
    it("upload camera", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        ImagePicker.launchCameraAsync.mockImplementation(() => fileDataMock);
        fileUpload.mockImplementation(() => ExampleMedia());
        expect(await upload("camera")).toEqual(ExampleMedia());
        Session.getDomainAndToken.mockClear();
        ImagePicker.launchCameraAsync.mockClear();
        fileUpload.mockClear();
    });
    it("upload incorrect object", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        ImagePicker.launchImageLibraryAsync.mockImplementation(() => fileDataMock);
        fileUpload.mockImplementation(() => {});
        expect(await upload()).toEqual(null);
        Session.getDomainAndToken.mockClear();
        ImagePicker.launchImageLibraryAsync.mockClear();
        fileUpload.mockClear();
    });
    it("upload cancelled", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        ImagePicker.launchImageLibraryAsync.mockImplementation(() => fileDataMockCancelled);
        expect(await upload()).toEqual(null);
        Session.getDomainAndToken.mockClear();
        ImagePicker.launchImageLibraryAsync.mockClear();
    });
    it("upload file=null", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        ImagePicker.launchImageLibraryAsync.mockImplementation(() => null);
        expect(await upload()).toEqual(null);
        Session.getDomainAndToken.mockClear();
        ImagePicker.launchImageLibraryAsync.mockClear();
    });
    it("upload res=null", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        ImagePicker.launchImageLibraryAsync.mockImplementation(() => fileDataMock);
        fileUpload.mockImplementation(() => null);
        expect(await upload()).toEqual(null);
        Session.getDomainAndToken.mockClear();
        ImagePicker.launchImageLibraryAsync.mockClear();
        fileUpload.mockClear();
    });
});