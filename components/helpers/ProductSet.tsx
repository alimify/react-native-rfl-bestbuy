import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import ProductDesign from "../helpers/ProductDesign";
import Colors from "../../constants/Colors";
import DefaultStyles from "../../constants/DefaultStyles";
import NavigationService from "../../navigation/NavigationService";

const ProductSet = props => {
  if (!props.products) {
    return <View></View>;
  }

  const products = props.limit
    ? props.products.slice(0, props.limit)
    : props.products;

  return (
    <View style={styles.container}>
      {props.title ? (
        <View style={styles.titleContainer}>
          <Text style={DefaultStyles.sectionTitle}>{props.title}</Text>
          <TouchableOpacity
            onPress={() => {
              if (props.screen) {
                NavigationService.navigate(props.screen, props.params);
              }
            }}
          >
            <Text style={DefaultStyles.titleMore}>More > </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}

      <View style={{ ...DefaultStyles.flexContainer, paddingHorizontal: 10 }}>
        {products.map((item, key) => {
          return (
            <View
              key={key.toString()}
              style={[DefaultStyles.w50, styles.productBox]}
            >
              <ProductDesign
                // style={DefaultStyles.w95}
                product={item}
                key={key.toString()}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 15,
    paddingBottom: 8
  },
  titleText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    fontWeight: '100'
  },
  moreText: {
    fontFamily: "open-sans",
    fontStyle: "italic",
    color: "red",
    fontSize: 14
  },
  productBox: {
    // paddingTop: 5,
    // paddingLeft: 2
  }
});

export default ProductSet;
