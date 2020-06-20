import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import {open as openUrl} from "../util/url";
import t from "../services/I18n";

function MastoRowPoll({poll}){
    let {id, expired, expires_at,voters_count,votes_count,voted,own_votes,options,multiple,emojis} = poll;
    //console.log({id, expired, expires_at,voters_count,votes_count,voted,own_votes,options,multiple,emojis});
    return (
        <View style={[]}>
            {
                options.map((v)=>{
                    return <Text>{v.title+": "+v.votes_count+t("polls.votes")}</Text>
                })
            }
        </View>
    );
}

export default MastoRowPoll;