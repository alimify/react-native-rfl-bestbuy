import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { inject, observer } from "mobx-react";
import Text from "./Text";
import DefaultStyles from '../../constants/DefaultStyles'

const PriceText = props => {
  return !(
    props.product.actual_discount > 0 && props.product.product_price_now > 0
  ) ? (
    <View style={styles.priceContainer}>
      <Text style={styles.priceNow}>$ {props.product.product_price_now}</Text>
    </View>
  ) : (
    <View style={styles.priceContainer}>
      <Text style={styles.priceNow}>$ {props.product.product_price_now}</Text>
      <Text style={styles.regularPrice}>
        $ {props.product.local_selling_price}
      </Text>
    </View>
  );
};

const Product = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Product", { product: props.product });
      }}
      style={DefaultStyles.w33}
    >
      <View style={{ ...DefaultStyles.p3,...{justifyContent:'center'}}}>
        {props.product.image ? (
          <Image
            source={{
              uri:
                "https://rflbestbuy.com/secure/" +
                props.product.image.full_size_directory
            }}
            style={{ width: 115, height: 100 }}
          />
        ) : (
          <Image source={{ uri: "" }} style={{ width: 115, height: 100 }} />
        )}

        <PriceText product={props.product} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 2
  },
  productsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 14
  },
  productContainer: {
    padding: 3
  },
  priceContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent:'center'
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
  }
});

export default inject("store")(observer(withNavigation(Product)));
