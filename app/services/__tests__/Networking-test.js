import Networking from "../Networking";
import * as CONST_API from "../../constants/api";
import axios from "axios";
jest.mock("axios");

const fileMock = {
    "uri":"file:///data/user/0/host.exp.exponent/cache/cropped1814158652.jpg"
};
function FormDataMock() {
    this.append = jest.fn();
}
  
global.FormData = FormDataMock;
  
describe("Services/Networking", () => {
    it("fetch resolve", async () => {
        axios.mockImplementation((req) => {
            expect(req).toEqual({ 
                "headers": { "Accept": "application/json", "Content-Type": "application/json" },
                "method": "get",
                "params": {},
                "url": "https://server.mastodon.net/api/v1/instance" }
            );
            return { data: [] };
        });
        const res = Networking.fetch("server.mastodon.net", CONST_API.GET_INSTANCE);
        await expect(res).resolves.toEqual([]);
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
            return { data: [] };
        });
        const res = Networking.fetch("server.mastodon.net", CONST_API.POST_FAVOURITED, "100100", {}, "ACCESS_TOKEN");
        await expect(res).resolves.toEqual([]);
        axios.mockClear();
    });
    it("fetch reject", async() => {
        axios.mockImplementation(() => {
            throw new Error("Network Error");
        });
        const res = Networking.fetch("server.mastodon.net", CONST_API.GET_INSTANCE);
        await expect(res).rejects.toEqual(new Error("Network Error"));
        axios.mockClear();
    });
    it("fileUpload resolve", async () => {
        axios.mockImplementation((req) => {
            expect(req.headers).toEqual({ "Accept": "application/json", "Authorization": "Bearer ACCESS_TOKEN", "Content-Type": "multipart/form-data" });
            expect(req.method).toEqual("post");
            expect(req.url).toEqual("https://server.mastodon.net/api/v1/media");
            expect(req.timeout).toEqual(60000);
            return { data: [] };
        });
        const res = Networking.fileUpload("server.mastodon.net", "ACCESS_TOKEN", fileMock, "POST");
        await expect(res).resolves.toEqual([]);
        axios.mockClear();
    });
    it("fileUpload reject", async () => {
        axios.mockImplementation(() => {
            throw new Error("Network Error");
        });
        const res = Networking.fileUpload("server.mastodon.net", "ACCESS_TOKEN", fileMock, "POST");
        await expect(res).rejects.toEqual(new Error("Network Error"));
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
});