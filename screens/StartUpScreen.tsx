import React, {useState, useEffect} from "react";
import {StyleSheet, View, ScrollView, Image} from "react-native";
import storage from '../services/asyncStorage';
import {inject, observer} from "mobx-react";
import Text from "../components/helpers/Text";
import Spinner from "../components/helpers/Spinner"

const StartUpScreen = props => {
    const [getLoading, setLoading] = useState(true),
        {user, common} = props.store

    useEffect(() => {
        const loadData = async () => {
            try {
                await user.fetchAccount()
                await common.fetchGlobals()
            } catch {
            } finally {
                await setLoading(false)
            }
        }
        loadData()
    }, [user, common, setLoading])

    if (!getLoading) {
        setTimeout(function () {
            props.navigation.navigate('Home')
        }, 200)
    }
    return <Spinner style={{ flex: 1, width: '100%', justifyContent: "center", alignItems: "center" }}/>;
};

const styles = StyleSheet.create({});

export default inject("store")(observer(StartUpScreen));
