import React from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Text from "../helpers/Text";
import DefaultStyles from "../../constants/DefaultStyles";

const SlotItem = props => {
  const { navigate } = props.navigation,
    { shop } = props.store;

  return (
    <TouchableOpacity
      onPress={() => {
        //   shop.setSearchProducts(false)
        //   shop.fetchSearchProducts({
        //    slug: props.category.seo_url
        //  })
        navigate("CategoryProduct", { category: props.category });
      }}
    >
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: props.category.thumb_image
            }}
          />
        </View>
        <View>
          <Text style={styles.itemtitle} textBreakStrategy={"simple"}>
            {props.category.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    marginHorizontal: 5
  },
  itemtitle: {
    color: "#DDDDDD",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "latobold",
    fontSize: 10
  }

  // imageContainer: {
  //   // justifyContent: "center",
  //   // flex: 1
  // },

  // titleContainer: {},

  // title: {
  //   fontFamily: 'latobold',
  //   fontSize: 8,
  //   paddingVertical: 20,
  //   fontWeight: "900"
  // }
});

export default inject("store")(observer(withNavigation(SlotItem)));
