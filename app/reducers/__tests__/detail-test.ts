import DetailReducer, { initialState } from "../detail";
import * as Detail from "../../actions/actiontypes/detail";
import statusMock from "../../example/status";
import * as MastorowActionTypes from "../../actions/actiontypes/mastorow";

describe("DetailReducer", () => {
    it("Detail.DETAIL_GET", () => {
        let data = statusMock();
        expect(DetailReducer(initialState, { type: Detail.DETAIL_GET, data, ancestors: [], descendants: [], loaded: true })).toEqual({
            data: statusMock(),
            ancestors: [],
            descendants: [],
            loaded: true,
        });
    });
    it("MastorowActionTypes.REACTION_MASTOROW", () => {
        let data = statusMock();
        expect(
            DetailReducer(
                { data: statusMock(), ancestors: [], descendants: [], loaded: true },
                { type: MastorowActionTypes.REACTION_MASTOROW, id: data.id, emoji_reactions: [], emojis:[] }
            )
        ).toEqual({ data: statusMock(), ancestors: [], descendants: [], loaded: true });
        expect(
            DetailReducer(
                { data: statusMock(), ancestors: [], descendants: [], loaded: true },
                { type: MastorowActionTypes.REACTION_MASTOROW, id: "0", }
            )
        ).toEqual({ data: statusMock(), ancestors: [], descendants: [], loaded: true });
    });
    it("Detail.DETAIL_RESET", () => {
        expect(DetailReducer(initialState, { type: Detail.DETAIL_RESET })).toEqual({ data: {}, ancestors: [], descendants: [], loaded: null });
    });
});
