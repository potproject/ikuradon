import React from "react";
import { render } from "@testing-library/react-native";

import { Provider } from "react-redux";
import createStore from "../../store/store";

import theme from "../../themes/default";
import { ThemeContext } from "react-native-elements";

import MastoRowBody from "../MastoRowBody";
import MastoRow from "../MastoRow";
import ItemTabBar from "../ItemTabBar";
import MastoRowPoll from "../MastoRowPoll";
import MastoRowImage from "../MastoRowImage";
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
import OpenSticker from "../OpenSticker";

import * as searchConst from "../../constants/search";

import ExampleCurrent from "../../example/current";
import ExampleStatus from "../../example/status";
import ExamplePoll from "../../example/poll";
import ExampleMediaAttachment from "../../example/mediaAttachment";
import ExampleOpenSticker from "../../example/opensticker";
import { initialState as configState } from "../../reducers/config";

jest.mock("@expo/vector-icons/build/FontAwesome", () => "FontAwesome");
jest.mock("react-native-elements/src/icons/Icon", () => "Icon");

it("<ItemTabBar />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <ItemTabBar name={"home"} badgeCount={1} streamBadge={false} color={"#000000"} size={26} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

//it("<MastoList />", () => {
//    const result = renderer.create(
//        <ThemeContext.Provider value={{ theme }}>
//            <MastoList type={"home"} />
//        </ThemeContext.Provider>
//    );
//    expect(result).toMatchSnapshot();
//});

it("<MastoRow />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <MastoRow
                item={ExampleStatus()}
                current={ExampleCurrent()}
                actions={{
                    ReplyAction: () => null,
                    BoostAction: () => null,
                    FavouriteAction: () => null,
                    BookmarkAction: () => null,
                    HideAction: () => null,
                    DeleteAction: () => null,
                    OpenImageViewerAction: () => null,
                    CloseImageViewerAction: () => null
                }}
                background={false}
                fontSize={configState.fontSize}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<MastoRowBody />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <MastoRowBody
                content={ExampleStatus().content}
                linkStyle={{ color: theme.customColors.link }} 
                style={{}} 
                sensitiveButtonColor={theme.colors.primary}
                emojis={ExampleStatus().emojis} 
                sensitive={ExampleStatus().sensitive}
                spoilerText={ExampleStatus().spoiler_text} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<MastoRowImage />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <MastoRowImage mediaAttachments={[ExampleMediaAttachment()]} sensitive={false} openImageViewer={(a, i)=> null} closeImageViewer={(a, i)=> null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<MastoRowPoll />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <MastoRowPoll poll={ExamplePoll()} fontSize={16} />
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

it("<OpenSticker />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <OpenSticker acct={ExampleOpenSticker().acct} currentDomain={ExampleOpenSticker().currentDomain} data={ExampleOpenSticker().data} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<Search />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <Search />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<SearchList />", () => {
    const result = render(
        <Provider store={createStore()}>
            <ThemeContext.Provider value={{ theme }}>
                <SearchList type={searchConst.TYPE_ACCOUNTS} data={[]} />
            </ThemeContext.Provider>
        </Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<TimelineCenterHeader />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <TimelineCenterHeader fixedTitle={false} onPress={() => null} current={ExampleCurrent()}/>
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<TimelineLeftHeader isBack={true} />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <TimelineLeftHeader isBack={true} onPress={() => null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<TimelineLeftHeader isBack={false} />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <TimelineLeftHeader isBack={false} onPress={() => null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

// TODO: WebSOcket Mock
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
    const result = render(
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
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <TootButton onPress={()=>null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<TootImageClip />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <TootImageClip callbackMediaAttachments={()=>null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

// TODO: Session mock
//it("<UserList />", () => {
//    const result = renderer.create(
//        <ThemeContext.Provider value={{ theme }}>
//            <UserList current={Example.current} onSelect={()=>null} />
//        </ThemeContext.Provider>
//    );
//    expect(result).toMatchSnapshot();
//});

it("<VisibilityModal />", () => {
    const result = render(
        <ThemeContext.Provider value={{ theme }}>
            <VisibilityModal onSelect={()=>null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});