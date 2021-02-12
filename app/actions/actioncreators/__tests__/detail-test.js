import { openDetail, closeDetail } from "../detail";

import * as Detail from "../../actiontypes/detail";
import DropDownHolder from "../../../services/DropDownHolder";
import Networking from "../../../services/Networking";
import * as Session from "../../../util/session";
import ExampleSession from "../../../example/session";
import ExampleStatus from "../../../example/status";

import * as CONST_API from "../../../constants/api";

jest.mock("../../../util/session");
jest.mock("../../../services/NavigationService");
jest.mock("../../../services/Networking");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

describe("Action/Detail", () => {
    it("openDetail", async done => {
        let action = openDetail("100100");
        let status = ExampleStatus();
        let session = ExampleSession();
        Session.getDomainAndToken.mockImplementation(()=> session);
        Networking.fetch.mockImplementation((domain, api, restParams, postParams, access_token) => {
            expect(domain).toEqual(session.domain);
            expect(api).toEqual(CONST_API.GET_STATUS);
            expect(restParams).toEqual("100100");
            expect(postParams).toEqual({});
            expect(access_token).toEqual(session.access_token);
            return status;
        });
        action(({ type, data, loaded }) => {
            expect(type).toEqual(Detail.DETAIL_OPEN);
            expect(data).toEqual(status);
            expect(loaded).toEqual(true);
            done();
        });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
        
    });
    it("openDetail Error", async done => {
        let action = openDetail("100100");
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch.mockImplementation(() => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementation((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        action(({ type, loaded }) => {
            expect(type).toEqual(Detail.DETAIL_OPEN);
            expect(loaded).toEqual(false);
            done();
        });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
    it("closeDetail", () => {
        expect(closeDetail()).toEqual({ type: Detail.DETAIL_CLOSE });
    });
});
