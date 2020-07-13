import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemeContext, Card, Button } from "react-native-elements";
import PropTypes from "prop-types";
import DayJS from "dayjs";
import t from "../services/I18n";

function MastoRowPoll({ poll }){
    const { theme } = useContext(ThemeContext);
    let { id, expires_at, expired, multiple, votes_count, voters_count, voted, own_votes, options, emojis } = poll;
    console.log(poll);
    return (
        <View style={styles.container}>
            {
                options.map((v, i)=>{
                    return (
                        <Text style={styles.pollDetailsRow}key={i}>{v.title} - {v.votes_count}{t("polls.votes")} ({votePer(v.votes_count, votes_count)})</Text>
                    );
                })
            }
            <Text style={[{ color: theme.colors.grey0 }, styles.pollDetailsRow]}>{voters(voters_count)}{votes(votes_count)} - {timeStr(expires_at, expired)}</Text>
        </View>
    );
}

function timeStr(expires_at, expired){
    if (expired){
        return "終了";
    }
    if (!expired && expires_at === null){
        return "投票中";
    }
    return DayJS(expires_at).diff(DayJS(), "h") + "時間";
}
function votePer(count, total){
    if (count === 0 || total === 0){
        return "0%";
    }
    let p = Math.floor(count / total * 100);
    
    return p !== NaN ? p + "%" : "0%";
}

function voters(voters_count){
    if (voters_count === null){
        return "";
    }
    return voters_count + "人";
}

function votes(votes_count){
    if (votes_count === null){
        return "";
    }
    return "(" + votes_count + "票)";
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