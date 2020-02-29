import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard
} from "react-native";
import Text from "../components/helpers/Text";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import NavigationSearvice from "../navigation/NavigationService";
import ProductDesign from "../components/helpers/ProductDesign";
import DefaultStyles from "../constants/DefaultStyles";
import Spinner from "../components/helpers/Spinner";
import Storage from "../services/asyncStorage";

const SearchScreen = props => {
  const q = props.navigation.getParam("q"),
    x = props.navigation.getParam("x"),
    [getLoading, setLoading] = useState(false),
    { shop } = props.store,
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
      <View>
        <View>
          <Text> Search history : </Text>
          {JSON.parse(getQueryHistory).map((item, key) => {
            if (item) {
              return <Text key={key}>{item}</Text>;
            }
          })}
        </View>
      </View>
    );
  }

  if (getLoading) {
    return <Spinner />;
  }

  const products = shop.SEARCH_PRODUCTS
    ? shop.SEARCH_PRODUCTS.products.data
    : [];

  return (
    <View style={styles.container}>
      <View style={DefaultStyles.paddingHorizontal}>
        <ScrollView>
          <View style={DefaultStyles.flexContainer}>
              {products.map((item, key) => {
                return (
                  <View key={key.toString()} style={DefaultStyles.w50}>
                    <ProductDesign
                      style={DefaultStyles.w95}
                      product={item}
                      key={key.toString()}
                    />
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const HeaderSearchInput = props => {
  const [getSearchKey, setSearchKey] = useState("");

  return (
    <View style={DefaultStyles.flexContainer}>
      <TextInput
        style={styles.searchField}
        placeholder="I am searching for..."
        onChangeText={setSearchKey}
      />
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          NavigationSearvice.navigate("Search", {
            q: getSearchKey,
            x: true
          });
        }}
      >
        <Ionicons style={{ color: "#b4b5b3" }} name="ios-search" size={32} />
      </TouchableOpacity>
    </View>
  );
};

SearchScreen.navigationOptions = navData => {
  return {
    headerTitle: () => <HeaderSearchInput />
  };
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    marginLeft: 0
  },
  productsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5
  }
});

export default inject("store")(observer(SearchScreen));
