import { getDraft, getDraftAll, addDraft, deleteDraft } from "../draft";
import { getItem } from "../../util/storage";
jest.mock("../../util/storage");

describe("Util/Draft", () => {
    it("getDraft null", async  () => {
        getItem.mockImplementation(() => null);
        expect(await getDraft(0)).toEqual("");
        getItem.mockClear();
    });
    it("getDraft exists", async ()=>{
        getItem.mockImplementation(() => [{ id:"wgx9stqc", text:"test" }]);
        expect(await getDraft(0)).toEqual("test");
        expect(await getDraft(0, false)).toEqual("test");
        getItem.mockClear();
    });
    it("getDraft not exists", async ()=>{
        getItem.mockImplementation(() => [{ id:"wgx9stqc", text:"test" }]);
        expect(await getDraft(1)).toEqual("");
        getItem.mockClear();
    });
    it("getDraftAll", async () => {
        const item = [{ "id": "wgx9stqc", "text": "test" }];
        getItem.mockImplementation(() => item);
        expect(await getDraftAll()).toEqual(item);
        getItem.mockClear();
    });
    it("addDraft", async () => {
        const item = [{ "id": "wgx9stqc", "text": "test" }];
        getItem.mockImplementation(() => item);
        expect(await addDraft("test2")).toEqual(1);
        getItem.mockClear();
    });
    it("addDraft null", async () => {
        getItem.mockImplementation(() => null);
        expect(await addDraft("test2")).toEqual(0);
        getItem.mockClear();
    });
    it("deleteDraft", async () => {
        const item = [{ "id": "wgx9stqc", "text": "test" }];
        getItem.mockImplementation(() => item);
        await deleteDraft(0);
        getItem.mockClear();
    });
});