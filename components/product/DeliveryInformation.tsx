import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Picker } from "react-native";
import { inject, observer } from 'mobx-react'
import { AntDesign } from "@expo/vector-icons";
import Modal from 'react-native-modal';
import { withNavigation } from 'react-navigation';
import Text from "../helpers/Text";

const DeliveryLocation = props => {

  useEffect(() => {
    props.common.fetchDivisions({})
  })

  const [getDivision, setDivision] = useState('DHAKA'),
        [getDistrict, setDistrict] = useState('Dhaka'),
        [getThana, setThana] = useState('Dhaka')

  return (
    <Modal
      isVisible={props.show}
      style={styles.modalContainer}
      onBackdropPress={() => {
        props.setModalShow(false);
      }}
    >
      <View>
        <Text>
          Select delivery location
        </Text>
        <View>

          <View>
            <Text>Division</Text>
            <Picker
              selectedValue={getDivision}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => {
                props.common.fetchDistrictByDivision({
                  division: itemValue
                })
                setDivision(itemValue)
                setDistrict('')
                setThana('')
              }}>
              {props.common.DIVISIONS.map((item) => <Picker.Item key={item.id.toString()} label={item.division} value={item.division} />)}
            </Picker>
          </View>

          <View>
            <Text>District</Text>
            <Picker
              selectedValue={getDistrict}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => {
                props.common.fetchSetThanaByDistrict({
                  district: itemValue
                })
                setDistrict(itemValue)
                setThana('')
              }}>
              <Picker.Item label="Select District" value="" />
              {props.common.DISTRICTS_BY_DIVISIONS.map((item) => <Picker.Item key={item.id.toString()} label={item.district} value={item.district} />)}
            </Picker>
          </View>

          <View>
            <Text>Thana</Text>
            <Picker
              selectedValue={'js'}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => {
                setThana(itemValue)
              }}>
              <Picker.Item label="Select Thana" value="" />
              {props.common.THANA_BY_DISTRICT.map((item) => <Picker.Item key={item.id.toString()} label={item.thana} value={item.thana} />)}
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const DeliverInformation = props => {

  const [getModalShow, setModalShow] = useState(false),
    { common } = props.store

  return (
    <View>

      <TouchableOpacity onPress={() => {
        setModalShow(true)
      }}>
        <View>
          <View style={styles.container}>
            <View>
              <Text style={styles.deliveryText}>Delivery Information</Text>
            </View>
            <View>
              <AntDesign name="right" />
            </View>
          </View>
          <View style={styles.deliveryInfoContainer}>
            <View style={styles.deliveryIcon}>
              <AntDesign name="shoppingcart" />
            </View>
            <Text>This item will shipped from dhaka, it will arrive at feni in 2-3 workdays.{Object.keys(common.DIVISIONS)}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <DeliveryLocation setModalShow={setModalShow} show={getModalShow} common={common} product={props.product} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  deliveryText: {
    fontSize: 15,
    fontWeight: 'bold'
  },

  deliveryInfoContainer: {
    padding: 2,
    flex: 1,
    flexDirection: 'row',
  },

  deliveryIcon: {
    marginTop: 5,
    marginRight: 5
  },
  modalContainer: {
    margin: 0,
    backgroundColor: "white",
    height: 300,
    flex: 0,
    bottom: 0,
    position: "absolute",
    width: "100%",
    paddingHorizontal: 10
  },

});

export default inject("store")(observer(withNavigation(DeliverInformation)));

