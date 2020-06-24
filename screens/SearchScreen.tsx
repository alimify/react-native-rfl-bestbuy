import React, {useState, useEffect} from "react";
import {inject, observer} from "mobx-react";
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import Text from "../components/helpers/Text";
import {TextInput} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import NavigationSearvice from "../navigation/NavigationService";
import ProductDesign from "../components/helpers/ProductDesign";
import DefaultStyles from "../constants/DefaultStyles";
import Spinner from "../components/helpers/Spinner";
import Storage from "../services/asyncStorage";

const SearchScreen = props => {
    const q = props.navigation.getParam("q"),
        x = props.navigation.getParam("x"),
        [getLoading, setLoading] = useState(false),
        {shop} = props.store,
        [getQueryHistory, setQueryHistory] = useState(JSON.stringify([]));

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const getExistedHistoryStorage = await Storage.get("searchHistory"),
                getExistedHistory = getExistedHistoryStorage
                    ? JSON.parse(getExistedHistoryStorage)
                    : [];
            setQueryHistory(JSON.stringify(getExistedHistory));

            if (!getExistedHistory.includes(q) && q) {
                getExistedHistory.push(q);
                await Storage.set("searchHistory", JSON.stringify(getExistedHistory));

                setQueryHistory(JSON.stringify(getExistedHistory));
            }

            await shop.fetchSearchProducts({
                keyword: q
            });
            setLoading(false);
        };

        loadData();
    }, [q, x, setLoading, shop, Storage]);

    if (!q && !x) {
        return (
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <View>
                    <Text> Search history : </Text>
                    {JSON.parse(getQueryHistory).map((item, key) => {
                        if (item) {
                            return <Text key={key}>{item}</Text>;
                        }
                    })}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    if (getLoading) {
        return <Spinner/>;
    }

    const products = shop.SEARCH_PRODUCTS
        ? shop.SEARCH_PRODUCTS.products.data
        : [];

    return (
        <TouchableWithoutFeedback
            style={styles.searchContainer}
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <ScrollView>
                <View style={{...DefaultStyles.flexContainer, ...DefaultStyles.ph5}}>
                    {products.map((item, key) => {
                        return (
                            <View key={key.toString()} style={DefaultStyles.w50}>
                                <ProductDesign product={item} key={key.toString()}/>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const HeaderSearchInput = props => {
    const [getSearchKey, setSearchKey] = useState("");

    return (
        <View style={{...DefaultStyles.flexContainer, ...styles.searchContainer}}>
            <View style={{
                flex: 1,
                flexDirection: "row",
                width: 290,
                paddingVertical: 5,
                paddingLeft: 5
            }}>
                <View>
                    <TextInput
                        style={styles.searchBox}
                        placeholder="I am searching for..."
                        onChangeText={setSearchKey}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                        NavigationSearvice.navigate("Search", {
                            q: getSearchKey,
                            x: true
                        });
                    }}>
                    <View style={{width: 20}}>
                        <View pointerEvents="none" style={styles.searchBox}>
                            <Ionicons style={styles.searchIcon} name="md-search" size={20}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    );
};

SearchScreen.navigationOptions = navData => {
    return {
        headerTitle: () => <HeaderSearchInput/>
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1
        // height: 0
    },
    searchContainer: {
        borderRadius: 20,
        marginLeft: -20,
        backgroundColor: "#EEE",
        borderWidth: 0,
        borderColor: "#DDD"
    },
    searchBox: {
        flexDirection: "row",
        backgroundColor: "transparent",
        width: 225,
        marginLeft: 5,
        height: 20,
        paddingHorizontal: 0,
        borderBottomWidth: 0
    },
    searchIcon: {
        color: "#b4b5b3",
        marginLeft: 15,
        zIndex: 111111
    }
});

export default inject("store")(observer(SearchScreen));
