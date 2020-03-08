import React, { useEffect, useState, useCallback } from "react";
import { inject, observer } from "mobx-react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import Spinner from "../components/helpers/Spinner";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  HeaderButtons,
  HeaderButton,
  Item
} from "react-navigation-header-buttons";

import Sliders from "../components/home/SliderBox";
import FlashSale from "../components/home/FlashSale";
import NewArrivals from "../components/home/NewArrivals";
import JustForYou from "../components/home/JustForYou";
import ProductSet from "../components/helpers/ProductSet";
import NavigationService from "../navigation/NavigationService";




const HomeScreen = props => {
  const { home } = props.store,
    [getLoading, setLoading] = useState(true),
    [getRefreshing, setRefreshing] = useState(false);





  const onRefresh = useCallback(async () => {

    const loadData = async (home) => {

      setRefreshing(true)
      await home.fetchIndex();

      await home.fetchJustForYou({
        limit: 8
      });

      await home.fetchBestBuyChoices({
        limit: 8
      });

      setRefreshing(false)

    };

    loadData(home);

  }, [home, setRefreshing]);


  useEffect(() => {

    const loadData = async (home) => {

      setLoading(true)
      
      await home.fetchIndex();

      await home.fetchJustForYou({
        limit: 8
      });

      await home.fetchBestBuyChoices({
        limit: 8
      });

      setLoading(false)

    };

    loadData(home);

  }, [home, setLoading]);

  if (getLoading) {
    return <Spinner />;
  }

  const CategoryOneProducts =
    home.INDEX &&
      home.INDEX.category_one &&
      home.INDEX.category_one.category_products
      ? home.INDEX.category_one.category_products.map(item => item.product)
      : false,
    CategoryTwoProducts =
      home.INDEX &&
        home.INDEX.category_two &&
        home.INDEX.category_two.category_products
        ? home.INDEX.category_two.category_products.map(item => item.product)
        : false,
    CategoryThreeProducts =
      home.INDEX &&
        home.INDEX.category_three &&
        home.INDEX.category_three.category_products
        ? home.INDEX.category_three.category_products.map(item => item.product)
        : false;

  const deleteCategoryProducts = category => {
    if (category.hasOwnProperty("category_products")) {
      delete category.category_products;
      return category;
    }
    return category;
  };

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={getRefreshing} onRefresh={onRefresh} />}>
      <View>
        <View>
          <Sliders sliders={home.INDEX ? home.INDEX.mobilesliders : false} />
        </View>
        <View>
          <FlashSale flashSales={home.INDEX ? home.INDEX.flash_sales : false} />
        </View>
        <View>
          <NewArrivals
            products={home.INDEX ? home.INDEX.new_arrivals : false}
          />
        </View>
        <View>
          <JustForYou products={home.JUST_FOR_YOU} />
        </View>
        <View>
          <ProductSet
            products={home.BESTBUY_CHOICES}
            title="Recommended"
            screen="Recommended"
            params={{}}
            limit={8}
          />
        </View>
         <View>
          <ProductSet
            title={home.INDEX ? home.INDEX.category_one.name : ""}
            products={CategoryOneProducts}
            limit={8}
            screen="CategoryProduct"
            params={{
              category: deleteCategoryProducts(home.INDEX.category_one)
            }}
          />
        </View>
        <View>
          <ProductSet
            title={home.INDEX ? home.INDEX.category_two.name : ""}
            products={CategoryTwoProducts}
            limit={8}
            screen="CategoryProduct"
            params={{
              category: deleteCategoryProducts(home.INDEX.category_two)
            }}
          />
        </View>
        <View>
          <ProductSet
            title={home.INDEX ? home.INDEX.category_three.name : ""}
            screen="CategoryProduct"
            params={{
              category: deleteCategoryProducts(home.INDEX.category_three)
            }}
            products={CategoryThreeProducts}
            limit={8}
          />
        </View> 
      </View>
    </ScrollView>
  );
};

const HeaderSearchInput = props => {
  return (
    <TouchableOpacity
      style={styles.searchContainer}
      activeOpacity={1}
      onPress={() => {
        NavigationService.navigate("Search", {});
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', width: 290 }}>
        <View style={{ width: 20 }}>
          <View pointerEvents="none" style={styles.searchBox}>
            <Ionicons style={styles.searchIcon} name="md-search" size={20} />
          </View>
        </View>
        <View style={{ marginTop: 2 }}>
          <Text style={{ color: '#b4b5b3' }}> Search... </Text>
        </View>
      </View>


    </TouchableOpacity>
  );
};

const HeaderButtonComponent = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={30}
      style={styles.menuPositioning}
      color="#000"
    />
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: () => <HeaderSearchInput />,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  menuPositioning: {
    marginLeft: 5
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
    width: 300,
    marginLeft: -10,
    marginTop: 2
  },
  searchIcon: {
    color: "#b4b5b3",
    marginLeft: 15
  }
});

export default inject("store")(observer(HomeScreen));