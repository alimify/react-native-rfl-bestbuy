import React from "react";
import { inject, observer } from "mobx-react";
import { SliderBox } from "react-native-image-slider-box";
import {
  StyleSheet,  
  View,
  ScrollView,
  Image,
  Button
} from "react-native";
import Colors from '../../constants/Colors';
import Text from "../helpers/Text";

const Sliders = props => {

  const sliders = props.sliders ? props.sliders.map(item => "https://rflbestbuy.com/secure/" + item.full_size_directory) : []
  
  return (
    <View style={styles.container}>
      <SliderBox
        style={{
          padding: 70,
          marginTop: 1,
          marginBottom: 1,
          marginHorizontal: 7
        }}
        sliderBoxHeight={160}
        images={sliders}
        dotColor={Colors.baseColor6}
        dotStyle={{
          width: 10,
          height: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: "#9c9c9c",
          transform: [{ skewX: "20deg" }]
        }}
        autoplay
        circleLoop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign:'center'
  }
});

// export default Sliders;
export default inject("store")(observer(Sliders));
