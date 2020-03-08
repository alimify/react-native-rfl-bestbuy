import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import ProductDesign from "../components/helpers/ProductDesign";
import DefaultStyles from "../constants/DefaultStyles";
import Text from "../components/helpers/Text";
import Spinner from "../components/helpers/Spinner";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
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

      setProducts(productsD)

      setLoading(false);
    };

    loadingProduct(shop, category);
  }, [shop, category, setProducts]);

  if (getLoading) {
    return <Spinner />;
  }



  return (
    <View style={styles.container}>
      <View style={DefaultStyles.paddingHorizontal}>


        <ScrollView scrollEventThrottle={400} onScroll={async ({ nativeEvent }) => {

          // console.log(getPage, shop.SEARCH_PRODUCTS.products.current_page, 'current_page')
          
          if (getPage == shop.SEARCH_PRODUCTS.products.current_page && isCloseToBottom(nativeEvent) && getPage < shop.SEARCH_PRODUCTS.products.total) {

            const nPage = getPage + 1;
            await setPage(nPage)
            if (category.seo_url) {
              await shop.fetchSearchProducts({ slug: category.seo_url, page: nPage });

              const productsD = shop.SEARCH_PRODUCTS
                ? shop.SEARCH_PRODUCTS.products.data
                : [];
              
              const newProducts = [...products, ...productsD]
              await setProducts(newProducts)
            }
            
          }

        }}>
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
          <ActivityIndicator size="large" color="#FBA939" />
        </ScrollView>


      </View>
    </View>
  );
};



CategoryProductScreen.navigationOptions = navData => {

  const category = navData.navigation.getParam("category")

  return {
    headerTitle: () => <Text>{category.name || 'Products'}</Text>
  };
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

export default inject("store")(observer(CategoryProductScreen))