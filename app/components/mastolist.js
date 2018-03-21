import React from "react";
import { View, StyleSheet, RefreshControl, FlatList } from "react-native";
import { OptimizedFlatList } from "react-native-optimized-flatlist";
import MastoRow from "./mastorow";
import MastoRowNotificationsFollow from "./mastorownotificationsfollow";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MainActions from "../actions/actioncreators/main";

//TODO OptimizedFlatListは設定で変更できるようにしよう・・・
//やっぱりイマイチなのでfalseに
const UsingOptimizedFlatList = false;

class Mastolist extends React.Component {

    constructor(props) {
        super(props);
        this.type = this.props.type;
        this.access_token = this.props.navReducer.access_token;
        this.domain = this.props.navReducer.domain;
        this.listdata = this.reducerType(props);
        this.props.MainActions.newLoadingTimeline(this.type,this.listdata.maxId);
        this.ChangeFlatView = UsingOptimizedFlatList ? OptimizedFlatList : FlatList;
    }

    componentWillReceiveProps(nextProps) {
        this.listdata = this.reducerType(nextProps);
    }
    render() {
        let ChangeFlatView = this.ChangeFlatView;
        return (
            <View style={styles.container}>
                <ChangeFlatView
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
                />
            </View>
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
                        favourited={data.status.favourited}
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
                favourited={data.favourited}
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
                favourited={data.reblog.favourited}
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
            />;
        }
    }
}

const styles = StyleSheet.create({
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
    MainActions: bindActionCreators(MainActions, dispatch)
})
)(Mastolist);