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
            domain: null,
            access_token: null,
            username: null,
            avatar: null
        });
        getItem.mockClear();
    });
    it("Add", async done => {
        getItem.mockImplementation(() => ({ "accounts": [], "login_index": -1 }));
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [ExampleSession()], "login_index": 0 }).toEqual(v);
            done();
        });
        const { domain, access_token, username, avatar } = ExampleSession();
        await add(domain, access_token, username, avatar);
        getItem.mockClear();
        setItem.mockClear();
    });
    it("Add nosession", async done => {
        getItem.mockImplementation(() => null);
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [ExampleSession()], "login_index": 0 }).toEqual(v);
            done();
        });
        const { domain, access_token, username, avatar } = ExampleSession();
        await add(domain, access_token, username, avatar);
        getItem.mockClear();
        setItem.mockClear();
    });
    it("Add exists", async done => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": -1 }));
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [ExampleSession()], "login_index": 0 }).toEqual(v);
            done();
        });
        const { domain, access_token, username, avatar } = ExampleSession();
        await add(domain, access_token, username, avatar);
        getItem.mockClear();
        setItem.mockClear();
    });
    it("init", async done => {
        getItem.mockImplementation(() => null);
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [], "login_index": -1 }).toEqual(v);
            done();
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
    it("deleteCurrentItems", async done => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": 0 }));
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [], "login_index": -1 }).toEqual(v);
            done();
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
    it("deleteItems", async done => {
        getItem.mockImplementation(() => ({ "accounts": [ExampleSession()], "login_index": 0 }));
        setItem.mockImplementation((k, v) => {
            expect(CONST_Storage.Session).toEqual(k);
            expect({ "accounts": [], "login_index": -1 }).toEqual(v);
            done();
        });
        await deleteItems(0);
        getItem.mockClear();
        setItem.mockClear();
    });
});