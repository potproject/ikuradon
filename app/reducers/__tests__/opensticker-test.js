import OpenStickerReducer, { initialState } from "../opensticker";
import * as OpenSticker from "../../actions/actiontypes/opensticker";

describe("OpenStickerReducer", () => {
    it("init", () => {
        expect(OpenStickerReducer()).toEqual(initialState);
    });
    it("OpenSticker.OPENSTICKER_LOAD", () => {
        expect(OpenStickerReducer(initialState, { type:OpenSticker.OPENSTICKER_LOAD, openSticker:initialState })).toEqual(initialState);
    });
    it("OpenSticker.OPENSTICKER_ON", () => {
        expect(OpenStickerReducer(initialState, { type:OpenSticker.OPENSTICKER_ON, server:"https://test.openSticker.net/json", data:{} }))
            .toEqual({
                data:{},
                server:"https://test.openSticker.net/json",
                use:true
            });
    });
    it("OpenSticker.OPENSTICKER_OFF", () => {
        expect(OpenStickerReducer(initialState, { type:OpenSticker.OPENSTICKER_OFF }))
            .toEqual({
                data:{},
                server:initialState.server,
                use:false
            });
    });
});