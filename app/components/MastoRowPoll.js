import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemeContext } from "react-native-elements";
import PropTypes from "prop-types";
import { timeStr, votePer, voters, votes } from "../util/poll";
import t from "../services/I18n";

function MastoRowPoll({ poll }){
    const { theme } = useContext(ThemeContext);
    let { id, expires_at, expired, multiple, votes_count, voters_count, voted, own_votes, options, emojis } = poll;
    return (
        <View style={styles.container}>
            {
                options.map((v, i)=>{
                    return (
                        <Text style={[{ color: theme.customColors.char }, styles.pollDetailsRow]} key={i}>{v.title} - {v.votes_count}{t("polls.votes")} ({votePer(v.votes_count, votes_count)})</Text>
                    );
                })
            }
            <Text style={[{ color: theme.colors.grey0 }, styles.pollDetailsRow]}>{voters(voters_count)}{votes(votes_count)} - {timeStr(expires_at, expired)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    pollDetailsRow:{
        flex: 1,
        marginTop: 5,
        marginLeft: 10,
        marginRight:10,
        fontSize: 14,
    },
});

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
            emojis: PropTypes.array,
        }
    )
};

export default MastoRowPoll;