import React from "react";
import renderer from "react-test-renderer";

import theme from "../../themes/default";
import { ThemeContext } from "react-native-elements";

import NotificationsList from "../NotificationsList";
import NotificationsRow from "../NotificationsRow";
import TimelineTootButton from "../TimelineTootButton";
import TootButton from "../TootButton";
import TootImageClip from "../TootImageClip";
import UserList from "../UserList";
import VisibilityModal from "../VisibilityModal";
import TimelineStreamingButton from "../TimelineStreamingButton";
import TimelineLeftHeader from "../TimelineLeftHeader";
import TimelineCenterHeader from "../TimelineCenterHeader";
import Search from "../Search";
import SearchList from "../SearchList";

import * as searchConst from "../../constants/search";
import MastoRowPoll from "../MastoRowPoll";

jest.mock("@expo/vector-icons/build/FontAwesome", () => "FontAwesome");
jest.mock("react-native-elements/src/icons/Icon", () => "Icon");

const mockCurrent = {
    user_credentials: {
        id: "1",
        acct: "example",
        display_name: "example",
        avatar: "http://example.com/example.png",
    },
    domain: "example.com",
    access_token: "ACCEESS_TOKEN",
    notification_count: 0,
    instance: {
        contact_account:{},
        description: "description"
    }
};

const mockPoll = {
    id: "1",
    expires_at: "",
    expired: false,
    multiple: false,
    votes_count: 0,
    voters_count: 0,
    voted: false,
    options: [],
};


it("<MastoRowPoll />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <MastoRowPoll poll={mockPoll} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

//it("<NotificationsList />", () => {
//    const result = renderer.create(
//        <ThemeContext.Provider value={{ theme }}>
//            <NotificationsList type={"notifications"} />
//        </ThemeContext.Provider>
//    );
//    expect(result).toMatchSnapshot();
//});

//it("<NotificationsRow />", () => {
//    const result = renderer.create(
//        <ThemeContext.Provider value={{ theme }}>
//            <NotificationsRow item={{}} current={current} actions={actions} background={config.backgroundImage !== null} />
//        </ThemeContext.Provider>
//    );
//    expect(result).toMatchSnapshot();
//});

it("<Search />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <Search />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<SearchList />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <SearchList type={searchConst.TYPE_ACCOUNTS} data={[]} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<TimelineCenterHeader />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <TimelineCenterHeader fixedTitle={false} onPress={() => null} current={mockCurrent}/>
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<TimelineLeftHeader />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <TimelineLeftHeader isBack={true} onPress={() => null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

//it("<TimelineStreamingButton />", () => {
//    const result = renderer.create(
//        <ThemeContext.Provider value={{ theme }}>
//            <TimelineStreamingButton 
//                type={"home"}
//            />
//        </ThemeContext.Provider>
//    );
//    expect(result).toMatchSnapshot();
//});

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
//            <UserList current={mockCurrent} onSelect={()=>null} />
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