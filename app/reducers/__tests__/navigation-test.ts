import NavigationReducer from "../navigation";

import * as Navigation from "../../actions/actiontypes/navigation";

describe("NavigationReducer", () => {
    it("Navigation.NAVIGATE", () => {
        expect(NavigationReducer({}, { type:Navigation.NAVIGATE })).toEqual({});
    });
    it("Navigation.COMPLETE_TRANSITION", () => {
        expect(NavigationReducer({}, { type:Navigation.COMPLETE_TRANSITION })).toEqual({});
    });
});