import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import {open as openUrl} from "../util/url";
import t from "../services/I18n";

function MastoRowPoll({poll}){
    let {id, expires_at, expired, multiple, votes_count, voters_count, voted, own_votes, options, emojis} = poll;
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

MastoRowPoll.propTypes = {
    poll: PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            expires_at: PropTypes.string,
            expired: PropTypes.bool,
            multiple: PropTypes.bool,
            votes_count: PropTypes.number,
            voters_count: PropTypes.number,
            voted: PropTypes.bool,
            own_votes: PropTypes.arrayOf(PropTypes.number),
            options: PropTypes.arrayOf(
                PropTypes.shape(
                    {
                        title: PropTypes.string,
                        votes_count: PropTypes.number,
                    }
                )
            ),
            emojis: PropTypes.object,
        }
    )
}; 
export default MastoRowPoll;