import { openDetail } from "../detail";

import * as Detail from "../../actiontypes/detail";
import DropDownHolder from "../../../services/DropDownHolder";
import NavigationService from "../../../services/NavigationService";

jest.mock("../../../services/NavigationService");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

describe("Action/Detail", () => {
    it("openDetail", async done => {
        let action = openDetail("100100");
        action(({ type }) => {
            expect(type).toEqual(Detail.DETAIL_OPEN);
            done();
        });
        
    });
    it("openDetail Error", async done => {
        let action = openDetail("100100");
        NavigationService.navigate.mockImplementation((callback) => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementation((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        action(() => {});
    });
});
