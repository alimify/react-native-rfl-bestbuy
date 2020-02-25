import React from "react";
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

const UserIndex = props => {

    const { user } = props.store

    if (!user.ACCESS_TOKEN && !user.ACCOUNT) {
        return props.navigation.navigate("Login");
    } else {



        return (
            <ScrollView>
                <View>
                   <Text>Review Screen</Text>
                </View>
            </ScrollView>
        );


    }


};

const styles = StyleSheet.create({});


export default inject("store")(observer(withNavigation(UserIndex)));
