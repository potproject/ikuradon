import { getAll, setDefault, setIndex, getDomainAndToken, add, init, deleteCurrentItems, deleteItems } from "../session";
import { getItem, setItem } from "../../util/storage";
import ExampleSession from "../../example/session";

import * as CONST_Storage from "../../constants/storage";

jest.mock("../../util/storage");

describe("Util/Session", () => {
    it("getAll null", async () => {
        getItem.mockImplementation(() => null);
        expect(await getAll()).toEqual({ "accounts": [], "login_index": -1 });
        getItem.mockClear();
    });
    it("getAll exists", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": 0 }));
        expect(await getAll()).toEqual({ "accounts": [ExampleSession()], "login_index": 0 });
        getItem.mockClear();
    });
    it("setDefault", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": 0 }));
        expect(await setDefault()).toEqual({ "accounts": [ExampleSession()], "login_index": -1 });
        getItem.mockClear();
    });
    it("setIndex", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": -1 }));
        expect(await setIndex(0)).toEqual({ "accounts": [ExampleSession()], "login_index": 0 });
        getItem.mockClear();
    });
    it("getDomainAndToken", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": 0 }));
        expect(await getDomainAndToken()).toEqual(ExampleSession());
        getItem.mockClear();
    });
    it("getDomainAndToken noindex", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": -1 }));
        expect(await getDomainAndToken()).toEqual({
            sns: null,
            domain: null,
            access_token: null,
            username: null,
            avatar: null
        });
        getItem.mockClear();
    });
    it("Add", async () => {
        getItem.mockImplementation(() => ({ "accounts": [], "login_index": -1 }));
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [ExampleSession()], "login_index": 0 }).toEqual(v);
        });
        const { sns, domain, access_token, username, avatar } = ExampleSession();
        await add(sns as "mastodon", domain, access_token, username, avatar);
        getItem.mockClear();
        setItem.mockClear();
    });
    it("Add nosession", async () => {
        getItem.mockImplementation(() => null);
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [ExampleSession()], "login_index": 0 }).toEqual(v);
        });
        const { sns, domain, access_token, username, avatar } = ExampleSession();
        await add(sns as "mastodon", domain, access_token, username, avatar);
        getItem.mockClear();
        setItem.mockClear();
    });
    it("Add exists seperate", async () => {
        let account = ExampleSession();
        account.access_token = "ACCEESS_TOKEN_SEPERATE";
        getItem.mockImplementation(() => ({ "accounts": [account], "login_index": -1 }));
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [account, ExampleSession()], "login_index": 1 }).toEqual(v);
        });
        const { sns, domain, access_token, username, avatar } = ExampleSession();
        await add(sns as "mastodon", domain, access_token, username, avatar);
        getItem.mockClear();
        setItem.mockClear();
    });
    it("Add exists", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": -1 }));
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [ExampleSession()], "login_index": 0 }).toEqual(v);
        });
        const { sns, domain, access_token, username, avatar } = ExampleSession();
        await add(sns as "mastodon", domain, access_token, username, avatar);
        getItem.mockClear();
        setItem.mockClear();
    });
    it("init", async () => {
        getItem.mockImplementation(() => null);
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [], "login_index": -1 }).toEqual(v);
        });
        expect(await init()).toEqual({ "accounts": [], "login_index": -1 });
        getItem.mockClear();
        setItem.mockClear();
    });
    it("init exist", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": 0 }));
        expect(await init()).toEqual({ "accounts": [ExampleSession()], "login_index": 0 });
        getItem.mockClear();
    });
    it("deleteCurrentItems", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": 0 }));
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [], "login_index": -1 }).toEqual(v);
        });
        await deleteCurrentItems();
        getItem.mockClear();
        setItem.mockClear();
    });
    it("deleteCurrentItems notfound", async () => {
        getItem.mockImplementation(() => ({ "accounts": [], "login_index": -1 }));
        await deleteCurrentItems();
        getItem.mockClear();
    });
    it("deleteItems", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": 0 }));
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [], "login_index": -1 }).toEqual(v);
        });
        await deleteItems(0);
        getItem.mockClear();
        setItem.mockClear();
    });
    it("deleteItems not found", async () => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": 0 }));
        await deleteItems(-1);
        getItem.mockClear();
    });
});