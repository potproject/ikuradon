import { getAccessTokenWithHomeAction } from "../authorize";

import ExampleAccount from "../../../example/account";
import ExampleInstance from "../../../example/instance";
import DropDownHolder from "../../../services/DropDownHolder";
import * as Rest from "../../../services/api/Rest";

jest.mock("../../../util/session");
jest.mock("../../../services/NavigationService");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

jest.mock("../../../services/api/Rest");

describe("Action/Authorize", () => {
    it("getAccessTokenWithHomeAction", async done => {
        let domain = "example.com";
        let client_id = "CLIENT_ID";
        let client_secret = "CLIENT_SECRET";
        let code = "CODE";
        Rest.fetchAccessToken
        // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ({ access_token: "ACCESS_TOKEN" }));
        Rest.getCurrentUser
        // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ExampleAccount());
        Rest.getInstance
        // CONST_API.GET_INSTANCE
            .mockImplementationOnce(() => ExampleInstance());
        let action = getAccessTokenWithHomeAction(domain, client_id, client_secret, code);
        await action(({ type, user_credentials, domain, access_token, instance }) => {
            expect(type).toEqual("UPDATE_CURRENT_USER");
            expect(user_credentials).toEqual(ExampleAccount());
            expect(domain).toEqual("example.com");
            expect(access_token).toEqual("ACCESS_TOKEN");
            expect(instance).toEqual(ExampleInstance());
            done();
        });
        Rest.fetchAccessToken.mockReset();
        Rest.getInstance.mockReset();
        Rest.getCurrentUser.mockReset();
    });
    it("getAccessTokenWithHomeAction Fail", async done => {
        let domain = "example.com";
        let client_id = "CLIENT_ID";
        let client_secret = "CLIENT_SECRET";
        let code = "CODE";
        Rest.fetchAccessToken
        // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => {throw new Error("Network Error")});
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        let action = getAccessTokenWithHomeAction(domain, client_id, client_secret, code);
        await action();
        Rest.fetchAccessToken.mockReset();
        DropDownHolder.error.mockClear();
    });
});
