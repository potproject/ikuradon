import { on, off } from "../opensticker";
import * as OpenSticker from "../../actiontypes/opensticker";

import Networking from "../../../services/Networking";

import DropDownHolder from "../../../services/DropDownHolder";
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

jest.mock("../../../services/Networking");

describe("Action/OpenSticker", () => {
    it("on success", async done => {
        let example = {
            data: [{
                domain: "mastodon.potproject.net",
                name: "mastodon.potproject.net",
                type: "mastodon",
                withoutCDN: "https://s.0px.io/a/md",
                isDefault: true,
                favicon: "https://s.0px.io/a/md"
            },
            {
                domain: "mastodon2.potproject.net",
                name: "mastodon2.potproject.net",
                type: "mastodon",
                withoutCDN: "https://s.0px.io/a/md",
                isDefault: false,
                favicon: "https://s.0px.io/a/md",
                bgColor: ["#26a"],
                fontColor: "#fff"
            }],
            updated: "Thu Nov 05 2020 00:00:03 GMT+0000 (UTC)",
            default: {
                mastodon: { bgColor: ["#26a"], fontColor: "#fff" },
            }
        };
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
            "mastodon2.potproject.net" :{
                domain: "mastodon2.potproject.net",
                name: "mastodon2.potproject.net",
                type: "mastodon",
                withoutCDN: "https://s.0px.io/a/md",
                isDefault: false,
                favicon: "https://s.0px.io/a/md",
                bgColor: [
                    "#26a"
                ],
                fontColor: "#fff"
            }
        };
        Networking.openStickerGetJSON.mockImplementation(() => (example));
        const server = "https://server.opensticker.net/json";
        let action = on(server);
        await action((callback) => {
            try {
                expect(callback).toEqual({
                    type: OpenSticker.OPENSTICKER_ON,
                    server,
                    data: exampleAfter
                });
                done();
            } catch (e){
                done(e);
            }
        });
        Networking.openStickerGetJSON.mockReset();
    });
    it("on failure", async done => {
        Networking.openStickerGetJSON.mockImplementation(() => {
            throw new Error("Network Error");
        });
        const server = "https://server.opensticker.net/json";
        let action = on(server);
        await action((callback) => {
            try {
                expect(callback).toEqual({
                    type: OpenSticker.OPENSTICKER_OFF
                });
                done();
            } catch (e){
                done(e);
            }
        });
        Networking.openStickerGetJSON.mockReset();
    });
    it("on validate fail", async done => {
        Networking.openStickerGetJSON.mockImplementation(() => ({}));
        const server = "https://server.opensticker.net/json";
        let action = on(server);
        await action((callback) => {
            try {
                expect(callback).toEqual({
                    type: OpenSticker.OPENSTICKER_OFF
                });
                done();
            } catch (e){
                done(e);
            }
        });
        Networking.openStickerGetJSON.mockReset();
    });
    it("off", () => {
        expect(off()).toEqual({ type: OpenSticker.OPENSTICKER_OFF });
    });
});