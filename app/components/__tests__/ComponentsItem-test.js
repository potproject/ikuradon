import React from "react";
import renderer from "react-test-renderer";

import theme from "../../themes/default";
import { ThemeContext } from "react-native-elements";

import * as Example from "./example";
import Action from "../item/Action";
import Bookmark from "../item/Bookmark";
import Boost from "../item/Boost";
import Favourite from "../item/Favourite";
import Follow from "../item/Follow";
import Reply from "../item/Reply";

jest.mock("@expo/vector-icons/build/FontAwesome", () => "FontAwesome");
jest.mock("react-native-elements/src/icons/Icon", () => "Icon");

it("<Action />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <Action
                id={Example.status.id}
                tootid={Example.status.id}
                style={{}}
                url={Example.status.url}
                account_url={Example.account.url}
                user={Example.account.display_name}
                acct={Example.account.acct}
                image={Example.account.avatar}
                body={Example.status.content}
                myself={true}
                onReply={() => null}
                onHide={() => null}
                onDeleting={() => null}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<Bookmark />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <Bookmark
                id={Example.status.id}
                tootid={Example.status.id}
                bookmarked={true}
                style={{}}
                onBookmark={() => null}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<Boost />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <Boost
                id={Example.status.id}
                tootid={Example.status.id}
                reblogged={true}
                count={1}
                style={{}}
                onBoost={() => null}
                disabled={false}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<Favourite />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <Favourite
                id={Example.status.id}
                tootid={Example.status.id}
                favourited={true}
                count={2}
                style={{}}
                onFavourite={()=>null}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<Follow />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <Follow
                id={Example.status.id}
                style={{}}
                onFollow={() => null}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<Reply />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <Reply
                id={Example.status.id}
                tootid={Example.status.id}
                user={Example.account.display_name}
                acct={Example.account.acct}
                image={Example.account.avatar}
                body={Example.status.content}
                style={{}}
                onReply={() => null}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});