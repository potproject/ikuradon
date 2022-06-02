import { getDetail, resetDetail } from "../detail";

import * as Detail from "../../actiontypes/detail";
import DropDownHolder from "../../../services/DropDownHolder";
import * as Session from "../../../util/session";
import ExampleSession from "../../../example/session";
import ExampleStatus from "../../../example/status";
import * as Rest from "../../../services/api/Rest";

jest.mock("../../../util/session");
jest.mock("../../../services/NavigationService");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));
jest.mock("../../../services/api/Rest");

describe("Action/Detail", () => {
    it("getDetail", async done => {
        let action = getDetail("100100");
        let status = ExampleStatus();
        let session = ExampleSession();
        Session.getDomainAndToken.mockImplementation(() => session);
        Rest.getStatus.mockImplementationOnce((sns, domain, access_token, id) => {
            expect(sns).toEqual(session.sns);
            expect(domain).toEqual(session.domain);
            expect(access_token).toEqual(session.access_token);
            expect(id).toEqual("100100");
            return status;
        });
        Rest.getStatusContext.mockImplementationOnce((sns, domain, access_token, id) => {
            expect(sns).toEqual(session.sns);
            expect(domain).toEqual(session.domain);
            expect(access_token).toEqual(session.access_token);
            expect(id).toEqual("100100");
            return status;
        });
        action(({ type, data, loaded }) => {
            expect(type).toEqual(Detail.DETAIL_GET);
            expect(data).toEqual(status);
            expect(loaded).toEqual(true);
            done();
        });
        Session.getDomainAndToken.mockClear();
        Rest.getStatus.mockClear();
        Rest.getStatusContext.mockClear();
        
    });
    it("getDetail Error", async done => {
        let action = getDetail("100100");
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.getStatus.mockImplementation(() => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementation((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        action(({ type, loaded }) => {
            expect(type).toEqual(Detail.DETAIL_GET);
            expect(loaded).toEqual(false);
            done();
        });
        Session.getDomainAndToken.mockClear();
        Rest.getStatus.mockClear();
    });
    it("resetDetail", () => {
        expect(resetDetail()).toEqual({ type: Detail.DETAIL_RESET });
    });
});
