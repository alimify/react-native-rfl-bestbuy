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
import { TouchableOpacity } from "react-native-gesture-handler";

const UserIndex = props => {

    const { user, shop } = props.store,
        [getLoading, setLoading] = useState(true),
        [getConvertingAmount, setConvertingAmount] = useState(0),
        [getRPI, setRPI] = useState(0)


    useEffect(() => {

        const loadData = async () => {
            await setLoading(true)
            await user.fetchRewardTkHistory({})
            setConvertingAmount(user.ACCOUNT.user.reward_points / 10)
            setRPI(user.ACCOUNT.user.reward_points)
            await setLoading(false)
        }

        loadData()
    }, [user, setLoading, setConvertingAmount])

    if (!user.ACCESS_TOKEN && !user.ACCOUNT) {
        return props.navigation.navigate("Login");
    } else {

        if (getLoading) {
            return <Spinner />
        }



        return (
            <ScrollView>
                <View>
                    <View style={DefaultStyles.flexContainer}>
                        <Text>Available Rewards Point :</Text>
                        <Text>{user.ACCOUNT.user.reward_points}</Text>
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <TextInput onChangeText={(value) => {
                            const currentRPI = parseInt(value)

                            if (user.ACCOUNT.user.reward_points >= currentRPI) {
                                setRPI(currentRPI)
                                const currentAmount = currentRPI / 10
                                setConvertingAmount(currentAmount)
                            }


                        }} value={getRPI.toString()} />
                        <Text>to</Text>
                        <TextInput editable={false} value={getConvertingAmount.toString()} />
                        <TouchableOpacity onPress={async () => {
                            setLoading(true)
                            await user.fetchConvertRpToTk({
                                point: getRPI
                            })
                            await user.fetchRewardTkHistory({})
                            await user.fetchAccount()
                            setLoading(false)
                        }}>
                            <Text>Convert</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View>
                    {
                        user.REWARD_TK_HISTORY ?
                            Object.values(user.REWARD_TK_HISTORY.coupons).map((item, key) => (
                                <View key={key} style={DefaultStyles.flexContainer}>
                                    <Text style={DefaultStyles.p1}>
                                        Converted: {item.price * 10} converted to coupon
                                            </Text>
                                    <Text style={DefaultStyles.p1}>
                                        ({item.coupon_code})
                                            </Text>
                                    <Text style={DefaultStyles.p1}>
                                        worth of
                                            </Text>
                                    <Text style={DefaultStyles.p1}>
                                        {item.price}
                                    </Text>
                                    <Text style={DefaultStyles.p1}>
                                        BDT/-
                                            </Text>
                                </View>
                            )) :
                            <Text></Text>
                    }
                </View>
            </ScrollView>
        );


    }


};

const styles = StyleSheet.create({});


export default inject("store")(observer(withNavigation(UserIndex)));
