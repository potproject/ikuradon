import CurrentuserReducer, { initialState } from "../currentuser";

describe("CurrentuserReducer", () => {
    it("init", () => {
        expect(CurrentuserReducer()).toEqual(initialState);
    });
});