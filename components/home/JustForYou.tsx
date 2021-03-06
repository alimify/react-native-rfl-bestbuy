import React from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SectionList,
    Image,
    TouchableOpacity
} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import {withNavigation} from "react-navigation";
import DefaultStyles from '../../constants/DefaultStyles';

const PriceText = props => {
    return !(
        props.product.actual_discount > 0 && props.product.product_price_now > 0
    ) ? (
        <Text style={styles.itemPrice}>
            <Text style={styles.text}>{"\u09F3"} </Text>
            {props.product.product_price_now}
        </Text>
    ) : (
        <View>
            <Text style={styles.itemPrice}>
                <Text style={styles.text}>{"\u09F3"} </Text>
                {props.product.product_price_now}
            </Text>
            <Text style={styles.itemRegularPrice}>
                <Text style={styles.text}>{"\u09F3"} </Text>
                {props.product.local_selling_price}
            </Text>
        </View>
    );
};

const JustForYouItem = props => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.navigation.navigate("Product", {
                    product: props.product
                });
            }}
        >
            <View style={DefaultStyles.itemContainer}>
                <Image
                    style={styles.itemImage}
                    source={{uri: "https://rflbestbuy.com/secure/" + props.product.image.full_size_directory}}
                />
                <Text style={DefaultStyles.itemTitle} numberOfLines={2}>
                    {props.product.title}
                </Text>
                <PriceText product={props.product}/>
            </View>
        </TouchableOpacity>
    );
};

const JustForYou = props => {
    if (!props.products && !Array.isArray(props.products)) {
        return <View></View>;
    }

    const products = Object.values(props.products).slice(0, 8);

    return (
        <View style={styles.itemsContainer}>
            <View style={styles.titleContainer}>
                <Text style={DefaultStyles.sectionTitle}>Just For You</Text>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate("JustForYou");
                }}>
                    <Text style={DefaultStyles.titleMore}>More ></Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (<JustForYouItem
                        style={styles.listBox}
                        navigation={props.navigation}
                        product={item}
                    />)
                }}
                style={{flexWrap: "wrap", flexDirection: "row"}}
                horizontal={true}
            />
        </View>
    );
};

JustForYou.navigationOptions = navData => {
    return {
        headerTitle: () => <Text>Just For You</Text>
    };
};


const styles = StyleSheet.create({
    itemsContainer: {
        paddingVertical: 10
    },
    listBox: {
        paddingVertical: 50
    },
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    titleText: {
        fontFamily: "open-sans-bold",
    },
    titleMore: {
        fontFamily: "open-sans",
        fontStyle: "italic",
        color: "red",
        fontSize: 14
    },
    itemImage: {
        width: 100,
        height: 80
    },
    itemTitle: {
        fontFamily: "latoregular",
        fontSize: 13,
        marginTop: 10,
        height: 22,
        textTransform: 'lowercase'
    },
    itemPrice: {
        fontSize: 15,
        color: Colors.baseColor6
    },
    itemRegularPrice: {
        color: "gray",
        textDecorationLine: "line-through",
        fontSize: 12,
        fontStyle: "italic"
    }
});

export default withNavigation(JustForYou);
