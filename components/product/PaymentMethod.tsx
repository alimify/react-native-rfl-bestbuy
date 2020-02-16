import React from "react";
import {
  StyleSheet,  
  View,
  ScrollView,
  Image,
  Button
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProductDesign from "../helpers/ProductDesign";
import Text from "../helpers/Text";

const HomeScreen = props => {



  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.pmText}>Payment Method (Supported)</Text>
      </View>
      <View style={styles.pmethodsContainer}>

        <View style={styles.pmethodContainer}>
          <Text style={styles.pmethodText}>Cash On Delivery</Text>
          <AntDesign style={props.product.payment_first?styles.pmethodStatusIcon:styles.pmethodStatusCross} name={props.product.payment_first ? 'checkcircleo' :'closecircleo'} />
        </View>

        <View style={styles.pmethodContainer}>
          <Text style={styles.pmethodText}>Bkash</Text>
          <AntDesign style={styles.pmethodStatusIcon} name="checkcircleo" />
        </View>

        <View style={styles.pmethodContainer}>
          <Text style={styles.pmethodText}>Credit Card</Text>
          <AntDesign style={styles.pmethodStatusIcon} name="checkcircleo" />
        </View>


        <View style={styles.pmethodContainer}>
          <Text style={styles.pmethodText}>Bank Deposit</Text>
          <AntDesign style={styles.pmethodStatusIcon} name="checkcircleo" />
        </View>        


      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    paddingTop: 5

  },
  pmText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  pmethodsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pmethodContainer: {
    flexDirection: 'row',
    margin: 4,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems:'center'
  },
  pmethodText: {
    paddingTop: 2,
    paddingRight: 3,
  },
  pmethodStatusIcon: {
    color: 'green'
  },
  pmethodStatusCross: {
    color:'red'
  }
});

export default HomeScreen;
