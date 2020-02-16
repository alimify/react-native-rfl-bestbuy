import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Button
} from "react-native";

const LoginScreen = props => {
    return (
        <View>
            <Text>Email</Text>
            <TextInput />
            <Text>Password</Text>
            <TextInput />
            <Button
                title="Go Category"
                onPress={() => {
                    props.navigation.navigate("Category");
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default LoginScreen;
