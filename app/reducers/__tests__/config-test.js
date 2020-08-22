import ConfigReducer, { initialState } from "../config";

describe("ConfigReducer", () => {
    it("init", () => {
        expect(ConfigReducer()).toEqual(initialState);
    });
});