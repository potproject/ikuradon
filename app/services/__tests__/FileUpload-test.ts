
import * as FileSystem from "expo-file-system";
import Networking from "../Networking";
import fileUpload from "../FileUpload";

jest.mock("expo-file-system", () => ({
    uploadAsync: jest.fn(),
    FileSystemUploadType: {
        MULTIPART: ""
    }
}));

jest.mock("../Networking");


const fileMock = {
    "uri":"file:///data/user/0/host.exp.exponent/cache/cropped1814158652.jpg"
};

describe("Services/FileUpload", () => {
    it("fileUpload resolve", async () => {
        FileSystem.uploadAsync.mockImplementation(() => ({ body: "{\"id\": \"1\"}", status: 200 }));
        const data = await fileUpload("server.mastodon.net", "ACCESS_TOKEN", fileMock, "image/jpeg");
        expect(data).toEqual({ "id": "1" });
        FileSystem.uploadAsync.mockClear();
    });
    it("fileUpload resolve v2", async () => {
        FileSystem.uploadAsync.mockImplementation(() => ({ body: "{\"id\": \"1\", \"url\": null}", status: 202 }));
        Networking.fetch
            .mockImplementationOnce(() => ({ data: { id: "1", url: null }, status: 206 }))
            .mockImplementationOnce(() => ({ data: { id: "1", url:"http://example.com/" }, status: 200 }));
        const data = await fileUpload("server.mastodon.net", "ACCESS_TOKEN", fileMock, "image/jpeg");
        expect(data).toEqual({ id: "1", url:"http://example.com/" });
        FileSystem.uploadAsync.mockClear();
        Networking.fetch.mockClear();
    });
    it("fileUpload reject", async () => {
        FileSystem.uploadAsync.mockImplementation(() => {
            throw new Error("Network Error");
        });
        const res = fileUpload("server.mastodon.net", "ACCESS_TOKEN", fileMock, "image/jpeg");
        await expect(res).rejects.toEqual(new Error("Network Error"));
        FileSystem.uploadAsync.mockClear();
    });
});