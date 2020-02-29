import React from "react";
import { StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";
import { inject, observer } from "mobx-react";
import Product from "../../components/helpers/SimilarProductDesign";
import Text from "../helpers/Text";
import DefaultStyles from "../../constants/DefaultStyles";
import ProductDesign from "../../components/helpers/ProductDesign";

const SimilarProduct = props => {
  const products = props.product ? props.product.similar_products : [],
    { shop } = props.store;

  if (products.length == 0) {
    return <View></View>;
  }

  return (
    <View>
      <Text style={styles.title}>Similar Product</Text>
      <View style={DefaultStyles.flexContainer}>      
        {products.map(item => (          
          <Product key={item.id.toString()} product={item} />
        ))}
      </View>
    </View>
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
  }
});

export default inject("store")(observer(withNavigation(SimilarProduct)));
