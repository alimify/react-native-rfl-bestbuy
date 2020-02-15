import React from "react";
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView } from "react-native";
import DefaultStyles from '../../constants/DefaultStyles'
import Colors from "../../constants/Colors";

const FlashItem = props => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
          <Text style={{...DefaultStyles.bgBaseColor4,...styles.itemDiscountTag}}>40% off</Text>
          <Text numberOfLines={1} style={styles.itemTitle}>
            Vintage Collection
          </Text>
          <Text style={styles.itemPrice}>$99</Text>
      </View>
      <View style={styles.itemImageContainer}>
        <Image
          source={{
            uri:
              "https://rflbestbuy.com/secure/storage/uploads/iconsize/2019-04/j41-rflus.jpg"
          }}
          style={styles.itemImage}
        />
      </View>
    </View>
  );
};

const HomeFlashSale = props => {
  const flashItems = [1, 2, 3, 4];
    if (!props.flashSales) {
      return (<View></View>);
    }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Flash Sale</Text>
        <View>
          <View style={styles.flashTime}>
            <Text style={styles.title}>Ending In</Text>
            <Text style={{ ...DefaultStyles.bgBaseColor4, ...styles.flashTimeItem}}>30</Text>
            <Text style={DefaultStyles.baseColor4}>:</Text>
            <Text style={{ ...DefaultStyles.bgBaseColor4, ...styles.flashTimeItem }}>23</Text>
            <Text style={DefaultStyles.baseColor4}>:</Text>
            <Text style={{ ...DefaultStyles.bgBaseColor4, ...styles.flashTimeItem }}>59</Text>
            <Text style={DefaultStyles.baseColor4}>:</Text>
            <Text style={{ ...DefaultStyles.bgBaseColor4, ...styles.flashTimeItem }}>55</Text>
          </View>
      
        </View>
      </View>
      <View style={DefaultStyles.flexContainer}>

        {flashItems.map((item, key) => {
          return (
            <View key={key.toString()}  style={DefaultStyles.w50}>
              <FlashItem/>
            </View>
          )
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingVertical: 5
  },
  title: {
    fontWeight: 'bold'
  },

  flashTime: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  flashTimeItem: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 5,
    fontSize: 12
  },

  itemsContainer: {},

  itemContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    margin: 5,
    // padding: 5,
    borderRadius: 5,
    overflow:'hidden'
  },
  itemTextContainer: {},
  itemDiscountTag: {
    fontSize: 12,
    width: 60,
    padding: 2,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    textAlign: "center"
  },

  itemTitleContainer: {},

  itemTitle: {
    fontWeight: 'bold',
    fontSize: 13
  },

  itemPriceContainer: {},

  itemPrice: {
    color: Colors.baseColor6
  },

  itemImageContainer: {},

  itemImage: {
    width: 85,
    height: 60
  }
});

export default HomeFlashSale;
