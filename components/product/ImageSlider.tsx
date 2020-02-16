import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import {
  StyleSheet,
  View,
} from "react-native";

const Sliders = props => {
  const Sliders = props.product ? props.product.product.images.map(item => "https://rflbestbuy.com/secure/"+item.full_size_directory) : []

  return (
    <View>
      <SliderBox images={Sliders} sliderBoxHeight={400} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Sliders;
