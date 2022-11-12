import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "react-native-elements";
import PropTypes from "prop-types";
import { FontAwesome } from "@expo/vector-icons";
import { Entity } from "megalodon";
import { votePoll, getPoll, timeStr, votePer, voters, votes } from "../util/poll";
import t from "../services/I18n";

function MastoRowPoll({ poll, fontSize }){
    const { theme } = useContext(ThemeContext);
    let [pollState, usePollState] = useState<Entity.Poll|null>(poll);
    let [pollMultipleSelectedState, usePollMultipleSelectedState] = useState([]);
    let { id, expires_at, expired, multiple, votes_count, voted, own_votes, options } = pollState;
    return (
        <View style={styles.container}>
            { (voted || expired) && // Expired or voted
                options.map((v, i)=>{
                    return (
                        <Text style={[{ fontSize }, styles.pollDetailsRow]} key={i}>
                            {v.title} - {v.votes_count}{t("polls.votes")} ({votePer(v.votes_count, votes_count)})
                        </Text>
                    );
                })
            }
            { (!voted && !expired) && multiple && // multiple voting
                options.map((v, i)=>{
                    return (
                        <TouchableOpacity key={i} onPress={() => {
                            if (pollMultipleSelectedState.includes(i)){
                                usePollMultipleSelectedState(pollMultipleSelectedState.filter(v => v !== i));
                            } else {
                                usePollMultipleSelectedState([...pollMultipleSelectedState, i]);
                            }
                        }}>
                            <Text style={[{ color: pollMultipleSelectedState.includes(i) ? theme.colors.grey1 : theme.colors.grey2, fontSize }, styles.pollDetailsRow, styles.underline]}>
                                <FontAwesome name={"comments"} size={14} color={pollMultipleSelectedState.includes(i) ? theme.colors.grey1 : theme.colors.grey2} style={{ marginRight:5 }}/>
                                {" " + v.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }
            { (!voted && !expired) && multiple && pollMultipleSelectedState.length > 0 && // multiple voting2
            <TouchableOpacity onPress={async () => {
                let { data } = await votePoll(id, pollMultipleSelectedState);
                if (data && typeof data.id !== "undefined"){
                    usePollState(data);
                }
            }
            }>
                <Text style={[{ color: theme.colors.grey2, fontSize }, styles.pollDetailsRow, styles.underline]}>{t("polls.vote")}</Text>
            </TouchableOpacity>
            }
            { (!voted && !expired) && !multiple && // one voting
                options.map((v, i)=>{
                    return (
                        <TouchableOpacity key={i} onPress={async () => {
                            let { data } = await votePoll(id, [i]);
                            if (data && typeof data.id !== "undefined"){
                                usePollState(data);
                            }
                        }
                        }>
                            <Text style={[{ color: theme.colors.grey2, fontSize }, styles.pollDetailsRow, styles.underline]}>
                                <FontAwesome name={"comments"} size={14} color={theme.colors.grey2} style={{ marginRight:5 }}/>
                                {" " + v.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }
            <Text style={[{ color: theme.colors.grey0, fontSize }, styles.pollDetailsRow]}>{votes(votes_count)} - {timeStr(expires_at, expired, multiple)}</Text>
            <TouchableOpacity onPress={async () => {
                let { data } = await getPoll(id);
                if (data && typeof data.id !== "undefined"){
                    usePollState(data);
                }
            }
            }>
                <Text style={[{ color: theme.colors.grey2, fontSize }, styles.pollDetailsRow, styles.underline]}>{t("polls.reload")}</Text>
            </TouchableOpacity>
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
    },
    underline:{
        textDecorationLine: "underline"
    }
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