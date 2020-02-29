import React, { useEffect, useCallback } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { inject, observer } from "mobx-react";


const deviceWidth = Dimensions.get('window').width;

const PriceText = props => {
  return !(
    props.product.actual_discount > 0 && props.product.product_price_now > 0
  ) ? (
    <View style={styles.priceContainer}>
      <Text style={styles.priceNow}>
        <Text style={styles.text}>{"\u09F3"}</Text>
        {props.product.product_price_now}
      </Text>
    </View>
  ) : (
    <View style={styles.priceContainer}>
      <Text style={styles.priceNow}>$ {props.product.product_price_now}</Text>
      <Text style={styles.regularPrice}>
        <Text style={styles.text}>{"\u09F3"}</Text>
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
              source={{
                uri:
                  "https://rflbestbuy.com/secure/" + props.product.image.full_size_directory
              }}
            />
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.itemTitle}>
              {props.product.title} {" "}
              {/* {props.product.title.substring(0, 15)}{" "} */}
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
    borderColor: "#ddd",
    borderWidth: 1,
    marginLeft: 4,
    // flexBasis: '48.5%',
    backgroundColor: "#fff",
    marginBottom: 5
  },
  imageContainer: {},
  textContainer: {
    marginBottom: 0
  },

  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1    
  },

  itemTitle: {
    fontFamily: "latoregular",
    fontSize: 12,
    marginTop: 10,
    height: 30
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
