import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Button
} from "react-native";
import { withNavigation } from 'react-navigation'
import { inject, observer } from "mobx-react";
import DefaultStyles from '../../constants/DefaultStyles'

const UserIndex = props => {

    const { user } = props.store

    if (!user.ACCESS_TOKEN && !user.ACCOUNT) {
        return props.navigation.navigate("Login");
    } else {



        return (
            <ScrollView>

                <View style={DefaultStyles.flexContainer}>
                    <View>
                        <Text>Total Orders</Text>
                        <Text>{user.ACCOUNT.totalOrders}</Text>
                    </View>

                    <View>
                        <Text>Pending Orders</Text>
                        <Text>{user.ACCOUNT.totalPending}</Text>
                    </View>

                    <View>
                        <Text>Complete Orders</Text>
                        <Text>{user.ACCOUNT.totalComplete}</Text>
                    </View>
                </View>

                <View style={DefaultStyles.flexContainer}>
                    <View>
                        <Text>Total Purchase</Text>
                        <Text>{user.ACCOUNT.totalSpend}</Text>
                    </View>

                    <View>
                        <Text>Earned Points</Text>
                        <Text>{user.ACCOUNT.user.reward_points}</Text>
                    </View>

                </View>

                <View>
                    <Text>Account Details</Text>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Full Name:</Text>
                        <Text>{user.ACCOUNT.user.name}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Username:</Text>
                        <Text>{user.ACCOUNT.user.username}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Email:</Text>
                        <Text>{user.ACCOUNT.user.email}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Phone:</Text>
                        <Text>{user.ACCOUNT.user.phone}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Emergency Phone Number:</Text>
                        <Text>{user.ACCOUNT.user.emergency_phone}</Text>
                    </View>
                </View>
                <View>
                    <Text>Billing Details</Text>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Address:</Text>
                        <Text>{user.ACCOUNT.user.address}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>District:</Text>
                        <Text>{user.ACCOUNT.user.district}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Postal Code:</Text>
                        <Text>{user.ACCOUNT.user.postcode}</Text>
                    </View>
                </View>

            </ScrollView>
        );


    }


};

const styles = StyleSheet.create({});


export default inject("store")(observer(withNavigation(UserIndex)));
