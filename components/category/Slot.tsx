import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import Text from "../helpers/Text";
import DefaultStyles from "../../constants/DefaultStyles";

import SlotItem from "./SlotItem";

const Slot = props => {
  return (
    <View style={styles.boxDesign}>
      <View style={styles.titleBoxDesign}>
        <Text style={styles.title}>{props.category.name}</Text>
      </View>
      <View style={DefaultStyles.flexContainer}>
        {props.category.sub_categories.map(category => (
          <View key={category.id.toString()} style={DefaultStyles.w33}>
            <SlotItem category={category} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxDesign: {
    paddingBottom: 20,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1
  },
  titleBoxDesign: {
    paddingVertical: 5,
    //backgroundColor: '#FFE3E3',    
  },
  title: {    
    fontFamily: "open-sans",
    fontWeight: "400",
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 5
  }
});

export default Slot;
