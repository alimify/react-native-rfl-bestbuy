import React, { useState,useEffect } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import { set } from "mobx";
import { withNavigation } from "react-navigation";
import { inject, observer } from "mobx-react";
import Text from "../helpers/Text";

const PriceText = props => {
  return !(
    props.product.actual_discount > 0 && props.product.product_price_now > 0
  ) ? (
      <View style={{}}>
        <Text style={styles.priceNow}>$ {props.product.product_price_now}</Text>
      </View>
    ) : (
      <View style={{}}>
        <Text style={styles.priceNow}>$ {props.product.product_price_now}</Text>
        <Text style={styles.regularPrice}>
          $ {props.product.local_selling_price}
        </Text>
      </View>
    );
};


const VariationModal = (props) => {

  const colors = props.product.colors,
    sizeExist = (colors.length-1) >= props.getColorKey,
    sizes = sizeExist ? props.product.colors[props.getColorKey].sizes : []
  
  
  useEffect(() => {
    if ((colors.length-1) >= props.getColorKey) {
      props.setColorId(colors[props.getColorKey].id)
    }

    if ((sizes.length-1) >= props.getSizeKey) {
      props.setSizeId(sizes[props.getSizeKey].id)
    }

  },[props,sizes,colors,sizeExist])


  return (
    <Modal
      isVisible={props.show}
      style={styles.modalContainer}
      onBackdropPress={() => {
        props.setModalShow(false);
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.modalTitleContainer}>
          <Text>Please select specifications</Text>
          <View>
            <TouchableOpacity onPress={() => props.setModalShow(false)}>
              <Text
                style={{
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                x
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <PriceText product={props.product} />
          <View>
            <Text>
              {props.product.stock_status == 1 ? "In stock" : "Out of stock"}
            </Text>
          </View>
        </View>
        <View>
          <Text>{colors.length > 0 ? 'Colors' : ''}</Text>
            <View style={styles.variationItemsContainer}>
              {colors.map((item, key) => {
                return (
                  <TouchableOpacity key={item.id.toString()} onPress={() => {
                    props.setColorId(item.id)
                    props.setColorKey(key)
                  }}>
                    <View style={{padding: 5}}>
                    <Image
                      source={{ uri: "https://rflbestbuy.com/secure/public/pmp_img/" + item.color_codes }}
                      style={{ height: 50, width: 50, borderWidth: 2,borderColor: key === props.getColorKey ? 'green' : '#ddd' }}
                      />
                    </View>
                  </TouchableOpacity>

                )
              })}
              </View>

          <Text>{sizes.length > 0 ? 'Sizes' : ''}</Text>


          <View style={styles.variationItemsContainer}>
            {sizes.map((item, key) => {
              return (
                <TouchableOpacity key={key.toString()} onPress={() => {
                  props.setSizeId(item.id)
                  props.setSizeKey(key)
                }}>

                  <Image
                    source={{ uri: "https://rflbestbuy.com/secure/public/pmp_img/" + item.color_codes }}
                    style={{ height: 50, width: 50, borderWidth: 1,paddingHorizontal: 5, borderColor: key === props.getSizeKey ? 'green' : '#ddd' }}
                  />
                </TouchableOpacity>

              )
            })}

          </View>


        </View>
        <View>
          <View>
            <Text>Quantity</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                const quantity = props.getQuantity - 1;
                props.setQuantity(quantity);
              }}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{props.getQuantity}</Text>

            <TouchableOpacity
              onPress={() => {
                const quantity = props.getQuantity + 1;
                props.setQuantity(quantity);
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Button title="ADD TO CART" onPress={() => { props.addToCart(props.product.id) }} />
          <Button title="Buy" onPress={() => { }} />
        </View>
      </View>
    </Modal>
  );
}

const SelectVariation = props => {

  const [getModalShow, setModalShow] = useState(false),
    [getLoading, setLoading] = useState(false),
    { shop } = props.store

  const [getQuantity, setQuantity] = useState(1),
    [getColorKey, setColorKey] = useState(0),
    [getColorId, setColorId] = useState(),
    [getSizeId, setSizeId] = useState(),
    [getSizeKey, setSizeKey] = useState(0),
    [getTypeId, setTypeId] = useState();

  const addToCart = async (id) => {

    setLoading(true)
    await shop.fetchAddToCart({
      // self_token: this.$store.state.user.SELF_TOKEN,
      main_pid: id,
      qty: getQuantity,
      color: getColorId,
      size: getSizeId,
      type: getTypeId
    })
    setLoading(false)

    // console.log(shop.ADD_TO_CART)

    await shop.fetchCart({})


  };




  if (!props.product) {
    return <View></View>
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setModalShow(!getModalShow)}>
        <View style={styles.container}>
          <View>
            <Text style={styles.variationText}>Select Variation & Qty</Text>
            <View style={styles.priceContainer}>
              <Text>Price: </Text>
              <Text style={styles.priceAmount}> $ {props.product.product.local_selling_price}</Text>
            </View>
          </View>
          <View>
            <AntDesign name="right" />
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
    backgroundColor: "white",
    height: 400,
    flex: 0,
    bottom: 0,
    position: "absolute",
    width: "100%",
    paddingHorizontal: 10
  },
  modalTitleContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5
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
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

});

export default inject("store")(observer(withNavigation(SelectVariation)));
