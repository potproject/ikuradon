import MainReducer, { initialState } from "../main";

describe("MainReducer", () => {
    it("init", () => {
        expect(MainReducer()).toEqual(initialState);
    });
});