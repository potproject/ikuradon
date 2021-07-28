import { getItem, setItem, removeItem } from "../storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("Util/Storage", () => {
    it("getItem", async () => {
        AsyncStorage.getItem.mockImplementation(() => "{\"test\":1}");
        expect(await getItem("test")).toEqual({ "test": 1 });
        AsyncStorage.getItem.mockClear();
    });
    it("setItem", async done => {
        AsyncStorage.setItem.mockImplementation((k, v) => {
            if (k === "test" && v === "{\"test\":1}"){
                done();
            }
        });
        await setItem("test", { "test": 1 });
        AsyncStorage.getItem.mockClear();
    });
    it("removeItem", async done => {
        AsyncStorage.removeItem.mockImplementation((k) => k === "test" && done());
        await removeItem("test");
        AsyncStorage.removeItem.mockClear();
    });
});