import { getMinMaxId } from "../../util/manageid";

describe("Util/ManageID", () => {
    it("getMinMaxId", () => {
        expect(getMinMaxId(
            null, null, [
                { "id":"100100" }
            ]
        )).toEqual({ minId: "100100", maxId: "100100" });
        expect(getMinMaxId(
            "100", "100100", [
                { "id":"1" }
            ]
        )).toEqual({ minId: "1", maxId: "100100" });
        expect(getMinMaxId(
            "100", "100100", [
                { "id":"100100100" }
            ]
        )).toEqual({ minId: "100", maxId: "100100100" });
    });
});