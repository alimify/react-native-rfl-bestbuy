import React from "react";
import { StyleSheet, Text, View, ScrollView, SectionList, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from '../../constants/Colors'



const PriceText = props => {
  return !(
    props.product.actual_discount > 0 && props.product.product_price_now > 0
  ) ? (
    <Text style={styles.itemPrice}>$ {props.product.product_price_now}</Text>
  ) : (
    <View>
      <Text style={styles.itemPrice}>$ {props.product.product_price_now}</Text>
      <Text style={styles.itemRegularPrice}>
        $ {props.product.local_selling_price}
      </Text>
    </View>
  );
};

const JustForYouItem = props => {
    return (
        <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={{ uri: 'https://rflbestbuy.com/secure/'+ props.product.image.full_size_directory }} />
            <Text style={styles.itemTitle} numberOfLines={1}>{props.product.title}</Text>
            <PriceText product={props.product}/>
        </View>
    )
}

const JustForYou = props => {

    if (!props.products && !Array.isArray(props.products)) {
      return <View></View>;
    }

    const products = Object.values(props.products).slice(0,8);

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Just For You</Text>
                <Text style={styles.titleMore}>More ></Text>
            </View>
            <ScrollView horizontal>
                <FlatList
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <JustForYouItem product={item} />}
                    style={{ flexWrap: 'wrap', flexDirection: 'row' }}
                    numColumns={8}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8

    },
    titleText: {
        fontWeight: 'bold',
    },
    titleMore: {
        fontStyle: 'italic',
        fontWeight: '500',
        color: Colors.baseColor7
    },
    itemContainer: {
        width: 100,
        backgroundColor: 'white',
        padding: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImage: {
        width: 100,
        height: 80
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 14
    },
    itemPrice: {
        fontSize: 15,
        color: Colors.baseColor6
    },
    itemRegularPrice: {
        color: 'gray',
        textDecorationLine: 'line-through',
        fontSize: 12,
        fontStyle: 'italic'
    }
});

export default JustForYou;
