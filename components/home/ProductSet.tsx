import React from "react";
import { StyleSheet, View} from "react-native";

import ProductDesign from "../helpers/ProductDesign";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import DefaultStyles from '../../constants/DefaultStyles';
import Text from "../helpers/Text";

const Recommended = props => {
    if (!props.products) {
        return <View></View>;
    }
  
  const products = props.products.slice(0, 8)

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.moreText}>More > </Text>
        </View>
        <View style={{ ...DefaultStyles.flexContainer,...DefaultStyles.ph5}}>
          {products.map((item, key) => {
            return (
              <View key={key.toString()} style={DefaultStyles.w50}>
              <ProductDesign style={DefaultStyles.w95} product={item} key={key.toString()} />
            </View>)
          })}

        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 1
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize:18,
        margin:10

    },
    moreText: {
        fontStyle: 'italic',
        fontWeight: '500',
        color: Colors.baseColor7,
        fontSize:80
    },
});

export default Recommended;
