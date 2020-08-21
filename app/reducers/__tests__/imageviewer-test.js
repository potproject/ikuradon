import ImageViewerReducer, { initialState } from "../imageviewer";

describe("ImageViewerReducer", () => {
    it("init", () => {
        expect(ImageViewerReducer()).toEqual(initialState);
    });
});