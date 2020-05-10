import React from "react";
import { Text } from "react-native";
import { dateFormat } from "../../util/parser";

export default function Detail({date, style}){
    return (
        <Text style={style}>
            {dateFormat(date)}
        </Text>
    );
}