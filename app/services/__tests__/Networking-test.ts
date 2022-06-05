import Networking from "../Networking";
import * as CONST_API from "../../constants/api";

import axios from "axios";
jest.mock("axios");

describe("Services/Networking", () => {
    it("fetch resolve", async () => {
        axios.mockImplementation((req) => {
            expect(req).toEqual({ 
                "headers": { "Accept": "application/json", "Content-Type": "application/json" },
                "method": "get",
                "params": {},
                "url": "https://server.mastodon.net/api/v1/instance" }
            );
            return { data: [], status: 200 };
        });
        const { data, status } = await Networking.fetch("server.mastodon.net", {
            method: "get",
            url: "/api/v1/instance",
            form: {}
        });
        expect(data).toEqual([]);
        expect(status).toEqual(200);
        axios.mockClear();
    });
    it("fetch restparam resolve", async () => {
        axios.mockImplementation((req) => {
            expect(req).toEqual({ 
                "headers": { "Accept": "application/json", "Authorization": "Bearer ACCESS_TOKEN", "Content-Type": "application/json" },
                "method": "post",
                "params": {},
                "url": "https://server.mastodon.net/api/v1/statuses/100100/favourite" }
            );
            return { data: [], status: 200 };
        });
        const { data, status } = await Networking.fetch("server.mastodon.net", {
            method: "post",
            url: "/api/v1/statuses/:param:/favourite",
            form: {}
        }, "100100", {}, "ACCESS_TOKEN");
        expect(data).toEqual([]);
        expect(status).toEqual(200);
        axios.mockClear();
    });
    it("fetch reject", async() => {
        axios.mockImplementation(() => {
            throw new Error("Network Error");
        });
        await expect(Networking.fetch("server.mastodon.net", {
            method: "get",
            url: "/api/v1/instance",
            form: {}
        })).rejects.toEqual(new Error("Network Error"));
        axios.mockClear();
    });
    it("pushServer resolve", async () => {
        axios.post.mockImplementation((endpoints, params) => {
            expect(endpoints).toEqual("push.mastodon.net");
            return { data: [] };
        });
        const res = Networking.pushServer("push.mastodon.net", "server.mastodon.net", "PUSH_TOKEN", "ACCESS_TOKEN");
        await expect(res).resolves.toEqual([]);
        axios.post.mockClear();
    });
    it("pushServer reject", async () => {
        axios.post.mockImplementation(() => {
            throw new Error("Network Error");
        });
        const res = Networking.pushServer("push.mastodon.net", "server.mastodon.net", "PUSH_TOKEN", "ACCESS_TOKEN");
        await expect(res).rejects.toEqual(new Error("Network Error"));
        axios.post.mockClear();
    });
    it("createHeaders", () => {
        expect(Networking.createHeaders()).toEqual({ "Accept": "application/json", "Content-Type": "application/json" });
    });
    it("openStickerGetJSON resolve", async () => {
        axios.get.mockImplementation((endpoint) => {
            expect(endpoint).toEqual("https://opensticker.server");
            return { data: [] };
        });
        const res = Networking.openStickerGetJSON("https://opensticker.server");
        await expect(res).resolves.toEqual([]);
        axios.get.mockClear();
    });
    it("openStickerGetJSON reject", async () => {
        axios.get.mockImplementation(() => {
            throw new Error("Network Error");
        });
        const res = Networking.openStickerGetJSON("https://opensticker.server");
        await expect(res).rejects.toEqual(new Error("Network Error"));
        axios.get.mockClear();
    });
});