import ImageViewerReducer, { initialState } from "../imageviewer";
import * as ImageViewer from "../../actions/actiontypes/imageviewer";

const openState = {
    data:[{ url: "http://example.com/example.jpg" }],
    index: 1,
    visible: true,
};

describe("ImageViewerReducer", () => {
    it("init", () => {
        expect(ImageViewerReducer()).toEqual(initialState);
    });
    it("ImageViewer.IMAGEVIEWER_OPEN", () => {
        expect(ImageViewerReducer(initialState, {
            type:ImageViewer.IMAGEVIEWER_OPEN,
            data:[{ url: "http://example.com/example.jpg" }],
            index:1,
        })).toEqual(openState);
    });
    it("ImageViewer.IMAGEVIEWER_CLOSE", () => {
        expect(ImageViewerReducer(openState, {
            type:ImageViewer.IMAGEVIEWER_CLOSE,
        })).toEqual(initialState);
    });
});