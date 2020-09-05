import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import DraftModal from "../DraftModal";
import EmojisModal from "../EmojisModal";
import { getDraftAll } from "../../util/draft";
import { getEmojis } from "../../util/emojis";

import ExampleCurrent from "../../example/current";
import ExampleEmojis from "../../example/emojis";

jest.mock("../../util/draft");
jest.mock("../../util/emojis");

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