import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Button, Alert
} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import Modal from "react-native-modal";
import {set} from "mobx";
import {withNavigation} from "react-navigation";
import {inject, observer} from "mobx-react";
import Text from "../helpers/Text";
import Colors from "../../constants/Colors";
import DefaultStyles from "../../constants/DefaultStyles";

const PriceText = props => {
    return !(
        props.product.actual_discount > 0 && props.product.product_price_now > 0
    ) ? (
        <View style={{}}>
            <Text style={styles.priceNow}>
                <Text>{"\u09F3"}</Text>
                {props.product.product_price_now}
            </Text>
        </View>
    ) : (
        <View style={{}}>
            <Text style={styles.priceNow}>
                <Text>{"\u09F3"}</Text>
                {props.product.product_price_now}
            </Text>
            <Text style={styles.regularPrice}>
                <Text>{"\u09F3"}</Text>
                {props.product.local_selling_price}
            </Text>
        </View>
    );
};

const VariationModal = props => {
    const colors = props.product.colors,
        sizeExist = colors.length - 1 >= props.getColorKey,
        sizes = sizeExist ? props.product.colors[props.getColorKey].sizes : [];

    useEffect(() => {
        if (colors.length - 1 >= props.getColorKey) {
            props.setColorId(colors[props.getColorKey].id);
        }

        if (sizes.length - 1 >= props.getSizeKey) {
            props.setSizeId(sizes[props.getSizeKey].id);
        }
    }, [props, sizes, colors, sizeExist]);

    // @ts-ignore
    return (
        <Modal isVisible={props.show} style={styles.modalContainer} onBackdropPress={() => {
            props.setModalShow(false);
        }}>
            <View style={{...DefaultStyles.specificationBackground}}>
                <View style={{...DefaultStyles.modalTitleContainer}}>
                    <Text style={{...DefaultStyles.modalTitleStyle}}>
                        <Text style={{color: 'white'}}>Please select specifications</Text>
                    </Text>
                    <View>
                        <TouchableOpacity onPress={() => props.setModalShow(false)}>
                            <Text style={{
                                width: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: 7,
                                fontWeight: "bold"
                            }}>
                                x
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.specificationsContainer}>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{borderColor: Colors.baseColor1, borderWidth: 1, padding: 5, width: '25%'}}>
                                <Text style={{justifyContent: 'flex-start'}}>Price:</Text>
                            </View>
                            <View style={{
                                borderColor: Colors.baseColor1,
                                borderWidth: 1,
                                padding: 5,
                                borderLeftWidth: 0,
                                width: '75%'
                            }}>
                                <PriceText product={props.product} style={{justifyContent: 'flex-end'}}/>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{
                                borderColor: Colors.baseColor1,
                                borderWidth: 1,
                                padding: 5,
                                width: '25%',
                                borderTopWidth: 0
                            }}>
                                <Text style={{justifyContent: 'flex-start', width: 100}}>Availability:</Text>
                            </View>
                            <View style={{
                                borderColor: Colors.baseColor1,
                                borderWidth: 1,
                                padding: 5,
                                borderLeftWidth: 0,
                                width: '75%',
                                borderTopWidth: 0
                            }}>
                                <Text product={props.product} style={{justifyContent: 'flex-end'}}>
                                    {props.product.stock_status == 1 ? "In stock" : "Out of stock"}
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{
                                borderColor: Colors.baseColor1,
                                borderWidth: 1,
                                padding: 5,
                                width: '25%',
                                borderTopWidth: 0
                            }}>
                                <Text style={{justifyContent: 'flex-start', width: 100}}>Quantity:</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                borderColor: Colors.baseColor1,
                                borderWidth: 1,
                                padding: 5,
                                borderLeftWidth: 0,
                                width: '75%',
                                borderTopWidth: 0
                            }}>
                                <TouchableOpacity onPress={() => {
                                    const quantity = props.getQuantity - 1;
                                    props.setQuantity(quantity);
                                }} style={{width: '10%'}}>
                                    <Text style={{
                                        borderRadius: 3,
                                        backgroundColor: '#ccc',
                                        color: '#ffffff',
                                        fontSize: 20,
                                        paddingHorizontal: 5,
                                        textAlign: "center"
                                    }}>-</Text>
                                </TouchableOpacity>
                                <Text style={{textAlign: "center", paddingTop: 2, flex: 1}}>{props.getQuantity}</Text>
                                <TouchableOpacity onPress={() => {
                                    const quantity = props.getQuantity + 1;
                                    props.setQuantity(quantity);
                                }} style={{width: '10%'}}>
                                    <Text style={{
                                        borderRadius: 3,
                                        backgroundColor: '#ccc',
                                        color: '#ffffff',
                                        fontSize: 20,
                                        paddingHorizontal: 5,
                                        textAlign: "center"
                                    }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {(colors.length > 0) && (
                            <View style={{flexDirection: "row"}}>
                                <View style={{
                                    borderColor: Colors.baseColor1,
                                    borderWidth: 1,
                                    padding: 5,
                                    width: '25%',
                                    borderTopWidth: 0
                                }}>
                                    <Text style={{
                                        justifyContent: 'flex-start',
                                        width: 100
                                    }}>{colors.length > 0 ? "Colors:" : ""}</Text>
                                </View>
                                <View style={{
                                    borderColor: Colors.baseColor1,
                                    borderWidth: 1,
                                    padding: 5,
                                    borderLeftWidth: 0,
                                    width: '75%',
                                    borderTopWidth: 0
                                }}>
                                    <View style={styles.variationItemsContainer}>
                                        {colors.map((item, key) => {
                                            return (
                                                <TouchableOpacity key={item.id.toString()}
                                                                  onPress={() => {
                                                                      props.setColorId(item.id);
                                                                      props.setColorKey(key);
                                                                  }}>
                                                    <View style={{padding: 5}}>
                                                        <Image
                                                            source={{uri: "https://rflbestbuy.com/secure/public/pmp_img/" + item.color_codes}}
                                                            style={{
                                                                height: 50,
                                                                width: 50,
                                                                borderWidth: 2,
                                                                borderColor:
                                                                    key === props.getColorKey ? "green" : "#ddd"
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>
                        )}
                        {(sizes.length > 0) && (
                            <View style={{flexDirection: "row"}}>
                                <View style={{
                                    borderColor: Colors.baseColor1,
                                    borderWidth: 1,
                                    padding: 5,
                                    width: '25%',
                                    borderTopWidth: 0
                                }}>
                                    <Text style={{
                                        justifyContent: 'flex-start',
                                        width: 100
                                    }}>{sizes.length > 0 ? "Sizes:" : ""}</Text>
                                </View>
                                <View style={{
                                    borderColor: Colors.baseColor1,
                                    borderWidth: 1,
                                    padding: 5,
                                    borderLeftWidth: 0,
                                    width: '75%',
                                    borderTopWidth: 0
                                }}>
                                    <View style={styles.variationItemsContainer}>
                                        {sizes.map((item, key) => {
                                            return (
                                                <TouchableOpacity key={key.toString()} onPress={() => {
                                                    props.setSizeId(item.id);
                                                    props.setSizeKey(key);
                                                }}>
                                                    <Image source={{
                                                        uri:
                                                            "https://rflbestbuy.com/secure/public/pmp_img/" +
                                                            item.color_codes
                                                    }}
                                                           style={{
                                                               height: 50,
                                                               width: 50,
                                                               borderWidth: 1,
                                                               paddingHorizontal: 5,
                                                               borderColor: key === props.getSizeKey ? "green" : "#ddd"
                                                           }}
                                                    />
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{marginLeft: 10}}>
                            <Button title="ADD TO CART" onPress={() => {
                                props.addToCart(props.product.id);
                            }} style={{justifyContent: 'flex-start'}}/>
                        </View>
                        <View style={{marginLeft: 15}}>
                            <Button title="Buy" style={{justifyContent: 'flex-end'}} onPress={() => {
                            }}/>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const SelectVariation = props => {
    const [getModalShow, setModalShow] = useState(false),
        [getLoading, setLoading] = useState(false),
        {shop} = props.store;

    const [getQuantity, setQuantity] = useState(1),
        [getColorKey, setColorKey] = useState(0),
        [getColorId, setColorId] = useState(),
        [getSizeId, setSizeId] = useState(),
        [getSizeKey, setSizeKey] = useState(0),
        [getTypeId, setTypeId] = useState();

    const addToCart = async id => {
        setLoading(true);
        await shop.fetchAddToCart({
            // self_token: this.$store.state.user.SELF_TOKEN,
            main_pid: id,
            qty: getQuantity,
            color: getColorId,
            size: getSizeId,
            type: getTypeId
        });
        setLoading(false);
        Alert.alert(
            "Success Alert",
            "Successfully added to cart",
            [
                {
                    text: "View Cart",
                    onPress: () => navigation.navigate('Cart', { name: 'Jane' })
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
        // console.log(shop.ADD_TO_CART)

        await shop.fetchCart({});
    };

    if (!props.product) {
        return <View></View>;
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setModalShow(!getModalShow)}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.variationText}>Select Variation & Qty</Text>
                        <View style={styles.priceContainer}>
                            <Text>Price:</Text>
                            <Text style={styles.priceAmount}>
                                {" "}
                                <Text>{"\u09F3"}</Text>
                                {props.product.product.local_selling_price}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <AntDesign name="right"/>
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                <VariationModal
                    show={getModalShow}
                    setModalShow={setModalShow}
                    product={props.product.product}
                    setQuantity={setQuantity}
                    getQuantity={getQuantity}
                    getColorKey={getColorKey}
                    setColorKey={setColorKey}
                    setColorId={setColorId}
                    getColorId={getColorId}
                    setSizeId={setSizeId}
                    getSizeKey={getSizeKey}
                    setSizeKey={setSizeKey}
                    setTypeId={setTypeId}
                    addToCart={addToCart}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    variationText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    priceContainer: {
        flex: 1,
        flexDirection: "row"
    },
    priceAmount: {
        color: "gray",
        padding: 2,
        textDecorationLine: "line-through"
    },
    modalContainer: {
        margin: 0,
        backgroundColor: Colors.baseColor8,
        height: 300,
        flex: 0,
        bottom: 0,
        position: "absolute",
        width: "100%",
    },
    priceNow: {
        color: "red",
        fontSize: 15,
        padding: 2,
        marginRight: 10,
        marginLeft: 5
    },

    regularPrice: {
        color: "gray",
        padding: 2,
        textDecorationLine: "line-through"
    },

    variationItemsContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    specificationsContainer: {
        paddingHorizontal: 10
    }
});

export default inject("store")(observer(withNavigation(SelectVariation)));
