import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import theme from "../../themes/default";
import { ThemeContext } from "react-native-elements";

import DraftModal from "../DraftModal";
import EmojisModal from "../EmojisModal";
import UserList from "../UserList";
import { getDraftAll } from "../../util/draft";
import { getEmojis } from "../../util/emojis";
import { getAll } from "../../util/session";

import ExampleCurrent from "../../example/current";
import ExampleEmojis from "../../example/emojis";
import ExampleAccount from "../../example/account";

jest.mock("../../util/draft");
jest.mock("../../util/emojis");
jest.mock("../../util/session");

it("<DraftModal />", async () => {
    getDraftAll.mockImplementation(() => {
        return new Promise((resolve) => {
            resolve([{ id:"wgx9stqc", text:"test" }, { id:"a7vy660a", text:"test2" }]);
        });
    });
    const result = render(
        <DraftModal onSelect={(s)=>null} />
    );

    await waitFor(() => {});
    expect(result).toMatchSnapshot();
});

it("<EmojisModal />", async () => {
    getEmojis.mockImplementation(() => {
        return new Promise((resolve) => {
            resolve({ emojis:ExampleEmojis(), error: null });
        });
    });
    const result = render(
        <EmojisModal current={ExampleCurrent()} onSelect={(s)=>null} />
    );

    await waitFor(() => {});
    expect(result).toMatchSnapshot();
});

it("<EmojisModal /> Network Error", async () => {
    getEmojis.mockImplementation(() => {
        return new Promise((resolve) => {
            resolve({ emojis:[], error: "Network Error" });
        });
    });
    const result = render(
        <EmojisModal current={ExampleCurrent()} onSelect={(s)=>null} />
    );

    await waitFor(() => {});
    expect(result).toMatchSnapshot();
});

it("<UserList />", async () => {
    getAll.mockImplementation(() => {
        return new Promise((resolve) => {
            resolve({ accounts:[ExampleAccount()] });
        });
    });
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <UserList current={ExampleCurrent()} onSelect={(s)=>null} onCancel={(s)=>null} />
        </ThemeContext.Provider>
    );

    await waitFor(() => {});
    expect(result).toMatchSnapshot();
});