import DetailReducer, { initialState } from "../detail";
import * as Detail from "../../actions/actiontypes/detail";
import statusMock from "../../example/status";

describe("DetailReducer", () => {
    it("init", () => {
        expect(DetailReducer()).toEqual({ data: {}, ancestors: [], descendants: [], loaded: null });
    });
    it("Detail.DETAIL_GET", () => {
        let data = statusMock();
        expect(DetailReducer(initialState, { type:Detail.DETAIL_GET, data, ancestors: [], descendants: [], loaded: true }))
            .toEqual({ data: statusMock(), ancestors: [], descendants: [], loaded: true });
    });
    it("Detail.DETAIL_RESET", () => {
        expect(DetailReducer(initialState, { type:Detail.DETAIL_RESET })).toEqual({ data: {}, ancestors: [], descendants: [], loaded: null });
    });
});