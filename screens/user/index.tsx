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

const UserIndex = props => {

    const { user } = props.store
    
    if (!user.ACCESS_TOKEN && !user.ACCOUNT) {
       return props.navigation.navigate("Login");
    } else {
        


    return (
      <View>
        <Text>
          {JSON.stringify(user.ACCOUNT.user.name)}
          {/* {JSON.stringify(user.ACCESS_TOKEN)} */}
        </Text>
        <Button
          title="Go Category"
          onPress={() => {
            props.navigation.navigate("Category");
          }}
        />
      </View>
    );


    }


};

const styles = StyleSheet.create({});


export default inject("store")(observer(withNavigation(UserIndex)));
