import React, { useEffect, useState } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

import * as Localization from "expo-localization";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import t from "../services/I18n";
  
export default function ScheduledModal({ onSelect }){
    const [date, setDate] = useState(new Date());
    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
    };

    return (
        <View style={styles.container}>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                display={"spinner"}
                mode={"datetime"}
                is24Hour={true}
                onChange={onChange}
                locale={Localization.locale}
            />
            <View style={styles.buttonGroup}>
                <Button style={styles.button} onPress={() => onSelect(date.toISOString())} title={t("global_ok")} />
                <Button style={styles.button} onPress={() => onSelect(null)} title={t("global_cancel")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: 320,
        height: 280,
    },
    buttonGroup: {
        flexDirection: "row",
        alignSelf: "center",
    },
    button: {
        width: 120,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
});