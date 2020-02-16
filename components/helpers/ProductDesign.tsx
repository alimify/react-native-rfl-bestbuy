import React,{useEffect,useCallback} from 'react';
import { StyleSheet, View, Image,TouchableOpacity } from 'react-native';
import {withNavigation} from 'react-navigation'
import { inject, observer } from "mobx-react";
import Text from './Text';

const PriceText = (props) => {
   return !(
     props.product.actual_discount > 0 && props.product.product_price_now > 0
   ) ? (
     <View style={styles.priceContainer}>
       <Text style={styles.priceNow}>$ {props.product.product_price_now}</Text>
     </View>
   ) : (
     <View style={styles.priceContainer}>
       <Text style={styles.priceNow}>$ {props.product.product_price_now}</Text>
       <Text style={styles.regularPrice}>
         $ {props.product.local_selling_price}
       </Text>
     </View>
   );
}


const ProductDesign = props => {

  const { shop } = props.store
         
    return (
      <TouchableOpacity onPress={() => {  props.navigation.navigate("Product", { product: props.product }) }}>
        <View style={{ ...props.style,...styles.container}}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://rflbestbuy.com/secure/"+props.product.image.full_size_directory
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {props.product.title.substring(0, 15)}{" "}
              </Text>
            </View>

            <PriceText product={props.product}/>
          </View>
        </View>
      </TouchableOpacity>
    );

}


const styles = StyleSheet.create({

    container: {
        borderColor: '#ddd',
        borderWidth: 1,
        margin: 3,
        // flexBasis: '48.5%',
        backgroundColor:'white'
    },


    imageContainer: {

    },


    textContainer: {
        marginBottom: 0
    },


    image: {
        height: 150,
        width: '100%'
    },

    title: {
        fontWeight: '900',
        fontSize: 20
    },

    titleContainer: {
        marginLeft: 5,
        marginRight: 5
    },

    priceContainer: {
        flexDirection: 'row',
        marginBottom: 12
    },

    priceNow: {
        color: 'red',
        fontSize: 15,
        padding: 2,
        marginRight: 10,
        marginLeft: 5
    },

    regularPrice: {
        color: 'gray',
        padding: 2,
        textDecorationLine: 'line-through'
    }

})

export default inject("store")(observer(withNavigation(ProductDesign)))