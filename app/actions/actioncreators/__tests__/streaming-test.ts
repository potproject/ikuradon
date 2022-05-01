import { receive, start, stop } from "../streaming";
import * as Streaming from "../../../actions/actiontypes/streaming";
import * as Main from "../../actiontypes/main";

import ExampleStatus from "../../../example/status";
import { follow as ExampleFollow, mention as ExampleMention, favourite as ExampleFavourite, reblog as ExampleReblog } from "../../../example/notifications";

jest.mock("../../../services/DropDownHolder", () => ({
    info: jest.fn()
}));

describe("Action/Streaming", () => {
    it("receive update", done => {
        let reducerType = "main";
        let event = "update";
        let data = ExampleStatus();
        let action = receive(reducerType, event, data);
        action((callback) => {
            try {
                expect(callback).toEqual({ type: Main.NEW_UPDATE_MASTOLIST, data: [ExampleStatus()], reducerType, streaming: true });
                done();
            } catch (e){
                done(e);
            }
        });
    });
    it("receive notification follow", done => {
        let reducerType = "notifications";
        let event = "notification";
        let data = ExampleFollow();
        let action = receive(reducerType, event, data);
        action((callback) => {
            try {
                expect(callback).toEqual({ type: Main.NEW_UPDATE_MASTOLIST, data: [ExampleFollow()], reducerType, streaming: true });
                done();
            } catch (e){
                done(e);
            }
        });
    });
    it("receive notification favourite", done => {
        let reducerType = "notifications";
        let event = "notification";
        let data = ExampleFavourite();
        data.account.display_name = "";
        let action = receive(reducerType, event, data);
        action((callback) => {
            try {
                let data = ExampleFavourite();
                data.account.display_name = "";
                expect(callback).toEqual({ type: Main.NEW_UPDATE_MASTOLIST, data: [data], reducerType, streaming: true });
                done();
            } catch (e){
                done(e);
            }
        });
    });
    it("receive notification reblog", done => {
        let reducerType = "notifications";
        let event = "notification";
        let data = ExampleReblog();
        let action = receive(reducerType, event, data);
        action((callback) => {
            try {
                expect(callback).toEqual({ type: Main.NEW_UPDATE_MASTOLIST, data: [ExampleReblog()], reducerType, streaming: true });
                done();
            } catch (e){
                done(e);
            }
        });
    });
    it("receive notification mention", done => {
        let reducerType = "notifications";
        let event = "notification";
        let data = ExampleMention();
        let action = receive(reducerType, event, data);
        action((callback) => {
            try {
                expect(callback).toEqual({ type: Main.NEW_UPDATE_MASTOLIST, data: [ExampleMention()], reducerType, streaming: true });
                done();
            } catch (e){
                done(e);
            }
        });
    });
    it("receive notification unknown", () => {
        let reducerType = "main";
        let event = "notification";
        let data = ExampleFavourite();
        data.type = "unknown";
        let action = receive(reducerType, event, data);
        action(() => null);
    });
    it("receive delete", () => {
        let reducerType = "main";
        let event = "delete";
        let data = ExampleStatus();
        let action = receive(reducerType, event, data);
        action(() => null);
    });
    it("start", () => {
        let reducerType = "main";
        expect(start(reducerType)).toEqual({ type: Streaming.STREAM_START, reducerType });
    });
    it("stop", () => {
        let reducerType = "main";
        expect(stop(reducerType)).toEqual({ type: Streaming.STREAM_STOP, reducerType });
    });
});