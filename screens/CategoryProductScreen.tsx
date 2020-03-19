import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import ProductDesign from "../components/helpers/ProductDesign";
import DefaultStyles from "../constants/DefaultStyles";
import Text from "../components/helpers/Text";
import Spinner from "../components/helpers/Spinner";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const CategoryProductScreen = props => {
  const { shop } = props.store,
    category = props.navigation.getParam("category"),
    [getLoading, setLoading] = useState(false),
    [products, setProducts] = useState([]),
    [getPage, setPage] = useState(1);

  useEffect(() => {
    const loadingProduct = async (shop, category) => {
      setLoading(true);

      if (category.seo_url) {
        await shop.fetchSearchProducts({ slug: category.seo_url });
      }

      const productsD = shop.SEARCH_PRODUCTS
        ? shop.SEARCH_PRODUCTS.products.data
        : [];

      setProducts(productsD);

      setLoading(false);
    };

    loadingProduct(shop, category);
  }, [shop, category, setProducts]);

  if (getLoading) {
    return <Spinner />;
  }

  return (
    <View style={{ ...styles.container, ...DefaultStyles.p5 }}>
      <ScrollView
        scrollEventThrottle={400}
        onScroll={async ({ nativeEvent }) => {
          if (
            getPage == shop.SEARCH_PRODUCTS.products.current_page &&
            isCloseToBottom(nativeEvent) &&
            getPage < shop.SEARCH_PRODUCTS.products.total
          ) {
            const nPage = getPage + 1;
            await setPage(nPage);
            if (category.seo_url) {
              await shop.fetchSearchProducts({
                slug: category.seo_url,
                page: nPage
              });

              const productsD = shop.SEARCH_PRODUCTS
                ? shop.SEARCH_PRODUCTS.products.data
                : [];

              const newProducts = [...products, ...productsD];
              await setProducts(newProducts);
            }
          }
        }}
      >
        <View style={DefaultStyles.flexContainer}>
          {products.map((item, key) => {
            return (
              <View key={key.toString()} style={DefaultStyles.w50}>
                <ProductDesign product={item} key={key.toString()} />
              </View>
            );
          })}
        </View>
        {shop.SEARCH_PRODUCTS &&
        getPage == shop.SEARCH_PRODUCTS.products.current_page &&
        getPage < shop.SEARCH_PRODUCTS.products.total ? (
          <ActivityIndicator size="large" color="#FBA939" />
        ) : (
          <Text></Text>
        )}
      </ScrollView>
    </View>
  );
};

CategoryProductScreen.navigationOptions = navData => {
  const category = navData.navigation.getParam("category");

  return {
    headerTitle: () => <Text>{category.name || "Products"}</Text>
  };
};

const styles = StyleSheet.create({
  container: {

  },
  productsContainer: {

  }
});

export default inject("store")(observer(CategoryProductScreen));
