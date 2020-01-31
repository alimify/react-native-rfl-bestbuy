import React from "react";
import { StyleSheet, Text, View, ScrollView,SectionList, Image,TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from '../../constants/Colors'
import {withNavigation} from 'react-navigation'


const PriceText = props => {
  return !(
    props.product.actual_discount > 0 && props.product.product_price_now > 0
  ) ? (
    <Text style={styles.itemPrice}>$ {props.product.product_price_now}</Text>
  ) : (
    <View>
      <Text style={styles.itemPrice}>$ {props.product.product_price_now}</Text>
      <Text style={styles.itemRegularPrice}>
        $ {props.product.local_selling_price}
      </Text>
    </View>
  );
}



const NewArrivalItem = props => {
  

  return (
    <TouchableOpacity onPress={() => {
      props.navigation.navigate('Product', {
        product: props.product.product
      })
    }}>
      <View style={styles.itemContainer}>
        <Image
          style={styles.itemImage}
          source={{
            uri:
              "https://rflbestbuy.com/secure/" +
              props.product.product.image.full_size_directory
          }}
        />
        <Text style={styles.itemTitle} numberOfLines={1}>
          {props.product.title}
        </Text>
        <PriceText product={props.product.product} />
      </View>
    </TouchableOpacity>
  );
}




const NewArrivals = props => {
    if (!props.products) {
      return <View></View>;
    }

  const products = props.products.slice(0, 8);
  
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>New Arrivals</Text>
        <Text style={styles.titleMore}>More ></Text>
      </View>
        <FlatList
                  data={products}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => <NewArrivalItem navigation={props.navigation} product={item} />}
                  style={{ flexWrap: 'wrap', flexDirection: 'row' }}
                  horizontal={true}
                  />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8

  },
  titleText: {
    fontWeight:'bold',
  },
  titleMore: {
    fontStyle: 'italic',
    fontWeight: '500',
    color: Colors.baseColor7
  },
  itemContainer: {
    width: 100,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems:'center'
  },
  itemImage: {
    width: 100,
    height: 80
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 14
  },
  itemPrice: {
    fontSize: 15,
    color: Colors.baseColor6
  },
  itemRegularPrice: {
    color: 'gray',
    textDecorationLine: 'line-through',
    fontSize: 12,
    fontStyle:'italic'
  }
});

export default withNavigation(NewArrivals);
