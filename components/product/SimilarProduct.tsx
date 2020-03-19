import React from "react";
import { StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";
import { inject, observer } from "mobx-react";
import Product from "../../components/helpers/SimilarProductDesign";
import Text from "../helpers/Text";
import DefaultStyles from "../../constants/DefaultStyles";
import ProductDesign from "../../components/helpers/ProductDesign";
import Swiper from "react-native-swiper";

function chunkArray(myArray, chunk_size) {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}

const SimilarProduct = props => {
  const productSlide = props.product
      ? chunkArray(props.product.similar_products, 6)
      : [],
    { shop } = props.store;

  if (productSlide.length == 0) {
    return <View></View>;
  }

  return (
    <View>
      <Text style={styles.title}>Similar Product</Text>
      <View style={DefaultStyles.flex}>
        <Swiper
          style={styles.swiper}
          height={300}
          autoplayTimeout={5}
          autoplay={true}
          dot={
            <View
              style={{
                ...styles.dot,
                backgroundColor: "rgba(0,0,0,.2)"
              }}
            />
          }
          activeDot={<View style={{ ...styles.dot, backgroundColor:'#751313'}}></View>}
          dotStyle={styles.dot}
        >
          {productSlide.map((slide, key) => {
            return (
              <View style={DefaultStyles.flexContainer} key={key.toString()}>
                {slide.map(item => (
                  <Product key={item.id.toString()} product={item} />
                ))}
              </View>
            );
          })}
        </Swiper>
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
  },

  // Slidr
  swiper: {
    height: 300,
    justifyContent: "center"
  },
  dot: {
    width: 12,
    height: 7,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 10,
    marginBottom: 3
  }
});

export default inject("store")(observer(withNavigation(SimilarProduct)));
