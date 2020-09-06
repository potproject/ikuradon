import { getAccessTokenWithHomeAction } from "../authorize";

import ExampleAccount from "../../../example/account";
import ExampleInstance from "../../../example/instance";
import Networking from "../../../services/Networking";
import DropDownHolder from "../../../services/DropDownHolder";

jest.mock("../../../util/session");
jest.mock("../../../services/Networking");
jest.mock("../../../services/NavigationService");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

describe("Action/Authorize", () => {
    it("getAccessTokenWithHomeAction", async (done) => {
        let domain = "example.com";
        let client_id = "CLIENT_ID";
        let client_secret = "CLIENT_SECRET";
        let code = "CODE";
        Networking.fetch
            // CONST_API.GET_OAUTH_ACCESSTOKEN
            .mockImplementationOnce(() => ({ access_token: "ACCESS_TOKEN" }))
            // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ExampleAccount())
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
    });
    it("getAccessTokenWithHomeAction Fail", async done => {
        let domain = "example.com";
        let client_id = "CLIENT_ID";
        let client_secret = "CLIENT_SECRET";
        let code = "CODE";
        Networking.fetch
            // CONST_API.GET_OAUTH_ACCESSTOKEN
            .mockImplementation(() => {
                throw new Error("Network Error");
            });
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        let action = getAccessTokenWithHomeAction(domain, client_id, client_secret, code);
        await action();
    });
});
