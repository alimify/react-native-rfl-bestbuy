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
              <Text textBreakStrategy={'simple'} style={styles.sideBarItemTitle}>
                {props.category.name}
                {/* {props.category.name.substring(0, 15)} */}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
}



const styles = StyleSheet.create({

    sideBarItemContainer: {
        backgroundColor: '#EFEFEF',        
        width: 80,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign:'center',
        marginBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        paddingBottom: 5,
        paddingTop:0,
        flexWrap: 'wrap'
    },

    sideBarItemImageContainer: {
        padding: 5
    },

    sideBarItemImage: {
        height: 40,
        width: 40
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
        fontFamily: 'latoregular',
        textAlign: 'center', 
        fontWeight: '900',
        color: '#000000',
        fontSize: 11
    }
})

export default CategorySideBarItem