import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ProductDesign from "../components/helpers/ProductDesign";
import DefaultStyles from "../constants/DefaultStyles";
import Text from "../components/helpers/Text";
import Spinner from "../components/helpers/Spinner";

const CategoryProductScreen = props => {
  const { shop } = props.store,
    category = props.navigation.getParam("category"),
    [getLoading, setLoading] = useState(false);

  useEffect(() => {
    const loadingProduct = async (shop, category) => {
      setLoading(true);

      if (category.seo_url) {
        await shop.fetchSearchProducts({ slug: category.seo_url });
      }

      setLoading(false);
    };

    loadingProduct(shop, category);
  }, [shop, category]);

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

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginLeft: 5
  },
  productsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
    // flexWrap: "wrap"
  }
});

export default inject("store")(observer(CategoryProductScreen));
