import { boost, favourite, bookmark, follow } from "../mastorow";

import * as Mastorow from "../../actiontypes/mastorow";

import * as Session from "../../../util/session";
import * as Rest from "../../../services/api/Rest";

import ExampleSession from "../../../example/session";
jest.mock("../../../services/api/Rest");

jest.mock("../../../util/session");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

describe("Action/MastoRow", () => {
    it("boost true", async done => {
        await truefalseTest(done, "boost", true);
        done();
    });
    it("boost false", async done => {
        await truefalseTest(done, "boost", false);
        done();
    });
    it("boost fail", async done => {
        await failTest(done, "boost");
        done();
    });
    it("favourite true", async done => {
        await truefalseTest(done, "favourite", true);
        done();
    });
    it("favourite false", async done => {
        await truefalseTest(done, "favourite", false);
        done();
    });
    it("favourite fail", async done => {
        await failTest(done, "favourite");
        done();
    });
    it("bookmark true", async done => {
        await truefalseTest(done, "bookmark", true);
        done();
    });
    it("bookmark false", async done => {
        await truefalseTest(done, "bookmark", false);
        done();
    });
    it("bookmark fail", async done => {
        await failTest(done, "bookmark");
        done();
    });
    it("follow true", async done => {
        await truefalseTest(done, "follow", true);
        done();
    });
    it("follow false", async done => {
        await truefalseTest(done, "follow", false);
        done();
    });
    it("follow fail", async done => {
        await failTest(done, "follow");
        done();
    });
});

async function truefalseTest(done, type, bool){
    let response;
    let dispatchValue;
    let reducerType;
    let action;
    switch (type){
        case "boost":
            response = { reblogged: bool };
            dispatchValue = { boosted: bool };
            reducerType = Mastorow.BOOST_MASTOROW;
            Rest.reblogStatus.mockImplementation(() => response);
            Rest.unreblogStatus.mockImplementation(() => response);
            action = boost("100100", "100100", bool);
            break;
        case "favourite":
            response = { favourited: bool };
            dispatchValue = { favourited: bool };
            reducerType = Mastorow.FAVOURITE_MASTOROW;
            Rest.favouriteStatus.mockImplementation(() => response);
            Rest.unfavouriteStatus.mockImplementation(() => response);
            action = favourite("100100", "100100", bool);
            break;
        case "bookmark":
            response = { bookmarked: bool };
            dispatchValue = { bookmarked: bool };
            reducerType = Mastorow.BOOKMARK_MASTOROW;
            Rest.bookmarkStatus.mockImplementation(() => response);
            Rest.unbookmarkStatus.mockImplementation(() => response);
            action = bookmark("100100", "100100", bool);
            break;
        case "follow":
            response = { following: bool };
            dispatchValue = { followed: bool };
            reducerType = Mastorow.FOLLOW_MASTOROW;
            Rest.followAccount.mockImplementation(() => response);
            Rest.unfollowAccount.mockImplementation(() => response);
            action = follow("100100", bool);
            break;
    }
    console.log = jest.fn();
    Session.getDomainAndToken.mockImplementation(() => ExampleSession());
    await action((callback) => {
        try {
            expect(callback).toEqual(Object.assign({}, { type: reducerType, id: "100100" }, dispatchValue));
        } catch (e){
            done(e);
        }
    });
    console.log.mockReset();
    Session.getDomainAndToken.mockReset();
    Rest.reblogStatus.mockReset();
    Rest.unreblogStatus.mockReset();
    Rest.favouriteStatus.mockReset();
    Rest.unfavouriteStatus.mockReset();
    Rest.bookmarkStatus.mockReset();
    Rest.unbookmarkStatus.mockReset();
    Rest.followAccount.mockReset();
    Rest.unfollowAccount.mockReset();
}

async function failTest(done, type){
    let dispatchValueT;
    let dispatchValueF;
    let action;
    let reducerType;
    switch (type){
        case "boost":
            dispatchValueT = { boosted: true };
            dispatchValueF = { boosted: false };
            reducerType = Mastorow.BOOST_MASTOROW;
            action = boost("100100", "100100", true);
            break;
        case "favourite":
            dispatchValueT = { favourited: true };
            dispatchValueF = { favourited: false };
            reducerType = Mastorow.FAVOURITE_MASTOROW;
            action = favourite("100100", "100100", true);
            break;
        case "bookmark":
            dispatchValueT = { bookmarked: true };
            dispatchValueF = { bookmarked: false };
            reducerType = Mastorow.BOOKMARK_MASTOROW;
            action = bookmark("100100", "100100", true);
            break;
        case "follow":
            dispatchValueT = { followed: true };
            dispatchValueF = { followed: false };
            reducerType = Mastorow.FOLLOW_MASTOROW;
            action = follow("100100", true);
            break;
    }
    console.log = jest.fn();
    Session.getDomainAndToken.mockImplementation(() => {
        throw new Error("Network Error");
    });
    let call = 0;
    await action((callback) => {
        try {
            call === 0 && expect(callback).toEqual(Object.assign({}, { type: reducerType, id: "100100" }, dispatchValueT));
            call === 1 && expect(callback).toEqual(Object.assign({}, { type: reducerType, id: "100100" }, dispatchValueF));
            call++;
        } catch (e){
            done(e);
        }
    });
    console.log.mockReset();
    Session.getDomainAndToken.mockReset();
}