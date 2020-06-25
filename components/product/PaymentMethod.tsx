import React from "react";
import {StyleSheet, View, ScrollView, Image, Button} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import ProductDesign from "../helpers/ProductDesign";
import Text from "../helpers/Text";
import Colors from "../../constants/Colors";
import DefaultStyles from "../../constants/DefaultStyles";

const HomeScreen = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.pmText}>Payment Methods</Text>
            <View style={styles.pmethodsContainer}>
                <View style={styles.pmethodContainer}>
                    <AntDesign
                        style={
                            props.product.payment_first
                                ? styles.pmethodStatusIcon
                                : styles.pmethodStatusCross
                        }
                        name={props.product.payment_first ? "checkcircleo" : "closecircleo"}
                    />
                    <Text style={styles.pmethodText}> Cash On Delivery</Text>
                </View>

                <View style={styles.pmethodContainer}>
                    <AntDesign style={styles.pmethodStatusIcon} name="checkcircleo"/>
                    <Text style={styles.pmethodText}> bKash</Text>
                </View>

                <View style={styles.pmethodContainer}>
                    <AntDesign style={styles.pmethodStatusIcon} name="checkcircleo"/>
                    <Text style={styles.pmethodText}> Credit Card</Text>
                </View>

                <View style={styles.pmethodContainer}>
                    <AntDesign style={styles.pmethodStatusIcon} name="checkcircleo"/>
                    <Text style={styles.pmethodText}> Bank Deposit</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 5
    },
    pmText: {
        fontWeight: "bold",
        fontSize: 15
    },
    pmethodsContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    pmethodContainer: {
        flexDirection: "row",
        margin: 4,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    pmethodText: {
        paddingRight: 3
    },
    pmethodStatusIcon: {
        color: "green",
        paddingTop: 2,
        paddingRight: 3
    },
    pmethodStatusCross: {
        color: "red"
    }
});

export default HomeScreen;
