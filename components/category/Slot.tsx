import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import Text from "../helpers/Text";
import DefaultStyles from "../../constants/DefaultStyles";

import SlotItem from "./SlotItem";

const Slot = props => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text textBreakStrategy={'simple'} style={styles.title}>
          {props.category.name}
        </Text>
      </View>
      <View style={DefaultStyles.flexContainer}>
        {props.category.sub_categories.map(category => (
          <SlotItem textBreakStrategy={'simple'} key={category.id.toString()} category={category} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   fontFamily: 'latoregular',    
  //   backgroundColor: '#F5F5F5',
  //   justifyContent: "center",    
  //   padding: 0
  // },

  // titleContainer: {},

  // title: {
  //   fontFamily: 'latobold',
  //   fontWeight: "900",
  //   fontSize: 16,
  //   paddingHorizontal: 5,
  //   paddingVertical: 10

  // },

  // slotItemsContainer: {
  //   flexWrap: "wrap",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginRight: 0,
  //   marginLeft: 5
  // }
});

export default Slot;
