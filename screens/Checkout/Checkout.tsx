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
            <View style={DefaultStyles.w50}>
                <Text>{props.item.item.info.title}</Text>
                <View style={{ ...DefaultStyles.flexContainer, ...DefaultStyles.p5 }}>
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
        <View style={styles.container}>
            <ScrollView style={DefaultStyles.p5}>
                <View style={DefaultStyles.flexContainer}>
                    <View style={{ ...DefaultStyles.w45,...DefaultStyles.p5}}>
                        <Text>Delivery Address</Text>
                        <View>
                            <Text>Full Name</Text>
                            <TextInput />
                        </View>
                        <View>
                            <Text>Mobile Number</Text>
                            <TextInput />
                        </View>
                        <View>
                            <Text>Emergency Mobile Number</Text>
                            <TextInput />
                        </View>
                        <View>
                            <Text>Email</Text>
                            <TextInput />
                        </View>
                        <View>
                            <Text>Address</Text>
                            <TextInput />
                        </View>
                    </View>
                    <View style={{ ...DefaultStyles.w45, ...DefaultStyles.p5 }}>
                        <View>
                            <Text>Billing Address</Text>
                            <View>
                                <Text>Name</Text>
                                <TextInput />
                            </View>
                            <View>
                                <Text>Email</Text>
                                <TextInput />
                            </View>
                            <View>
                                <Text>Address</Text>
                                <TextInput />
                            </View>
                        </View>
                        <View>
                            <Text>Notes</Text>
                            
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={{ ...styles.bottomContent, ...DefaultStyles.flexContainer }}>

                <TouchableOpacity>
                    <Text>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('CartPayment')
                }}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomContent: {
        position: 'absolute',
        bottom: 0
    }
});



export default inject("store")(observer(CartScreen));

