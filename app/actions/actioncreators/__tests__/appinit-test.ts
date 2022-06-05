import { appInit } from "../appinit";

import * as Config from "../../actiontypes/config";
import * as AppInit from "../../actiontypes/appinit";
import * as PushNotification from "../../actiontypes/pushnotification";
import * as CurrentUser from "../../actiontypes/currentuser";
import * as OpenSticker from "../../actiontypes/opensticker";

import * as Rest from "../../../services/api/Rest";
import NavigationService from "../../../services/NavigationService";

import * as RouterName from "../../../constants/RouterName";

import { getItem } from "../../../util/storage";
import { settingTheme } from "../../../util/theme";
import * as Session from "../../../util/session";

import ExampleAccount from "../../../example/account";
import ExampleInstance from "../../../example/instance";
import ExampleSession from "../../../example/session";
import ExampleCurrent from "../../../example/current";
import { initialState as initConfig } from "../../../reducers/config";

jest.mock("../../../util/storage");
jest.mock("../../../util/theme");
jest.mock("../../../util/session");
jest.mock("../../../util/push");
jest.mock("../../../services/NavigationService");
jest.mock("../../../services/Networking");
jest.mock("../../../services/api/Rest");

describe("Action/AppInit", () => {
    it("appInit", async done => {
        getItem
            // CONST_Storage.Config
            .mockImplementationOnce(() => initConfig)
            // CONST_Storage.Push
            .mockImplementationOnce(() => ({}))
            // CONST_Storage.OpenSticker
            .mockImplementationOnce(() => ({}));
        Rest.getCurrentUser
            // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ExampleAccount());
        Rest.getInstance
            // CONST_API.GET_INSTANCE
            .mockImplementationOnce(() => ExampleInstance());
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Main });
            done();
        });
        let action = appInit(()=>null);
        let call = 0;
        const { user_credentials, domain, access_token, instance, sns } = ExampleCurrent();
        await action((callback)=>{
            try {
                call === 0 && expect(callback).toEqual({ type: Config.CONFIG_LOAD, config: initConfig });
                call === 1 && expect(callback).toEqual({ type: PushNotification.PUSHNOTIFICATION_LOAD, pushNotifications: {} });
                call === 2 && expect(callback).toEqual({ type: OpenSticker.OPENSTICKER_LOAD, openSticker: {} });
                call === 3 && expect(callback).toEqual({ type:CurrentUser.UPDATE_CURRENT_USER, sns, user_credentials, domain, access_token, instance });
                call === 4 && expect(callback).toEqual({ type:AppInit.APPINIT_COMPLETE });
                call++;
            } catch (e){
                done(e);
            }
        });
        getItem.mockReset();
        Session.getDomainAndToken.mockReset();
        Rest.getInstance.mockReset();
        Rest.getCurrentUser.mockReset();
        NavigationService.resetAndNavigate.mockReset();
    });
    it("appInit config and push null", async done => {
        getItem
            // CONST_Storage.Config
            .mockImplementationOnce(() => null)
            // CONST_Storage.Push
            .mockImplementationOnce(() => null)
            // CONST_Storage.OpenSticker
            .mockImplementationOnce(() => null);
        Rest.getCurrentUser
            // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ExampleAccount());
        Rest.getInstance
            // CONST_API.GET_INSTANCE
            .mockImplementationOnce(() => ExampleInstance());
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Main });
            done();
        });
        let action = appInit(()=>null);
        let call = 0;
        const { user_credentials, domain, access_token, instance, sns } = ExampleCurrent();
        await action((callback)=>{
            try {
                call === 0 && expect(callback).toEqual({ type:CurrentUser.UPDATE_CURRENT_USER, sns, user_credentials, domain, access_token, instance });
                call === 1 && expect(callback).toEqual({ type:AppInit.APPINIT_COMPLETE });
                call++;
            } catch (e){
                done(e);
            }
        });
        getItem.mockReset();
        Session.getDomainAndToken.mockReset();
        Rest.getInstance.mockReset();
        Rest.getCurrentUser.mockReset();
        NavigationService.resetAndNavigate.mockReset();
    });
    it("appInit config.theme undefined", async done => {
        let initConfigDeepCopy = JSON.parse(JSON.stringify(initConfig));
        delete initConfigDeepCopy.theme;
        getItem
            // CONST_Storage.Config
            .mockImplementationOnce(() => {
                return initConfigDeepCopy;
            })
            // CONST_Storage.Push
            .mockImplementationOnce(() => ({}))
            // CONST_Storage.OpenSticker
            .mockImplementationOnce(() => ({}));
        Rest.getCurrentUser
            // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ExampleAccount());
        Rest.getInstance
            // CONST_API.GET_INSTANCE
            .mockImplementationOnce(() => ExampleInstance());
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Main });
            done();
        });
        let action = appInit(()=>null);
        let call = 0;
        const { user_credentials, domain, access_token, instance, sns } = ExampleCurrent();
        await action((callback)=>{
            try {
                call === 0 && expect(callback).toEqual({ type: Config.CONFIG_LOAD, config: initConfigDeepCopy });
                call === 1 && expect(callback).toEqual({ type: PushNotification.PUSHNOTIFICATION_LOAD, pushNotifications: {} });
                call === 2 && expect(callback).toEqual({ type: OpenSticker.OPENSTICKER_LOAD, openSticker: {} });
                call === 3 && expect(callback).toEqual({ type:CurrentUser.UPDATE_CURRENT_USER, sns, user_credentials, domain, access_token, instance });
                call === 4 && expect(callback).toEqual({ type:AppInit.APPINIT_COMPLETE });
                call++;
            } catch (e){
                done(e);
            }
        });
        getItem.mockReset();
        Session.getDomainAndToken.mockReset();
        Rest.getInstance.mockReset();
        Rest.getCurrentUser.mockReset();
        NavigationService.resetAndNavigate.mockReset();
    });
    it("appInit domain&access_token null", async done => {
        getItem
            // CONST_Storage.Config
            .mockImplementationOnce(() => initConfig)
            // CONST_Storage.Push
            .mockImplementationOnce(() => ({}))
            // CONST_Storage.OpenSticker
            .mockImplementationOnce(() => ({}));
        Rest.getCurrentUser
            // CONST_API.GET_CURRENT_USER
            .mockImplementationOnce(() => ExampleAccount());
        Rest.getInstance
            // CONST_API.GET_INSTANCE
            .mockImplementationOnce(() => ExampleInstance());
        Session.getDomainAndToken.mockImplementation(() => ({
            domain: null,
            access_token: null,
            username: null,
            avatar: null
        }));
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Login });
            done();
        });
        let action = appInit(()=>null);
        let call = 0;
        await action((callback)=>{
            try {
                call === 0 && expect(callback).toEqual({ type: Config.CONFIG_LOAD, config: initConfig });
                call === 1 && expect(callback).toEqual({ type: PushNotification.PUSHNOTIFICATION_LOAD, pushNotifications: {} });
                call === 2 && expect(callback).toEqual({ type: OpenSticker.OPENSTICKER_LOAD, openSticker: {} });
                call === 3 && expect(callback).toEqual({ type:AppInit.APPINIT_COMPLETE });
                call++;
            } catch (e){
                done(e);
            }
        });
        getItem.mockReset();
        Session.getDomainAndToken.mockReset();
        Rest.getInstance.mockReset();
        Rest.getCurrentUser.mockReset();
        NavigationService.resetAndNavigate.mockReset();
    });
    it("appInit Login Error", async done => {
        getItem
            // CONST_Storage.Config
            .mockImplementationOnce(() => initConfig)
            // CONST_Storage.Push
            .mockImplementationOnce(() => ({}))
            // CONST_Storage.OpenSticker
            .mockImplementationOnce(() => ({}));
        Rest.getCurrentUser
            // CONST_API.GET_CURRENT_USER
            .mockImplementation(() => {throw new Error("Network Error")});
        Rest.getInstance
            // CONST_API.GET_INSTANCE
            .mockImplementation(() => {throw new Error("Network Error")});
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        NavigationService.resetAndNavigate.mockImplementation((callback) => {
            expect(callback).toEqual({ name: RouterName.Login });
            done();
        });
        let action = appInit(()=>null);
        let call = 0;
        await action((callback)=>{
            try {
                call === 0 && expect(callback).toEqual({ type: Config.CONFIG_LOAD, config: initConfig });
                call === 1 && expect(callback).toEqual({ type: PushNotification.PUSHNOTIFICATION_LOAD, pushNotifications: {} });
                call === 2 && expect(callback).toEqual({ type: OpenSticker.OPENSTICKER_LOAD, openSticker: {} });
                call === 3 && expect(callback).toEqual({ type:AppInit.APPINIT_COMPLETE });
                call++;
            } catch (e){
                done(e);
            }
        });
        getItem.mockReset();
        Session.getDomainAndToken.mockReset();
        Rest.getInstance.mockReset();
        Rest.getCurrentUser.mockReset();
        NavigationService.resetAndNavigate.mockReset();
    });
});