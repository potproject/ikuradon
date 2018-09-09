import React from "react";
import { View, StyleSheet, RefreshControl, FlatList, ImageBackground } from "react-native";
import MastoRow from "./mastorow";
import MastoRowNotificationsFollow from "./mastorownotificationsfollow";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MainActions from "../actions/actioncreators/main";
import * as MastoRowActions from "../actions/actioncreators/mastorow";

// removeClippedSubviews is buggy. Experimental functions.
// Reference: https://facebook.github.io/react-native/docs/flatlist#removeclippedsubviews
const UsingRemoveClippedSubviews = false;

class Mastolist extends React.Component {

    constructor(props) {
        super(props);
        this.type = this.props.type;
        this.access_token = this.props.navReducer.access_token;
        this.domain = this.props.navReducer.domain;
        this.listdata = this.reducerType(props);
        this.props.MainActions.newLoadingTimeline(this.type,this.listdata.maxId);
        this.backgroundImage = this.props.configReducer.backgroundImage;

        this.myUserCredentials = props.currentUserReducer.user_credentials;
        this.smartMode = props.configReducer.smartMode;
    }
    componentWillReceiveProps(nextProps) {
        this.listdata = this.reducerType(nextProps);
    }
    render() {
        return (
            <ImageBackground source={this.backgroundImage ? {uri:this.backgroundImage} : null} style={styles.background}>
                <View style={styles.container}>
                    <FlatList
                        style={styles.container}
                        data={this.listdata.data}
                        renderItem={(data) => this.mastoRowIdentification(data.item)}
                        keyExtractor={(data) => data.id}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.listdata.refreshing}
                                onRefresh={() => this.props.MainActions.newLoadingTimeline(this.type, this.listdata.maxId)}
                            />
                        }
                        onEndReachedThreshold={1.5}
                        onEndReached={()=>(this.props.MainActions.oldLoadingTimeline(this.type, this.listdata.minId))
                        }
                        removeClippedSubviews={UsingRemoveClippedSubviews}
                    />
                </View>
            </ImageBackground>
        );
    }
    
    reducerType(nextProps) {
        switch (this.type) {
            case "home":
                return nextProps.mainReducer.home;
            case "local":
                return nextProps.mainReducer.local;
            case "federal":
                return nextProps.mainReducer.federal;
            case "notifications":
                return nextProps.mainReducer.notifications;
        }
    }
    mastoRowIdentification(data) {
        if (this.type === "notifications") {
            switch (data.type) {
                case "follow":
                    return <MastoRowNotificationsFollow
                        key={data.id}
                        id={data.id}
                        type={data.type}
                        user={data.account.display_name !== "" ? data.account.display_name : data.account.username}
                        image={data.account.avatar}
                        username={data.account.username}
                        acct={data.account.acct}
                    />;
                case "favourite":
                case "reblog":
                case "mention":
                    return <MastoRow
                        key={data.id}
                        id={data.id}
                        tootid={data.status.id}
                        user={data.status.account.display_name !== "" ? data.status.account.display_name: data.status.account.username}
                        body={data.status.content}
                        image={data.status.account.avatar}
                        reblogged={data.status.reblogged}
                        reblogs_count={data.status.reblogs_count}
                        favourited={data.status.favourited}
                        favourites_count={data.status.favourites_count}
                        date={data.status.created_at}
                        visibility={data.status.visibility}
                        sensitive={data.status.sensitive}
                        spoiler_text={data.status.spoiler_text}
                        username={data.status.account.username}
                        acct={data.status.account.acct}
                        notification_type={data.type}
                        notification_name={data.account.display_name !== "" ? data.account.display_name : data.account.username}
                        media_attachments={[]}
                        url={data.url}
                        emojis={typeof data.emojis !== "undefined" ? data.emojis : [] }
                        my={this.myUserCredentials.acct === data.status.account.acct}
                        application_name={data.application && typeof data.application.name === "string" ? data.application.name : ""}
                        smartMode={this.smartMode}

                        onReply={this.props.MainActions.reply}
                        onBoost={this.props.MastoRowActions.boost}
                        onFavourite={this.props.MastoRowActions.favourite}
                        onHide={this.props.MainActions.hide}
                        onDeleting={this.props.MainActions.deleting}
                    />;
            }
        }
        if (data.reblog === null) {
            return <MastoRow
                key={data.id}
                id={data.id}
                tootid={data.id}
                user={data.account.display_name !== "" ? data.account.display_name : data.account.username}
                body={data.content}
                image={data.account.avatar}
                reblogged={data.reblogged}
                reblogs_count={data.reblogs_count}
                favourited={data.favourited}
                favourites_count={data.favourites_count}
                date={data.created_at}
                visibility={data.visibility}
                sensitive={data.sensitive}
                spoiler_text={data.spoiler_text}
                username={data.account.username}
                acct={data.account.acct}
                notification_type={null}
                notification_name={null}
                media_attachments={data.media_attachments}
                url={data.url}
                emojis={typeof data.emojis !== "undefined" ? data.emojis : [] }
                my={this.myUserCredentials.acct === data.account.acct}
                application_name={data.application && typeof data.application.name === "string" ? data.application.name : ""}
                smartMode={this.smartMode}

                onReply={this.props.MainActions.reply}
                onBoost={this.props.MastoRowActions.boost}
                onFavourite={this.props.MastoRowActions.favourite}
                onHide={this.props.MainActions.hide}
                onDeleting={this.props.MainActions.deleting}
            />;
        } else {
            return <MastoRow
                key={data.id}
                id={data.id}
                tootid={data.reblog.id}
                user={data.reblog.account.display_name !== "" ? data.reblog.account.display_name : data.reblog.account.username}
                body={data.reblog.content}
                image={data.reblog.account.avatar}
                reblogged={data.reblog.reblogged}
                reblogs_count={data.reblog.reblogs_count}
                favourited={data.reblog.favourited}
                favourites_count={data.reblog.favourites_count}
                date={data.reblog.created_at}
                visibility={data.reblog.visibility}
                sensitive={data.reblog.sensitive}
                spoiler_text={data.reblog.spoiler_text}
                username={data.reblog.account.username}
                acct={data.reblog.account.acct}
                notification_type={"reblog"}
                notification_name={data.account.display_name !== "" ? data.account.display_name : data.account.username}
                media_attachments={data.reblog.media_attachments}
                url={data.url}
                emojis={typeof data.reblog.emojis !== "undefined" ? data.reblog.emojis : [] }
                my={this.myUserCredentials.acct === data.reblog.account.acct}
                application_name={data.application && typeof data.application.name === "string" ? data.application.name : ""}
                smartMode={this.smartMode}

                onReply={this.props.MainActions.reply}
                onBoost={this.props.MastoRowActions.boost}
                onFavourite={this.props.MastoRowActions.favourite}
                onHide={this.props.MainActions.hide}
                onDeleting={this.props.MainActions.deleting}
            />;
        }
    }
}

const styles = StyleSheet.create({
    background: {
        width: "100%", 
        height: "100%",
    },
    container: {
        flex: 1,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        marginTop:5,
        marginBottom:5,
        backgroundColor: "#cecece",
    },
});


export default connect((state) => {
    return (state);
},
(dispatch) => ({
    MainActions: bindActionCreators(MainActions, dispatch),
    MastoRowActions: bindActionCreators(MastoRowActions, dispatch)
})
)(Mastolist);