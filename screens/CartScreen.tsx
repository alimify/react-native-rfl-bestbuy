import React, { useEffect, useState } from "react";
import { inject, observer } from 'mobx-react'

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button
} from "react-native";

import DefaultStyles from '../constants/DefaultStyles'

const CartItem = props => {
  return (
    <View style={DefaultStyles.flexContainer}>
      <View style={DefaultStyles.w30}>
        <Image
          style={{ width: 80, height: 80 }}
          source={{ uri: 'https://rflbestbuy.com/secure/storage/uploads/iconsize/2019-05/sofa-set-b-001.jpg' }}
        />
      </View>
      <View style={DefaultStyles.w60}>
        <Text>{props.item.item.info.title}</Text>
        <View style={{ ...DefaultStyles.flexContainer,...DefaultStyles.p5}}>
          <View style={DefaultStyles.w40}>
            <Text>{props.item.purchaseprice}</Text>
          </View>
          <View style={DefaultStyles.flexContainer}>
            <Text style={DefaultStyles.ph5}>-</Text>
            <Text style={DefaultStyles.ph5}>{props.item.qty}</Text>
            <Text style={DefaultStyles.ph5}>+</Text>
          </View>
        </View>
      </View>
    </View>
  );
}








const CartScreen = props => {

  const { shop } = props.store,
    [getLoading, setLoading] = useState(false)

  useEffect(() => {


    const loadData = async (shop) => {
      setLoading(true)
      await shop.fetchCart();
      setLoading(false)
    }

    loadData(shop)


  }, [setLoading, shop])


  const shipments = shop.CART ? shop.CART.groupByShippingTime : false

  if (!shipments) {
    return (<View><Text>
      No products added to cart !
    </Text></View>)
  }


  return (
    <View style={{ padding: 50 }}>
      {Object.values(shipments).map((shipment) => {
        return (
          <View>
            <Text>Time :  {shipment.timeFrame}, Delivery Charge : {shipment.delivert_charge}</Text>
            {Object.values(shipment.items).map((item) => {
              return <CartItem item={item} />
            })}
          </View>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create({

});

export default inject("store")(observer(CartScreen));

