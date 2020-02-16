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
  AsyncStorage
} from "react-native";
import { withNavigation } from 'react-navigation'
import { inject, observer } from "mobx-react";
import storage from "../../services/asyncStorage";

const LoginScreen = props => {

    const [getEmail, setEmail] = useState(""),
        [getPassword, setPassword] = useState(""),
        [getLoading, setLoading] = useState(false),
        [getError, setError] = useState(false),
        [getSubmit, setSubmit] = useState(false),
        { user } = props.store;
    
    
    useEffect(() => {

    })

    return (
      <View>
        <Text>{JSON.stringify(user.ACCOUNT ? user.ACCOUNT.user : false)}</Text>
        <Text>Email</Text>
        <TextInput onChangeText={setEmail} />
        <Text>Password</Text>
        <TextInput
          onChangeText={setPassword}
          placeholderTextColor="#9a73ef"
          returnKeyType="go"
          secureTextEntry
          autoCorrect={false}
        />
        <Button
          title="Login"
          onPress={async () => {
            setLoading(true);

            const loginLoading = await user.fetchLogin({
              email: getEmail,
              password: getPassword
            });

            setLoading(false);

            if (loginLoading.success && loginLoading.token) {
              await storage.set("token", loginLoading.token.access_token);

              await user.setAccessToken(loginLoading.token.access_token);

              setLoading(true);
              const fetchAccount = await user.fetchAccount();
              setLoading(false);
            }
          }}
        />
      </View>
    );
};

const styles = StyleSheet.create({});

export default inject("store")(observer(withNavigation(LoginScreen)));
