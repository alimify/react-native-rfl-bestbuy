import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Button,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { withNavigation } from "react-navigation";
import { inject, observer } from "mobx-react";
import storage from "../../services/asyncStorage";

const LoginScreen = props => {
  const [getEmail, setEmail] = useState(""),
    [getPassword, setPassword] = useState(""),
    [getLoading, setLoading] = useState(false),
    [getError, setError] = useState(false),
    [getSubmit, setSubmit] = useState(false),
    { user } = props.store,
    [getInputColor1, setInputColor1] = useState("#e8e8e8"),
    [getInputColor2, setInputColor2] = useState("#e8e8e8"),
    [getFormSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => { });

  if (user.ACCOUNT) {
    setTimeout(function () {
      props.navigation.navigate("Account");
    }, 100)
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>

        <View elevation={6} style={styles.loginContainer}>

          <View style={styles.errorNotification}>
            <Text
              style={{ textAlign: 'center', color: '#c1444d', fontWeight: 'bold' }}>
              {!getLoading && getFormSubmitted && !user.ACCOUNT ? 'Something is incorrect please try again..' : ``}
            </Text>
          </View>


          <TextInput
            onChangeText={setEmail}
            style={{ ...styles.inputField, borderColor: getInputColor1 }}
            placeholder="Email"
            onFocus={() => {
              setInputColor1("#FBA939");
            }}
            onBlur={() => {
              setInputColor1("#e8e8e8");
            }}
            autoCompleteType="off"
          />
          <TextInput
            onChangeText={setPassword}
            returnKeyType="go"
            secureTextEntry
            style={{
              ...styles.inputField,
              borderColor: getInputColor2
            }}
            autoCorrect={false}
            onFocus={() => {
              setInputColor2("#FBA939");
            }}
            onBlur={() => {
              setInputColor2("#e8e8e8");
            }}
            placeholder="Password"
          />

          {/* <View style={styles.loginButton}> */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={async () => {
              if (!getEmail) {
                setInputColor1("red");
                return;
              }

              if (!getPassword) {
                setInputColor2("red");
                return;
              }

              setLoading(true);
              setFormSubmitted(true)

              const loginLoading = await user.fetchLogin({
                email: getEmail,
                password: getPassword
              });

              setLoading(false);
              // console.log(loginLoading);
              if (loginLoading.success && loginLoading.token) {
                await storage.set("token", loginLoading.token.access_token);

                await user.setAccessToken(loginLoading.token.access_token);

                setLoading(true);
                const fetchAccount = await user.fetchAccount();
                setLoading(false);
              }

            }}
          >
            <Text
              style={{
                color: "white",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#f9f9f9'
  },
  loginContainer: {
    margin: 20,
    paddingHorizontal: 15,
    paddingVertical: 60,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    borderRadius: 5
  },
  inputField: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: "#c00",
    padding: 22,
    flex: 1,
    justifyContent: "center"
  },

  errorNotification: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 5,
    marginTop: -8
  }
});

export default inject("store")(observer(withNavigation(LoginScreen)));
