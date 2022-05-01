import { open } from "../../util/url";
import { Linking } from "react-native";

jest.mock("react-native", () => ({
    Linking: {
        canOpenURL: jest.fn(),
        openURL: jest.fn(),
    }
}));

jest.mock("console", () => ({
    log: () => {}
}));

describe("Util/URL", () => {
    it("open", async () => {
        console.log = jest.fn();
        Linking.canOpenURL.mockImplementation(() => true);
        open("http://example.com");
        Linking.canOpenURL.mockClear();
        Linking.canOpenURL.mockImplementation(() => false);
        open("http://example.com");
        Linking.canOpenURL.mockClear();
        console.log.mockClear();
    });
    it("open error", async () => {
        console.error = jest.fn();
        Linking.canOpenURL.mockImplementation(() => {
            throw new Error("URL Open Error");
        });
        open("http://example.com");
        Linking.canOpenURL.mockClear();
        console.error.mockClear();
    });
});