import React, { useEffect, useState } from "react";
import { inject, observer } from 'mobx-react'

import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Button,
  Text,
  TouchableOpacity
} from "react-native";

import DefaultStyles from '../../constants/DefaultStyles';
import Spinner from '../../components/helpers/Spinner'
import { TextInput } from "react-native-paper";
import { generateComputedPropConfig } from "mobx/lib/internal";


const CartItem = props => {

  const prevCartUpdate = JSON.parse(props.getCartUpdated),
        [getItemQuantity,setItemQuantity] = useState(props.item.qty)

  return (
    <View style={DefaultStyles.flexContainer}>
      <View style={DefaultStyles.w25}>

        {props.item.item.info && props.item.item.info.image ? (
          <Image
            style={{ width: 80, height: 80 }}
            source={{ uri: 'https://rflbestbuy.com/secure/' + props.item.item.info.image.icon_size_directory }}
          />
        ): (
            <Text></Text>
        )}

      </View>
      <View style={DefaultStyles.w50}>
        <Text>{props.item.item.info.title}</Text>
        <View style={{ ...DefaultStyles.flexContainer, ...DefaultStyles.p5 }}>
          <View style={DefaultStyles.w40}>
            <Text>{props.item.purchaseprice}</Text>
          </View>
          <View style={DefaultStyles.flexContainer}>
            <TouchableOpacity onPress={() => {

              if (getItemQuantity > 1) {
                const newQuantity = getItemQuantity - 1
                setItemQuantity(newQuantity)
                prevCartUpdate[props.item.item.productcode] = newQuantity
                props.setCartUpdated(JSON.stringify(prevCartUpdate))
                props.setDisableCheckout(true)
              }

            }}>
              <Text style={DefaultStyles.ph5}>-</Text>
            </TouchableOpacity>

            <Text style={DefaultStyles.ph5}>{getItemQuantity}</Text>

            <TouchableOpacity onPress={() => {
              if (getItemQuantity < 99) {
                const newQuantity = getItemQuantity + 1
                setItemQuantity(newQuantity)
                prevCartUpdate[props.item.item.productcode] = newQuantity
                props.setCartUpdated(JSON.stringify(prevCartUpdate))
                props.setDisableCheckout(true)
              }

            }}>
              <Text style={DefaultStyles.ph5}>+</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
      <View style={DefaultStyles.w20}>
        <TouchableOpacity onPress={() => {
          props.removeItem(props.item.item.productcode)
        }}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}








const CartScreen = props => {

  const { shop } = props.store,
    [getLoading, setLoading] = useState(false),
    [getCartUpdated, setCartUpdated] = useState(JSON.stringify({})),
    [getDisableCheckout, setDisableCheckout] = useState(false),
    [getCoupon, setCoupon] = useState(''),
    [getCouponSubmit,setCouponSubmit] = useState(false)

  useEffect(() => {


    const loadData = async (shop) => {
      setLoading(true)
      await shop.fetchCart();
      setLoading(false)
    }

    loadData(shop)


  }, [setLoading, shop])

  if (getLoading) {
    return <Spinner />;
  }

  const shipments = shop.CART ? shop.CART.groupByShippingTime : false

  if (!shipments) {
    return (<View><Text>
      No products added to cart !
    </Text></View>)
  }


  const removeItem = async (product_code) => {
    setLoading(true)
    await shop.fetchRemoveFromCart({
      product_code: product_code
    })
    await shop.fetchCart()
    setLoading(false)

  }


  return (
    <View style={DefaultStyles.flex}>
      <ScrollView style={DefaultStyles.p5}>
        {Object.values(shipments).map((shipment, key) => {
          return (
            <View key={key}>
              <Text>Time :  {shipment.timeFrame}, Delivery Charge : {shipment.delivert_charge}</Text>
              <View>
                {Object.values(shipment.items).map((item, key) => {
                  return <CartItem key={key} item={item}
                                             removeItem={removeItem}
                                             getCartUpdated={getCartUpdated}
                                             setCartUpdated={setCartUpdated}
                                             setDisableCheckout={setDisableCheckout} />
                })}
              </View>
            </View>
          )
        })}

        <View>
          <Text>Do You Have Coupon Or Voucher?</Text>
          <View style={DefaultStyles.flexContainer}>
            <TextInput onChangeText={setCoupon} />
            <TouchableOpacity onPress={async () => {
              if (!getCoupon || getCoupon.length === 0) {
                return
              }

              await setLoading(true)

              setCouponSubmit(true)

              await shop.fetchApplyCoupon({
                coupon: getCoupon
              })
              await shop.fetchCart();

              await setLoading(false)


            }}>
              <Text>APPLY</Text>
            </TouchableOpacity>
          </View>
          <Text>{getCouponSubmit && !getLoading && shop.APPLY_COUPON && shop.APPLY_COUPON.success ? shop.APPLY_COUPON.message : getCouponSubmit ? 'Coupon may expired..' : ''}</Text>
        </View>

        <View style={{...DefaultStyles.m5,...DefaultStyles.p5}}>

          <View style={DefaultStyles.flexContainer}>
            <Text style={DefaultStyles.w45}>Sub-Total:</Text>
            <Text style={DefaultStyles.w45}>$ {shop.CART ? shop.CART.totalprice.toLocaleString() : '0'}</Text>
          </View>
          <View style={DefaultStyles.flexContainer}>
            <Text style={DefaultStyles.w45}>Coupon or Voucher Discount:	</Text>
            <Text style={DefaultStyles.w45}>$ {shop.CART ? shop.CART.discount.toLocaleString() : '0'}</Text>
          </View>
          <View style={DefaultStyles.flexContainer}>
            <Text style={DefaultStyles.w45}>Total:</Text>
            <Text style={DefaultStyles.w45}>$ {shop.CART ? (shop.CART.totalprice - shop.CART.discount).toLocaleString() : '0'}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{...DefaultStyles.stickyBottom, ...DefaultStyles.flexContainer, flex: 1, left: '10%', transform: [
          {
          translateX: 20
        }
      ], ...DefaultStyles.m5
      }}>

        <TouchableOpacity style={{ ...DefaultStyles.m5 }}  onPress={async () => {
          if (getDisableCheckout) {
            await setLoading(true)
            await shop.fetchUpdateCart({
              items: JSON.parse(getCartUpdated)
            })
            await shop.fetchCart();
            setDisableCheckout(false)
            await setLoading(false)
          }
        }}>
          <View style={{ ...DefaultStyles.p5, backgroundColor: !getDisableCheckout ? 'gray' : 'green'}}>
            <Text style={DefaultStyles.fontColor1}>Update Cart</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ ...DefaultStyles.m5,marginLeft:'25%',backgroundColor: getDisableCheckout ? 'gray' : 'green'}} onPress={() => {

          if (!getDisableCheckout) {
            props.navigation.navigate('CartCheckout')
          }
          
        }}>
          <View style={{ ...DefaultStyles.p5 }}>
            <Text style={DefaultStyles.fontColor1}>Checkout</Text>
          </View>
        </TouchableOpacity>
      </View>
</View>
  );
};

const styles = StyleSheet.create({

});

export default inject("store")(observer(CartScreen));

