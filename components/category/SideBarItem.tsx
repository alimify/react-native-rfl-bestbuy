import React from 'react'
import {View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import Text from "../helpers/Text";


const CategorySideBarItem = props => {

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            // props.navigation.navigate('CategoryProduct')
          }}
        >
          <View style={styles.sideBarItemContainer}>
            <View style={styles.sideBarItemImageContainer}>
              <Image
                style={styles.sideBarItemImage}
                source={{
                  uri: props.category.thumb_image
                }}
              />
            </View>
            <View>
              <Text style={styles.sideBarItemTitle}>
                {props.category.name.substring(0, 8)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
}



const styles = StyleSheet.create({

    sideBarItemContainer: {
        backgroundColor: '#ebebeb',
        padding: 10,
        marginBottom: 1,
        paddingBottom: 1,
        paddingTop:5
    },

    sideBarItemImageContainer: {
        padding: 5
    },

    sideBarItemImage: {
        height: 70,
        width: 70
    },

    sideBarItemTitleContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign:'center'
    },

    sideBarItemTitle: {
        fontWeight: '900',
        fontSize: 20
    }
})

export default CategorySideBarItem