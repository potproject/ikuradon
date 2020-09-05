import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import theme from "../../themes/default";
import { ThemeContext } from "react-native-elements";

import Action from "../item/Action";
import Bookmark from "../item/Bookmark";
import Boost from "../item/Boost";
import Favourite from "../item/Favourite";
import Follow from "../item/Follow";
import Reply from "../item/Reply";

import ExampleStatus from "../../example/status";
import ExampleAccount from "../../example/account";

jest.mock("@expo/vector-icons/build/FontAwesome", () => "FontAwesome");
jest.mock("react-native-elements/src/icons/Icon", () => "Icon");

it("<Action />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <Action
                id={ExampleStatus().id}
                tootid={ExampleStatus().id}
                style={{}}
                url={ExampleStatus().url}
                account_url={ExampleAccount().url}
                user={ExampleAccount().display_name}
                acct={ExampleAccount().acct}
                image={ExampleAccount().avatar}
                body={ExampleAccount().content}
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
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <Bookmark
                id={ExampleStatus().id}
                tootid={ExampleStatus().id}
                bookmarked={true}
                style={{}}
                onBookmark={() => null}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<Boost />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <Boost
                id={ExampleStatus().id}
                tootid={ExampleStatus().id}
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
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <Favourite
                id={ExampleStatus().id}
                tootid={ExampleStatus().id}
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
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <Follow
                id={ExampleStatus().id}
                style={{}}
                onFollow={() => null}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<Reply />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <Reply
                id={ExampleStatus().id}
                tootid={ExampleStatus().id}
                user={ExampleAccount().display_name}
                acct={ExampleAccount().acct}
                image={ExampleAccount().avatar}
                body={ExampleStatus().content}
                style={{}}
                onReply={() => null}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});