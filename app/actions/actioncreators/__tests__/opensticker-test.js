import { on, off } from "../opensticker";
import * as OpenSticker from "../../actiontypes/opensticker";

describe("Action/OpenSticker", () => {
    it("off", () => {
        expect(off()).toEqual({ type: OpenSticker.OPENSTICKER_OFF });
    });
});