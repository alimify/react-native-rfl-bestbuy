import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import Text from "../helpers/Text";

import SlotItem from './SlotItem'


const Slot = props => {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.category.name}</Text>
        </View>
        <View style={styles.slotItemsContainer}>
            {props.category.sub_categories.map((category) => <SlotItem key={category.id.toString()} category={category}/>)}
        </View>
      </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding:5
    },

    titleContainer: {
        
    },

    title: {
        fontWeight: '900',
        fontSize: 18
    },

    slotItemsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 110,
        marginLeft:5
    }

})


export default Slot