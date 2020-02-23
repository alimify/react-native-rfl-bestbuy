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


const CartItem = props => {



    return (
        <View style={DefaultStyles.flexContainer}>
            <View style={DefaultStyles.w25}>

                {props.item.product && props.item.product.image ? (
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={{ uri: 'https://rflbestbuy.com/secure/' + props.item.product.image.icon_size_directory }}
                    />
                ) : (
                        <Text></Text>
                    )}

            </View>
            <View style={DefaultStyles.w50}>
                <Text>{props.item.product.title}</Text>
                <View style={{ ...DefaultStyles.flexContainer, ...DefaultStyles.p5 }}>
                    <View style={DefaultStyles.w40}>
                        <Text>{props.item.local_selling_price}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text style={DefaultStyles.ph5}>{props.item.qty}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}








const CartScreen = props => {

    const { shop } = props.store,
        [getLoading, setLoading] = useState(false),
        order_id = props.navigation.getParam('order_id'),
        random_code = props.navigation.getParam('random_code'),
        secret_key = props.navigation.getParam('secret_key');
    
    
    const paymentMethodName = async (data) => {
        if (data) {
            if (data.payment_method === 'cash_on_delivery') {
                return 'Cash On Delivery'
            } else if (data.payment_method === 'mobilebanking') {
                return 'Mobile Banking'
            } else if (data.payment_method === 'debitcredit') {
                return 'Debit or Credit Card'
            }
        }
        return ''
    }
    
    useEffect(() => {


        const loadData = async (shop) => {
            setLoading(true)
            await shop.fetchOrderSuccess({
                order_id,
                random_code,
                secret_key
            })
            await shop.fetchCart();
            setLoading(false)
        }

        loadData(shop)


    }, [setLoading, shop,order_id,random_code,secret_key])

    if (getLoading) {
        return <Spinner />;
    }


    if (!shop.ORDER_SUCCESS) {
        return (<View><Text>
            Not found !
    </Text></View>)
    }


    return (
        <View style={DefaultStyles.flex}>
            <ScrollView style={DefaultStyles.p5}>

                <View>
                    <Text>Order Summary</Text>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Order Status</Text>
                        <Text>{shop.ORDER_SUCCESS.orders_master.order_status}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Order Number</Text>
                        <Text>{shop.ORDER_SUCCESS.orders_master.id}</Text>
                    </View>

                    <View style={DefaultStyles.flexContainer}>
                        <Text>Order Date</Text>
                        <Text>{shop.ORDER_SUCCESS.orders_master.order_date}</Text>
                    </View>

                    <View style={DefaultStyles.flexContainer}>
                        <Text>Order Area</Text>
                        <Text>{ shop.ORDER_SUCCESS.orders_master.thana },
                            { shop.ORDER_SUCCESS.orders_master.district }, { shop.ORDER_SUCCESS.orders_master.division }</Text>
                    </View>

                </View>

                <View style={DefaultStyles.flexContainer}>
                    <View>
                        <Text>Billing Delivery Address</Text>
                        <View style={DefaultStyles.flexContainer}>
                            <Text>Name</Text>
                            <Text>{shop.ORDER_SUCCESS.orders_master.dba ? shop.ORDER_SUCCESS.orders_master.dba_name : shop.ORDER_SUCCESS.orders_master.customer_name}</Text>
                        </View>
                        <View style={DefaultStyles.flexContainer}>
                            <Text>Mobile</Text>
                            <Text>{shop.ORDER_SUCCESS.orders_master.phone}</Text>
                        </View>
                        <View style={DefaultStyles.flexContainer}>
                            <Text>Emergency Mobile</Text>
                            <Text>{shop.ORDER_SUCCESS.orders_master.emergency_phone}</Text>
                        </View>
                        <View style={DefaultStyles.flexContainer}>
                            <Text>Customer Email</Text>
                            <Text>{shop.ORDER_SUCCESS.orders_master.email}</Text>
                        </View>
                        <View style={DefaultStyles.flexContainer}>
                            <Text>Address</Text>
                            <Text>{shop.ORDER_SUCCESS.orders_master.dba ? shop.ORDER_SUCCESS.orders_master.dba_address : shop.ORDER_SUCCESS.orders_master.address}</Text>
                        </View>

                    </View>
                    <View>

                        <Text>Payment Information</Text>
                        <View style={DefaultStyles.flexContainer}>
                            <Text>Payment method</Text>
                            <Text>{paymentMethodName(shop.ORDER_SUCCESS.orders_master)}</Text>
                        </View>

                        <View style={DefaultStyles.flexContainer}>
                            <Text>Payment Status</Text>
                            <Text>{shop.ORDER_SUCCESS.orders_master.payment_term_status}</Text>
                        </View>

                    </View>
                </View>

                {shop.ORDER_SUCCESS.order_shipments.map((shipment, key) => {
                    return (
                        <View key={key}>
                            <Text>Shipment: {shipment.serial}, Time :  {shipment.time_frame}, Delivery Charge : {shipment.delivert_charge}, Status: {shipment.status}</Text>
                            <View>

                                {shipment.order_details.map((item, key) => {
                                    return <CartItem key={key} item={item} />
                                })}
                            </View>
                        </View>
                    )
                })}

                <View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Total Products</Text>
                        <Text>{shop.ORDER_SUCCESS.orders_master.total_qty}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Total Price</Text>
                        <Text>{parseInt(shop.ORDER_SUCCESS.orders_master.total_amount).toLocaleString()}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Discount Price</Text>
                        <Text>{shop.ORDER_SUCCESS.orders_master.coupon_discount ? parseInt(shop.ORDER_SUCCESS.orders_master.coupon_discount).toLocaleString() : 0}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>DELIVERY CHARGE (DHAKA)</Text>
                        <Text>{parseInt(shop.ORDER_SUCCESS.orders_master.delivery_fee).toLocaleString()}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>PAYMENT METHOD</Text>
                        <Text>{shop.ORDER_SUCCESS.orders_master.id}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>GRAND TOTAL</Text>
                        <Text>{parseInt(shop.ORDER_SUCCESS.orders_master.grand_total).toLocaleString()}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ ...DefaultStyles.stickyBottom, ...DefaultStyles.flexContainer }}>

                <TouchableOpacity>
                    <Text>Update Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default inject("store")(observer(CartScreen));

