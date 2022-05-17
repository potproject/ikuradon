import { open, close } from "../imageviewer";
import * as ImageViewer from "../../actiontypes/imageviewer";
import ExampleMediaAttachment from "../../../example/mediaAttachment";

describe("Action/ImageViewer", () => {
    it("open", () => {
        expect(open([ExampleMediaAttachment()], 0)).toEqual({ 
            type: ImageViewer.IMAGEVIEWER_OPEN,
            index: 0,
            data:[
                { uri: ExampleMediaAttachment().url }
            ]
        });
    });
    it("open fail", () => {
        let mediaVideo = ExampleMediaAttachment();
        mediaVideo.type = "video";
        expect(open([mediaVideo], 0)).toEqual({ type: ImageViewer.IMAGEVIEWER_CLOSE });
    });
    it("close", () => {
        expect(close()).toEqual({ type: ImageViewer.IMAGEVIEWER_CLOSE });
    });
});