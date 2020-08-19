import React from "react";
import renderer from "react-test-renderer";

import theme from "../../themes/default";
import { ThemeContext } from "react-native-elements";

import TimelineTootButton from "../TimelineTootButton";
import TootButton from "../TootButton";
import TootImageClip from "../TootImageClip";
import UserList from "../UserList";
import VisibilityModal from "../VisibilityModal";

jest.mock("@expo/vector-icons/build/FontAwesome", () => "FontAwesome");
jest.mock("react-native-elements/src/icons/Icon", () => "Icon");

it("<TimelineTootButton />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <TimelineTootButton 
                onPress={() => null}
                enabled={true}
                loading={false}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<TootButton />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <TootButton onPress={()=>null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<TootImageClip />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <TootImageClip callbackMediaAttachments={()=>null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

//it("<UserList />", () => {
//    const result = renderer.create(
//        <ThemeContext.Provider value={{ theme }}>
//            <UserList current={{}} onSelect={()=>null} />
//        </ThemeContext.Provider>
//    );
//    expect(result).toMatchSnapshot();
//});

it("<VisibilityModal />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <VisibilityModal onSelect={()=>null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});