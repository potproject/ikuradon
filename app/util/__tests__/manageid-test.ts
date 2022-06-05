import { getFirstAndLastID } from "../../util/manageid";

describe("Util/ManageID", () => {
    it("getMinMaxId", () => {
        expect(getFirstAndLastID(
            [
                { "id":"100100" }
            ]
        )).toEqual({ minId: "100100", maxId: "100100" });
        expect(getFirstAndLastID(
            [
                { "id":"100100" },
                { "id":"1" }
            ]
        )).toEqual({ minId: "1", maxId: "100100" });
    });
});