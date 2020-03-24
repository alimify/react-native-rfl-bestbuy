import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { withNavigation } from "react-navigation";
import { inject, observer } from "mobx-react";
import Text from "../components/helpers/Text";
import Spinner from "../components/helpers/Spinner";
import DefaultStyles from "../constants/DefaultStyles";

import ImageSlider from "../components/product/ImageSlider";
import SelectVariation from "../components/product/SelectVariation";
import DeliveryInformation from "../components/product/DeliveryInformation";
import PaymentMethod from "../components/product/PaymentMethod";
import Reviews from "../components/product/Reviews";
import SimilarProduct from "../components/product/SimilarProduct";

const ProductScreen = props => {
  const product = props.navigation.getParam("product"),
    { shop, user } = props.store,
    [getLoading, setLoading] = useState(true),
    [getRefreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const ProductLoading = async (shop, product) => {
      setRefreshing(true);
      await shop.fetchProductDetails({
        slug: product.seo_url
      });
      setRefreshing(false);
    };

    ProductLoading(shop, product);
  }, [shop, product, setRefreshing]);

  useEffect(() => {
    const ProductLoading = async (shop, product) => {
      setLoading(true);
      await shop.fetchProductDetails({
        slug: product.seo_url
      });
      setLoading(false);
    };

    ProductLoading(shop, product);
  }, [shop, product]);

  if (getLoading) {
    return <Spinner />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={getRefreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <ImageSlider product={shop.PRODUCT_DETAILS} />
        <View style={DefaultStyles.paddingHorizontal}>
          <View>
            <Text style={styles.title}> {product.title} </Text>
          </View>
          <View style={styles.slotContainer}>
            <SelectVariation product={shop.PRODUCT_DETAILS} />
          </View>
          <View style={styles.slotContainer}>
            <DeliveryInformation product={product} />
          </View>
          <View style={styles.slotContainer}>
            <PaymentMethod product={product} />
          </View>
          <View style={styles.slotContainer}>
            <Reviews product={shop.PRODUCT_DETAILS} />
          </View>
          <View style={styles.slotContainer}>
            <SimilarProduct product={shop.PRODUCT_DETAILS} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

ProductScreen.navigationOptions = navData => {
  const product = navData.navigation.getParam("product");

  return {
    headerTitle: () => <Text>{product.title || "Product"}</Text>,
    tabBarVisible: false
  };
};

const styles = StyleSheet.create({
  container: {},
  title: {
    backgroundColor: "white",
    padding: 10,
    fontSize: 17,
    marginBottom: 10
  },
  slotContainer: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1
  },
  deliveryContainer: {
    backgroundColor: "white",
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1
  }
});

export default inject("store")(observer(withNavigation(ProductScreen)));
