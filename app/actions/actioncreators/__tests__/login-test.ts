import { login, loginSelectAccounts, loginWithAccessToken, logout, accountChange, accountChangeWithDelete } from "../login";

import * as Session from "../../../util/session";

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

import * as Rest from "../../../services/api/Rest";
jest.mock("../../../services/api/Rest");

jest.mock("../../../util/session");

jest.mock("../../../services/NavigationService");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

describe("Action/Login", () => {
    it("login", done => {
        const domain = "example.net";
        const sns = "mastodon";
        Rest.createApp.mockImplementation(() => ExampleApps());
        NavigationService.navigate.mockImplementation(({ name, params }) => {
            try {
                expect(name).toEqual(RouterName.Authorize);
                let { client_id, client_secret } = ExampleApps();
                expect(params).toEqual({
                    sns,
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "domain": domain,
                    "url": "https://example.net/oauth/authorize?client_id=TWhM-tNSuncnqN7DBJmoyeLnk6K3iJJ71KKXxgL1hPM&response_type=code&redirect_uri=https%3A%2F%2Fikuradon.authorize%2F&scope=read%20write%20follow%20push"                });
                done();
            } catch (error) {
                done(error);
            }
        });
        let action = login(domain, sns);
        let call = 0;
        action((callback) => {
            call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
            call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
            call++;
        });

        Rest.createApp.mockClear();
        NavigationService.navigate.mockClear();
    });
    it("login Fail", done => {
        const domain = "example.net";
        Rest.createApp.mockImplementation(() => {
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

        Rest.createApp.mockClear();
        DropDownHolder.error.mockClear();
    });
    it("loginSelectAccounts", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Rest.getCurrentUser.mockImplementationOnce(() => ExampleAccount());
        Rest.getInstance.mockImplementationOnce(() => ExampleInstance());
        let action = loginSelectAccounts(0);
        let call = 0;
        let { domain, access_token, sns } = ExampleSession();
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call === 2 && (expect(callback).toEqual({ 
                    sns: sns,
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
        Rest.getCurrentUser.mockClear();
        Rest.getInstance.mockClear();
    });
    it("loginSelectAccounts Fail", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Rest.getCurrentUser.mockImplementation(() => {
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
        Rest.getCurrentUser.mockClear();
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
        Rest.getCurrentUser.mockImplementationOnce(() => ExampleAccount());
        Rest.getInstance.mockImplementationOnce(() => ExampleInstance());
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Main });
            done();
        });
        let { domain, access_token, sns } = ExampleSession();
        let action = loginWithAccessToken("mastodon", domain, access_token);
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call === 2 && expect(callback).toEqual({ 
                    sns: sns,
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
        Rest.getCurrentUser.mockClear();
        Rest.getInstance.mockClear();
        NavigationService.resetAndNavigate.mockClear();
    });
    it("loginWithAccessToken Fail", done => {
        Rest.getCurrentUser.mockImplementationOnce(() =>  {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementation((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        let { domain, access_token } = ExampleSession();
        let action = loginWithAccessToken("misskey", domain, access_token);
        action(() => null);
        Rest.getCurrentUser.mockClear();
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
        Rest.getCurrentUser.mockImplementationOnce(() => ExampleAccount());
        Rest.getInstance.mockImplementationOnce(() => ExampleInstance());
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Main });
            done();
        });
        let { domain, access_token, sns } = ExampleSession();
        let action = accountChangeWithDelete(0);
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Streaming.STREAM_ALLSTOP });
                call === 1 && expect(callback).toEqual({ type: Main.ALLCLEAR_MASTOLIST });
                call === 2 && expect(callback).toEqual({ 
                    sns: sns,
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
        Rest.getCurrentUser.mockClear();
        Rest.getInstance.mockClear();
        NavigationService.resetAndNavigate.mockClear();
    });
    it("accountChangeWithDelete fail", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Rest.getCurrentUser.mockImplementationOnce(() => {
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
        Rest.getCurrentUser.mockClear();
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