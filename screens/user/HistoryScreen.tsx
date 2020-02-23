import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Button,
    TextInput
} from "react-native";
import { withNavigation } from 'react-navigation'
import { inject, observer } from "mobx-react";
import DefaultStyles from '../../constants/DefaultStyles'
import Spinner from '../../components/helpers/Spinner'

const UserIndex = props => {

    const { user } = props.store,
        [getLoading,setLoading] = useState(true)


    useEffect(() => {

        const loadData = async () => {
            await setLoading(true)
            await user.fetchOrdersHistory({})
            await setLoading(false)
        }

        loadData()
    },[user,setLoading])

    if (!user.ACCESS_TOKEN && !user.ACCOUNT) {
        return props.navigation.navigate("Login");
    } else {

        if (getLoading) {
            return <Spinner />
        }


        return (
            <ScrollView>
                {user.ORDERS_HISTORY ? user.ORDERS_HISTORY.orderMaster.data.map((item,key) => {

                   return (<View key={key} style={{ ...DefaultStyles.flexContainer, justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center' }}>
                        <View>
                            <View style={DefaultStyles.flexContainer}>
                                <Text>Order ID: </Text>
                               <Text>{item.id}</Text>
                            </View>
                            <View style={DefaultStyles.flexContainer}>
                                <Text>Shipments: </Text>
                               <Text>{item.order_shipments.length}</Text>
                            </View>
                            <View style={DefaultStyles.flexContainer}>
                                <Text>Order Date: </Text>
                                <Text>{item.created_at}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={DefaultStyles.flexContainer}>
                                <Text>Qty: </Text>
                               <Text>{item.total_qty}</Text>
                            </View>
                            <View style={DefaultStyles.flexContainer}>
                                <Text>Amount: </Text>
                               <Text>{item.total_amount}</Text>
                            </View>
                            <View style={DefaultStyles.flexContainer}>
                                <Text>Status: </Text>
                                <Text>{item.order_status}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>Invoice</Text>
                        </View>
                    </View>)

                }) : <Text>
                    Nothing found.. !
                    </Text>}
            </ScrollView>
        );


    }


};

const styles = StyleSheet.create({});


export default inject("store")(observer(withNavigation(UserIndex)));
