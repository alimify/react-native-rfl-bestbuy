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
import {NavigationActions,StackActions} from 'react-navigation'
import DefaultStyles from '../../constants/DefaultStyles';
import Spinner from '../../components/helpers/Spinner'
import { Checkbox } from "react-native-paper";

const Item = props => {


    return (
        <View style={DefaultStyles.flexContainer}>
            <View style={DefaultStyles.p5}>
                <TouchableOpacity onPress={() => {
                    props.setSelected(props.item.value)
                }}>
                <View style={[{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, props.style]}>
                    {
                        props.getSelected == props.item.value ?
                            <View style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#000',
                            }} />
                            : null
                    }
                    </View>
                </TouchableOpacity>
            </View>
            <View style={DefaultStyles.p5}>
                <Text>{props.item.title}</Text>
            </View>
        </View>
       );
}








const CartScreen = props => {

    const { shop } = props.store,
        [getLoading, setLoading] = useState(false),
        [getSelected, setSelected] = useState(''),
        [getTermCheck, setTermCheck] = useState(false),
        [getSomeError,setSomeError] = useState(false)

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


    if (!shop.CART) {
        return (<View><Text>
            There nothing to continue !
    </Text></View>)
    }

    const PaymentsGateway = [
        {
            value: 'mobilebanking',
            title: 'Mobile Banking'
        },
        {
            value: 'debitcredit',
            title: 'Debit or Credit Card '
        }
    ];

    if (!shop.CART.paymentFirst) {
        PaymentsGateway.push({
            value: 'cash_on_delivery',
            title: 'Cash on Delivery '
        }) 
    }



    return (
        <View style={DefaultStyles.flex}>
            <ScrollView style={DefaultStyles.p5}>

                {
                    getSomeError ? (<View>
                        <Text style={{color:'red'}}>Please check, there is something error..</Text>
                    </View>) : (
                            <View>
                                
                            </View>
                    )
                }
                {PaymentsGateway.map((item, key) => {
                    return <Item item={item} getSelected={getSelected} setSelected={setSelected} key={key}/>
                })}

                <View>
                    <View style={DefaultStyles.flexContainer}>
                        <View style={DefaultStyles.p5}>
                            <Checkbox
                                color="#f28b01"
                                status={getTermCheck ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setTermCheck(!getTermCheck)
                                }}
                            />
                        </View>
                        <View style={{...DefaultStyles.p5,...{justifyContent:'center',alignContent:'center',alignItems:'center'}}}>
                            <Text>I have read and agree to TOS</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={{ ...DefaultStyles.stickyBottom, ...DefaultStyles.flexContainer }}>

                <TouchableOpacity>
                    <Text>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={async () => {
                    const hasError = !(getSelected.length > 2) || !getTermCheck
                    await setSomeError(hasError)

                    if (!hasError) {
                        await shop.fetchStorePaymentMethod({
                            term_check: getTermCheck,
                            payment_method: getSelected
                        })

                        if (shop.STORE_PAYMENT_METHOD) {
                            props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'CartReview' })]
                            }))
                        }

                    }

                }}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default inject("store")(observer(CartScreen));

