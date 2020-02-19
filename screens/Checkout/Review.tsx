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
        [getLoading, setLoading] = useState(false)

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
                                    return <CartItem key={key} item={item} removeItem={removeItem} />
                                })}
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            <View style={{ ...DefaultStyles.stickyBottom, ...DefaultStyles.flexContainer }}>

                <TouchableOpacity>
                    <Text>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('CartSummary')
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

