import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SearchBar, ButtonGroup } from "react-native-elements";
import {search as SearchApi} from "../util/search";
import t from "../services/I18n";
import SearchList from "./SearchList";
import * as searchConst from "../constants/search";

const initSearchData = {
    accounts: [],
    statuses: [],
    hashtags: []
};

export default function Search(){
    const [searchValue, onChangeSearchValue] = useState("");
    const searchTypesArray = [t("search_accounts"), t("search_statuses"), t("search_hashtags")];
    const [searchTypeIndex, onChangeSearchTypeIndex] = useState(0);
    const [searchData, useSearchData] = useState(initSearchData);
    return(
        <View style={styles.container}>
            <SearchBar
                lightTheme
                placeholder={t("search_title")}
                onChangeText={onChangeSearchValue}
                value={searchValue}
                onSubmitEditing={() => SearchApi(searchValue).then(({data, error}) => useSearchData(data))}
                onClear={() => useSearchData(initSearchData)}
            />
            <ButtonGroup
                onPress={(i) => onChangeSearchTypeIndex(i)}
                selectedIndex={searchTypeIndex}
                buttons={searchTypesArray}
            />
            {searchTypeIndex === 0 && searchValue !== "" &&
            <SearchList type={searchConst.TYPE_ACCOUNTS} data={searchData[searchConst.TYPE_ACCOUNTS]} />
            }
            {searchTypeIndex === 1 && searchValue !== "" &&
            <SearchList type={searchConst.TYPE_STATUSES} data={searchData[searchConst.TYPE_STATUSES]} />
            }
            {searchTypeIndex === 2 && searchValue !== "" &&
            <SearchList type={searchConst.TYPE_HASHTAGS} data={searchData[searchConst.TYPE_HASHTAGS]} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});