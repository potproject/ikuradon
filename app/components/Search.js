import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import {search as SearchApi} from "../util/search";
import t from "../services/I18n";


export default function Search(){
    const [searchValue, onChangeSearchValue] = useState("");
    return(
        <View style={styles.container}>
            <SearchBar
                lightTheme
                placeholder={t("search_title")}
                onChangeText={onChangeSearchValue}
                value={searchValue}
                onSubmitEditing={ () =>
                    (
                        SearchApi(searchValue).then(({search, error}) => {
                            console.log(search, error);
                        })
                    )
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});