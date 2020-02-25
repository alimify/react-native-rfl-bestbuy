import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SectionList,
  Image,
  TouchableOpacity
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { withNavigation } from "react-navigation";

const PriceText = props => {
  return !(
    props.product.actual_discount > 0 && props.product.product_price_now > 0
  ) ? (
    <Text style={styles.itemPrice}>
        <Text style={styles.text}>{'\u09F3'}</Text>
       {props.product.product_price_now}
    </Text>
  ) : (
    <View>
      <Text style={styles.itemPrice}>$ {props.product.product_price_now}</Text>
      <Text style={styles.itemRegularPrice}>
        <Text style={styles.text}>{'\u09F3'}</Text>
        {props.product.local_selling_price}
      </Text>
    </View>
  );
};

const NewArrivalItem = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Product", {
          product: props.product.product
        });
      }}
    >
      <View style={styles.itemContainer}>
        <Image
          style={styles.itemImage}
          source={{
            uri:
              "https://rflbestbuy.com/secure/" +
              props.product.product.image.full_size_directory
          }}
        />
        <Text style={styles.itemTitle} numberOfLines={2}>
          {props.product.title}
        </Text>
        <PriceText product={props.product.product} />
      </View>
    </TouchableOpacity>
  );
};

const NewArrivals = props => {
  if (!props.products) {
    return <View></View>;
  }

  const products = props.products.slice(0, 8);

  return (
    <View style={styles.itemsContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>New Arrivals</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("NewArrivals");
          }}
        >
          <Text style={styles.titleMore}>More ></Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <NewArrivalItem
            style={styles.listBox}
            navigation={props.navigation}
            product={item}
          />
        )}
        style={{ flexWrap: "wrap", flexDirection: "row" }}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    paddingVertical: 10
  },
  listBox: {
    paddingVertical: 50
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  titleText: {
    fontFamily: "open-sans"
  },
  titleMore: {
    fontFamily: "open-sans",
    fontStyle: "italic",
    fontWeight: "bold",
    color: Colors.baseColor7
  },
  itemContainer: {
    width: 100,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 40
  },
  itemImage: {
    width: 80,
    height: 60
  },
  itemTitle: {
    fontFamily: "latoregular",
    fontSize: 12,
    marginTop: 10,
    height: 30
  },
  itemPrice: {
    fontSize: 15,
    color: Colors.baseColor6
  },
  itemRegularPrice: {
    color: "gray",
    textDecorationLine: "line-through",
    fontSize: 12,
    fontStyle: "italic"
  }
});

export default withNavigation(NewArrivals);
