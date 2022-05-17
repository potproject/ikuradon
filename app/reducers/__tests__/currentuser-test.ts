import CurrentuserReducer, { initialState } from "../currentuser";
import * as CurrentUser from "../../actions/actiontypes/currentuser";
import current from "../../example/current";

describe("CurrentuserReducer", () => {
    it("Config.UPDATE_CURRENT_USER", () => {
        const { user_credentials, domain, access_token, instance } = current();
        const ex = CurrentuserReducer(initialState, 
            { type: CurrentUser.UPDATE_CURRENT_USER, user_credentials, domain, access_token, instance }
        );
        expect(ex).toEqual(current());
    });
    it("Config.DELETED_CURRENT_USER", () => {
        const ex = CurrentuserReducer(current(), { type: CurrentUser.DELETED_CURRENT_USER });
        expect(ex).toEqual(initialState);
    });
    it("Config.NOTIFICATION_PUSH", () => {
        const ex = CurrentuserReducer(current(), { type: CurrentUser.NOTIFICATION_PUSH });
        const ac = Object.assign({}, current(), { notification_count:1 });
        expect(ex).toEqual(ac);
    });
    it("Config.NOTIFICATION_CLEAR", () => {
        const ex = CurrentuserReducer(current(), { type: CurrentUser.NOTIFICATION_CLEAR });
        const ac = Object.assign({}, current(), { notification_count:0 });
        expect(ex).toEqual(ac);
    });
});