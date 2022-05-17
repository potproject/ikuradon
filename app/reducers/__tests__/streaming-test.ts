import StreamingReducer, { initialState } from "../streaming";

import * as Streaming from "../../actions/actiontypes/streaming";

const state1 = {
    home: true,
    local: false,
    federal: false
};

const state2 = {
    home: false,
    local: false,
    federal: false
};

describe("StreamingReducer", () => {
    it("Streaming.STREAM_START", () => {
        expect(StreamingReducer(initialState, { type:Streaming.STREAM_START, reducerType:"home" }))
            .toEqual(state1);
    });
    it("Streaming.STREAM_STOP", () => {
        expect(StreamingReducer(state1, { type:Streaming.STREAM_STOP, reducerType:"home" }))
            .toEqual(state2);
    });
    it("Streaming.STREAM_ALLSTOP", () => {
        expect(StreamingReducer(state1, { type:Streaming.STREAM_ALLSTOP }))
            .toEqual(state2);
    });
});