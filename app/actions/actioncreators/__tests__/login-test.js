import { login, loginSelectAccounts, loginWithAccessToken, logout, accountChange, accountChangeWithDelete } from "../login";

import * as Session from "../../../util/session";

import Networking from "../../../services/Networking";
import NavigationService from "../../../services/NavigationService";
import DropDownHolder from "../../../services/DropDownHolder";

import * as Main from "../../actiontypes/main";
import * as Streaming from "../../actiontypes/streaming";
import * as CurrentUser from "../../actiontypes/currentuser";

import * as RouterName from "../../../constants/RouterName";

import ExampleApps from "../../../example/apps";
import ExampleSession from "../../../example/session";
import ExampleAccount from "../../../example/account";
import ExampleInstance from "../../../example/instance";

jest.mock("../../../util/session");

jest.mock("../../../services/Networking");
jest.mock("../../../services/NavigationService");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

describe("Action/Login", () => {
    it("login", done => {
        const domain = "example.net";
        Networking.fetch.mockImplementation(() => ExampleApps());
        NavigationService.navigate.mockImplementation(({ name, params }) => {
            try {
                expect(name).toEqual(RouterName.Authorize);
                let { client_id, client_secret } = ExampleApps();
                expect(params).toEqual({
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "domain": domain,
                    "url": `https://${domain}/oauth/authorize?client_id=${client_id}&response_type=code&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=read%20write%20follow%20push`
                });
                done();
            } catch (error) {
                done(error);
            }
        });
        let action = login(domain);
        let call = 0;
        action((callback) => {
            call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
            call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
            call++;
        });

        Networking.fetch.mockClear();
        NavigationService.navigate.mockClear();
    });
    it("login Fail", done => {
        const domain = "example.net";
        Networking.fetch.mockImplementation(() => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementation((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        let action = login(domain);
        let call = 0;
        action((callback) => {
            call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
            call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
            call++;
        });

        Networking.fetch.mockClear();
        DropDownHolder.error.mockClear();
    });
    it("loginSelectAccounts", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch
            // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ExampleAccount())
            // CONST_API.GET_INSTANCE
            .mockImplementationOnce(() => ExampleInstance());
        let action = loginSelectAccounts(0);
        let call = 0;
        let { domain, access_token } = ExampleSession();
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call === 2 && (expect(callback).toEqual({ 
                    type: CurrentUser.UPDATE_CURRENT_USER,
                    user_credentials: ExampleAccount(),
                    domain: domain,
                    access_token: access_token,
                    instance: ExampleInstance()
                }) || done());
                call++;
            } catch (e){
                done(e);
            }
        });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
    it("loginSelectAccounts Fail", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch.mockImplementation(() => {
            throw new Error("Network Error");
        });
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Login });
            done();
        });
        let action = loginSelectAccounts(0);
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call++;
            } catch (e){
                done(e);
            }
        });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
        NavigationService.resetAndNavigate.mockClear();
    });
    it("loginSelectAccounts notfound", done => {
        Session.getDomainAndToken.mockImplementation(()=> ({ domain:null, access_token:null }));
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Login });
            done();
        });
        let action = loginSelectAccounts(0);
        action(() => null);
        Session.getDomainAndToken.mockClear();
    });
    it("loginWithAccessToken", done => {
        Networking.fetch
            // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ExampleAccount())
            // CONST_API.GET_INSTANCE
            .mockImplementationOnce(() => ExampleInstance());
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Main });
            done();
        });
        let { domain, access_token } = ExampleSession();
        let action = loginWithAccessToken(domain, access_token);
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call === 2 && expect(callback).toEqual({ 
                    type: CurrentUser.UPDATE_CURRENT_USER,
                    user_credentials: ExampleAccount(),
                    domain: domain,
                    access_token: access_token,
                    instance: ExampleInstance()
                });
                call++;
            } catch (e){
                done(e);
            }
        });
        Networking.fetch.mockClear();
        NavigationService.resetAndNavigate.mockClear();
    });
    it("loginWithAccessToken Fail", done => {
        Networking.fetch.mockImplementation(() => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementation((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        let { domain, access_token } = ExampleSession();
        let action = loginWithAccessToken(domain, access_token);
        action(() => null);
        Networking.fetch.mockClear();
        DropDownHolder.error.mockClear();
    });
    it("logout", done => {
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Login });
            done();
        });
        let action = logout();
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: CurrentUser.DELETED_CURRENT_USER });
                call === 2 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call++;
            } catch (e){
                done(e);
            }
        });
        NavigationService.resetAndNavigate.mockClear();
    });
    it("logout Fail", done => {
        Session.deleteCurrentItems.mockImplementation(() => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementation((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        let action = logout();
        action(() => null);
        Session.deleteCurrentItems.mockClear();
        DropDownHolder.error.mockClear();
    });
    it("accountChange", done => {
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Login });
            done();
        });
        let action = accountChange();
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: CurrentUser.DELETED_CURRENT_USER });
                call === 2 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call++;
            } catch (e){
                done(e);
            }
        });
        NavigationService.resetAndNavigate.mockClear();
    });
    it("accountChange fail", done => {
        Session.setDefault.mockImplementation(() => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementation((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        let action = accountChange();
        action(() => null);
        Session.setDefault.mockClear();
        DropDownHolder.error.mockClear();
    });
    it("accountChangeWithDelete", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch
            // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ExampleAccount())
            // CONST_API.GET_INSTANCE
            .mockImplementationOnce(() => ExampleInstance());
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Main });
            done();
        });
        let { domain, access_token } = ExampleSession();
        let action = accountChangeWithDelete(0);
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call === 2 && expect(callback).toEqual({ 
                    type: CurrentUser.UPDATE_CURRENT_USER,
                    user_credentials: ExampleAccount(),
                    domain: domain,
                    access_token: access_token,
                    instance: ExampleInstance()
                });
                call++;
            } catch (e){
                done(e);
            }
        });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
        NavigationService.resetAndNavigate.mockClear();
    });
    it("accountChangeWithDelete fail", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch.mockImplementation(() => {
            throw new Error("Network Error");
        });
        Session.setDefault.mockImplementation(() => null);
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Login });
            done();
        });
        let action = accountChangeWithDelete(0);
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call++;
            } catch (e){
                done(e);
            }
        });
        Session.getDomainAndToken.mockClear();
        Session.setDefault.mockClear();
        Networking.fetch.mockClear();
        NavigationService.resetAndNavigate.mockClear();
    });
    it("accountChangeWithDelete notfound", done => {
        Session.getDomainAndToken.mockImplementation(()=> ({ domain:null, access_token:null }));
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Login });
            done();
        });
        let action = accountChangeWithDelete(0);
        action(() => null);
        Session.getDomainAndToken.mockClear();
    });
});