import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";
import { inject, observer } from "mobx-react";

const deviceWidth = Dimensions.get("window").width;

const PriceText = props => {
  return !(
    props.product.actual_discount > 0 && props.product.product_price_now > 0
  ) ? (
    <View style={styles.priceContainer}>
      <Text style={styles.priceNow}>
        <Text style={styles.text}>{"\u09F3"} </Text>
        {props.product.product_price_now}
      </Text>
    </View>
  ) : (
    <View style={styles.priceContainer}>
      <Text style={styles.priceNow}>
        <Text style={styles.text}>{"\u09F3"} </Text>
        {props.product.product_price_now}
      </Text>
      <Text style={styles.regularPrice}>
        <Text style={styles.text}>{"\u09F3"} </Text>
        {props.product.local_selling_price}
      </Text>
    </View>
  );
};

const ProductDesign = props => {
  const { shop } = props.store;

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Product", { product: props.product });
      }}
    >
      <View style={{ ...props.style, ...styles.container }}>
        <View style={styles.imageContainer}>
          {props.product.image ? (
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{
                uri:
                  "https://rflbestbuy.com/secure/" +
                  props.product.image.full_size_directory
              }}
            />
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.itemTitle}>
              {props.product.title}{" "}
            </Text>
          </View>
          <PriceText product={props.product} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#ddd",
    marginHorizontal: 3,
    borderWidth: 1,
    backgroundColor: "#fff",
    marginBottom: 5,
    padding: 0
  },
  imageContainer: {
    marginTop: 10,
    padding: 0,
    margin: 0
  },
  textContainer: {
    marginBottom: 0,
    paddingHorizontal: 4
  },

  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1
  },

  itemTitle: {
    fontFamily: "latoregular",
    fontSize: 14,
    marginTop: 10,
    height: 22,
    textTransform: "capitalize"
  },

  titleContainer: {
    marginLeft: 5,
    marginRight: 5
  },

  priceContainer: {
    flexDirection: "row",
    marginBottom: 12
  },

  priceNow: {
    color: "red",
    fontSize: 15,
    padding: 2,
    marginRight: 10,
    marginLeft: 5
  },

  regularPrice: {
    color: "gray",
    padding: 2,
    textDecorationLine: "line-through"
  },
  titleText: {
    fontFamily: "open-sans-bold"
  }
});

export default inject("store")(observer(withNavigation(ProductDesign)));
