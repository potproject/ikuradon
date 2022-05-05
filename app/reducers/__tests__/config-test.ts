import ConfigReducer, { initialState } from "../config";
import * as Config from "../../actions/actiontypes/config";

describe("ConfigReducer", () => {
    it("Config.SET_BACKGROUNDIMAGE", () => {
        const ex = ConfigReducer(initialState, { type:Config.SET_BACKGROUNDIMAGE, backgroundImage: "file://URLtest", });
        const ac = Object.assign({}, initialState, { backgroundImage:"file://URLtest" });
        expect(ex).toEqual(ac);
    });
    it("Config.DELETE_BACKGROUNDIMAGE", () => {
        const init = Object.assign({}, initialState, { backgroundImage:"file://URLtest" });
        const ex = ConfigReducer(init, { type:Config.DELETE_BACKGROUNDIMAGE });
        expect(ex).toEqual(initialState);
    });
    it("Config.INVISIBLE_SETTING", () => {
        const ex = ConfigReducer(initialState, { type:Config.INVISIBLE_SETTING, invisible:{ home:true } });
        let mergeInvisible = Object.assign({}, initialState.invisible, { home:true });
        expect(ex).toEqual(Object.assign({}, initialState, { invisible:mergeInvisible }));
    });
    it("Config.CHANGE_THEME", () => {
        const ex = ConfigReducer(initialState, { type:Config.CHANGE_THEME, theme: "mikugreen" });
        const ac = Object.assign({}, initialState, { theme:"mikugreen" });
        expect(ex).toEqual(ac);
    });
    it("Config.CONFIG_LOAD", () => {
        const ac = Object.assign({}, initialState, { theme:"mikugreen" });
        const ex = ConfigReducer(initialState, { type:Config.CONFIG_LOAD, config: ac });
        expect(ex).toEqual(ac);
    });
    it("Config.CONFIG_RESET", () => {
        const init = Object.assign({}, initialState, { theme:"mikugreen" });
        const ex = ConfigReducer(init, { type:Config.CONFIG_RESET });
        expect(ex).toEqual(initialState);
    });
});