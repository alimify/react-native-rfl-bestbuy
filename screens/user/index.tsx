import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button
} from "react-native";
import { withNavigation } from 'react-navigation'
import { inject, observer } from "mobx-react";
import DefaultStyles from '../../constants/DefaultStyles'
import { TouchableOpacity } from "react-native-gesture-handler";

const UserIndex = props => {

  const { user } = props.store

  if (!user.ACCESS_TOKEN && !user.ACCOUNT) {
    return props.navigation.navigate("Login");
  } else {



    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingVertical: 100 }}>
          <TouchableOpacity style={{ ...DefaultStyles.p5, ...DefaultStyles.m5 }}
            onPress={() => {
              props.navigation.navigate('UserAccount')
            }}
          >
            <Text>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...DefaultStyles.p5, ...DefaultStyles.m5 }} onPress={() => {
            props.navigation.navigate('UserAccountUpdate')
          }}>
            <Text>Edit Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...DefaultStyles.p5, ...DefaultStyles.m5 }} onPress={() => {
            props.navigation.navigate('UserAccountOrderHistory')
          }}>
            <Text>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...DefaultStyles.p5, ...DefaultStyles.m5 }} onPress={() => {
            props.navigation.navigate('UserRewardPoint')
          }}>
            <Text>Rewards Point</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...DefaultStyles.p5, ...DefaultStyles.m5 }} onPress={() => {
            props.navigation.navigate('UserReview')
          }}>
            <Text>Review</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...DefaultStyles.p5, ...DefaultStyles.m5 }} onPress={() => {
            props.navigation.navigate('UserCancellation')
          }}>
            <Text>Cancellation</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{ ...DefaultStyles.p5, ...DefaultStyles.m5 }} onPress={() => {

          }}>
            <Text>Logout</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );


  }


};

const styles = StyleSheet.create({});


export default inject("store")(observer(withNavigation(UserIndex)))