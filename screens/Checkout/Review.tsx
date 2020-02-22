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

                {props.item.item.info && props.item.item.info.image ? (
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={{ uri: 'https://rflbestbuy.com/secure/' + props.item.item.info.image.icon_size_directory }}
                    />
                ) : (
                        <Text></Text>
                    )}

            </View>
            <View style={DefaultStyles.w70}>
                <Text>{props.item.item.info.title}</Text>
                <View style={{ ...DefaultStyles.flexContainer, ...DefaultStyles.p5 }}>
                    <View style={DefaultStyles.w40}>
                        <Text>{props.item.purchaseprice}</Text>
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
        paymentMethod = (data) => {
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
            await shop.fetchCart();
            await shop.fetchCheckoutUserDetails({})
            await shop.fetchCheckoutUserPaymentMethod({})
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

    return (
        <View style={DefaultStyles.flex}>
            <ScrollView style={DefaultStyles.p5}>
                {Object.values(shipments).map((shipment, key) => {
                    return (
                        <View key={key}>
                            <Text>Time :  {shipment.timeFrame}, Delivery Charge : {shipment.delivert_charge}</Text>
                            <View>
                                {Object.values(shipment.items).map((item, key) => {
                                    return <CartItem key={key} item={item} />
                                })}
                            </View>
                        </View>
                    )
                })}

                <View style={{ ...DefaultStyles.m5, ...DefaultStyles.p5 }}>
                    <View style={DefaultStyles.flexContainer}>
                        <Text style={DefaultStyles.w45}>Total Products:</Text>
                        <Text style={DefaultStyles.w45}>$ {shop.CART ? shop.CART.totalqty.toLocaleString() : '0'}</Text>
                    </View>

                    <View style={DefaultStyles.flexContainer}>
                        <Text style={DefaultStyles.w45}>Total Price:</Text>
                        <Text style={DefaultStyles.w45}>$ {shop.CART ? shop.CART.totalprice.toLocaleString() : '0'}</Text>
                    </View>

                    <View style={DefaultStyles.flexContainer}>
                        <Text style={DefaultStyles.w45}>Discount Price:</Text>
                        <Text style={DefaultStyles.w45}>$ {shop.CART ? shop.CART.discount.toLocaleString() : '0'}</Text>
                    </View>
                    
                    <View style={DefaultStyles.flexContainer}>
                        <Text style={DefaultStyles.w45}>Delivery Charge ({shop.CHECK_OUT_USER_DETAILS.division}):</Text>
                        <Text style={DefaultStyles.w45}>$ {shop.CHECK_OUT_USER_DETAILS ? shop.CHECK_OUT_USER_DETAILS.deliveryfee.toLocaleString() : '0'}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text style={DefaultStyles.w45}>Payment Method:	</Text>
                        <Text style={DefaultStyles.w45}> {shop.CHECK_OUT_USER_PAYMENT_METHOD ? paymentMethod(shop.CHECK_OUT_USER_PAYMENT_METHOD) : ''}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text style={DefaultStyles.w45}>Grand Total:</Text>
                        <Text style={DefaultStyles.w45}>$ {(shop.CHECK_OUT_USER_PAYMENT_METHOD.grand_total - shop.CART.discount).toLocaleString()}</Text>
                    </View>
                </View>


            </ScrollView>
            <View style={{ ...DefaultStyles.stickyBottom, ...DefaultStyles.flexContainer }}>
                <Text>{JSON.stringify(shop.PAY_NOW)}</Text>
                <TouchableOpacity>
                    <Text>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={async () => {

                    await setLoading(true)
                    await shop.fetchPayNow({})

                    if (shop.PAY_NOW && shop.PAY_NOW.success) {
                        await setLoading(false)

                        props.navigation.navigate('CartSummary', {
                            order_id: shop.PAY_NOW.result.id,
                            random_code: shop.PAY_NOW.result.order_random,
                            secret_key: shop.PAY_NOW.result.secret_key
                        })
                    }

                    await setLoading(false)


                }}>
                    <Text>Pay Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default inject("store")(observer(CartScreen));

