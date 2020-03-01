import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { StyleSheet, View, ScrollView } from "react-native";


const Sliders = props => {
  const Sliders = props.product
    ? props.product.product.images.map(
        item => "https://rflbestbuy.com/secure/" + item.full_size_directory
      )
    : [];

  return (
    <View style={styles.container}>
      <ScrollView>
        <SliderBox images={Sliders} sliderBoxHeight={400} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    marginLeft: 0
  }
});

export default Sliders;
