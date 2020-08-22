import React from "react";
import renderer from "react-test-renderer";

import theme from "../../themes/default";
import { ThemeContext } from "react-native-elements";

import DraftModal from "../DraftModal";
import EmojisModal from "../EmojisModal";
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

import * as searchConst from "../../constants/search";
import * as Example from "./example";

jest.mock("@expo/vector-icons/build/FontAwesome", () => "FontAwesome");
jest.mock("react-native-elements/src/icons/Icon", () => "Icon");

//TODO: getDraftAll mock
//it("<DraftModal />", () => {
//    const result = renderer.create(
//        <ThemeContext.Provider value={{ theme }}>
//            <DraftModal onSelect={(s)=>null} />
//        </ThemeContext.Provider>
//    );
//    expect(result).toMatchSnapshot();
//});

//TODO: getEmojis mock
//it("<EmojisModal />", () => {
//    const result = renderer.create(
//        <ThemeContext.Provider value={{ theme }}>
//            <EmojisModal current={Example.current} onSelect={(s)=>null} />
//        </ThemeContext.Provider>
//    );
//    expect(result).toMatchSnapshot();
//});

it("<ItemTabBar />", () => {
    const result = renderer.create(
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
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <MastoRow
                item={Example.status}
                current={Example.current} 
                actions={{
                    ReplyAction: () => null,
                    BoostAction: () => null,
                    FavouriteAction: () => null,
                    BookmarkAction: () => null,
                    HideAction: () => null,
                    DeleteAction: () => null,
                    openImageViewerAction: () => null,
                    closeImageViewerAction: () => null
                }}
                background={false}
            />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<MastoRowBody />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <MastoRowBody
                content={Example.status.content}
                linkStyle={{ color: theme.customColors.link }} 
                style={{}} 
                sensitiveButtonColor={theme.colors.primary}
                emojis={Example.status.emojis} 
                sensitive={Example.status.sensitive}
                spoilerText={Example.status.spoiler_text} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<MastoRowImage />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <MastoRowImage mediaAttachments={[Example.mediaAttachment]} sensitive={false} openImageViewer={(a, i)=> null} closeImageViewer={(a, i)=> null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});

it("<MastoRowPoll />", () => {
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <MastoRowPoll poll={Example.poll} />
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
            <TimelineCenterHeader fixedTitle={false} onPress={() => null} current={Example.current}/>
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
    const result = renderer.create(
        <ThemeContext.Provider value={{ theme }}>
            <VisibilityModal onSelect={()=>null} />
        </ThemeContext.Provider>
    );
    expect(result).toMatchSnapshot();
});