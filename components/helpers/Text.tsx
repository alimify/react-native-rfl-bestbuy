import React from "react";
import { StyleSheet, Text } from "react-native";


const MyText = (props) => {
    return (
        <Text style={{...props.style,...styles.textDesign}}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
   textDesign: {
       color: 'red',
       //fontFamily: 'OpenSansCondensed-Light'
   }
});

export default MyText