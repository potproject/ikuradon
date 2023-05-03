import { allClear, setBackground, setBackgroundClear, setInvisibleTimeline, setTheme } from "../config";

import * as Config from "../../actiontypes/config";
import * as Main from "../../actiontypes/main";
import * as Streaming from "../../actiontypes/streaming";

import * as ImagePicker from "expo-image-picker";
import DropDownHolder from "../../../services/DropDownHolder";

jest.mock("../../../util/session");
jest.mock("../../../util/permission");
jest.mock("../../../services/NavigationService");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

jest.mock("expo-image-picker", () => ({
    launchImageLibraryAsync: jest.fn(),
}));

const fileDataMock = {
    "canceled":false,
    "height":1611,
    "width":2148,
    "uri":"file:///data/user/0/host.exp.exponent/cache/cropped1814158652.jpg"
};

const fileDataMockCancelled = {
    "canceled":false
};

describe("Action/Config", () => {
    it("allClear", async done => {
        let action = allClear();
        let call = 0;
        await action(({ type }) => {
            call === 0 && expect(type).toBe(Config.CONFIG_RESET);
            call === 1 && expect(type).toBe(Streaming.STREAM_ALLSTOP);
            call === 2 && (expect(type).toBe(Main.ALLCLEAR_MASTOLIST) || done());
            call++;
        });
    });
    it("setBackground", async done => {
        ImagePicker.launchImageLibraryAsync.mockImplementation(() => fileDataMock);
        let action = setBackground();
        await action(({ type, backgroundImage }) => {
            expect(type).toBe(Config.SET_BACKGROUNDIMAGE);
            expect(backgroundImage).toBe(fileDataMock.uri);
            done();
        });
        ImagePicker.launchImageLibraryAsync.mockClear();
    });
    it("setBackground Canceled", async () => {
        ImagePicker.launchImageLibraryAsync.mockImplementation(() => fileDataMockCancelled);
        let action = setBackground();
        await action(() => null);
        ImagePicker.launchImageLibraryAsync.mockClear();
    });
    it("setBackground Error", async done => {
        ImagePicker.launchImageLibraryAsync.mockImplementation(() => {
            throw new Error("Network Error");
        });
        let action = setBackground();
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        await action(() => null);
        ImagePicker.launchImageLibraryAsync.mockClear();
    });
    it("setBackgroundClear", () => {
        expect(setBackgroundClear()).toEqual({ type: Config.DELETE_BACKGROUNDIMAGE });
    });
    it("setInvisibleTimeline", () => {
        expect(setInvisibleTimeline("main", true)).toEqual({ type: Config.INVISIBLE_SETTING, invisible: { main: true } });
    });
    it("setTheme", () => {
        expect(setTheme("mikugreen")).toEqual({ type: Config.CHANGE_THEME, theme: "mikugreen" });
    });
});
