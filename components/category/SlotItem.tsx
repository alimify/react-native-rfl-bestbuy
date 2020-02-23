import React from "react";
import { inject, observer } from "mobx-react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Text from "../helpers/Text";

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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: props.category.thumb_image
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text textBreakStrategy={'simple'} style={styles.title}>
            {props.category.name}
            {/* {props.category.name.substring(0, 11)} */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {    
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    marginHorizontal: 5,    
  },

  imageContainer: {
    // justifyContent: "center",
    // flex: 1
  },

  image: {
    width: 30,
    height: 30
  },

  titleContainer: {},

  title: {
    fontFamily: 'latobold',
    fontSize: 8,
    paddingVertical: 20,
    fontWeight: "900"
  }
});

export default inject("store")(observer(withNavigation(SlotItem)));
