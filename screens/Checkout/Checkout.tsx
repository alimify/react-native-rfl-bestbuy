import React, { useEffect, useState } from "react";
import { inject, observer } from 'mobx-react'

import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Button,
    Text,
    TouchableOpacity,
    Picker,
    TextInput
} from "react-native";

import DefaultStyles from '../../constants/DefaultStyles';
import Spinner from '../../components/helpers/Spinner'
import { Checkbox } from "react-native-paper";



const CartScreen = props => {

    const { shop, common, user } = props.store,
        [getLoading, setLoading] = useState(false),
        [getDefaultDivisions, setDefaultDivisions] = useState([]),
        [getDefaultDistricts, setDefaultDistricts] = useState([]),
        [getDefualtThanas, setDefaultThanas] = useState([])





    const [getFullName, setFullName] = useState(''),
        [getPhone, setPhone] = useState(''),
        [getEmergencyPhone, setEmergencyPhone] = useState(''),
        [getEmail, setEmail] = useState(''),
        [getDivision, setDivision] = useState(''),
        [getDistrict, setDistrict] = useState(''),
        [getThana, setThana] = useState(''),
        [getAddress, setAddress] = useState(''),

        [getDbaMarked, setDbaMarked] = useState(true),
        [getDBADivisions, setDBADivisions] = useState([]),
        [getDBADistricts, setDBADistricts] = useState([]),
        [getDBAThanas, setDBAThanas] = useState([]),

        [getNote, setNote] = useState(''),

        [getDbaName, setDbaName] = useState(''),
        [getDbaAddress, setDbaAddress] = useState(''),
        [getDbaDivision, setDbaDivision] = useState(''),
        [getDbaDistrict, setDbaDistrict] = useState(''),
        [getDbaThana, setDbaThana] = useState(''),


        [getCreateAccount, setCreateAccount] = useState(false),
        [getPassword, setPassword] = useState(''),

        loggedUser = user.ACCOUNT ? true : false,


        [getSomeError, setSomeError] = useState(false)


    useEffect(() => {

        const loadData = async () => {

            try {
                setLoading(true)
                await common.fetchDivisions()
                setDefaultDivisions(common.DIVISIONS)
                setDBADivisions(common.DIVISIONS)
                await shop.fetchGetUserDeliveryLocation({})


                setFullName(user.ACCOUNT.user.name)
                setPhone(user.ACCOUNT.user.phone)
                setEmergencyPhone(user.ACCOUNT.user.emergency_phone)
                setEmail(user.ACCOUNT.user.email)
                setAddress(user.ACCOUNT.user.address)

                if (shop.GET_USER_DELIVERY_LOCATION) {
                    setDivision(shop.GET_USER_DELIVERY_LOCATION.division.toUpperCase())

                    await common.fetchDistrictByDivision({
                        division: shop.GET_USER_DELIVERY_LOCATION.division.toUpperCase()
                    })

                    await setDefaultDistricts(common.DISTRICTS_BY_DIVISIONS)
                    await setDistrict(shop.GET_USER_DELIVERY_LOCATION.district)

                    await common.fetchSetThanaByDistrict({
                        district: shop.GET_USER_DELIVERY_LOCATION.district
                    })

                    await setDefaultThanas(common.THANA_BY_DISTRICT)
                    await setThana(shop.GET_USER_DELIVERY_LOCATION.thana)

                }

            } catch{

            } finally {
                await setLoading(false)
            }

        }

        loadData()
    }, [setDefaultDivisions, setDefaultDistricts, setDefaultThanas, setDivision, setDistrict, setThana, common, shop, setFullName, setPhone, setEmergencyPhone, setEmail, setAddress])



    return (
        <View style={styles.container}>
            <ScrollView style={DefaultStyles.p5}>
                <View style={DefaultStyles.flexContainer}>
                    <View style={{ ...DefaultStyles.w50, ...DefaultStyles.p5 }}>
                        <Text>Delivery Address</Text>
                        <View>
                            <Text>Full Name</Text>
                            <TextInput onChangeText={setFullName} value={user.ACCOUNT ? user.ACCOUNT.user.name : ''} />
                        </View>
                        <View>
                            <Text>Mobile Number</Text>
                            <TextInput onChangeText={setPhone} value={user.ACCOUNT ? user.ACCOUNT.user.phone : ''} />
                        </View>
                        <View>
                            <Text>Emergency Mobile Number</Text>
                            <TextInput onChangeText={setEmergencyPhone} value={user.ACCOUNT ? user.ACCOUNT.user.emergency_phone : ''} />
                        </View>
                        <View>
                            <Text>Email</Text>
                            <TextInput onChangeText={setEmail} value={user.ACCOUNT ? user.ACCOUNT.user.email : ''} />
                        </View>


                        <View>
                            <Text>Division</Text>
                            <Picker
                                selectedValue={getDivision}
                                style={{ height: 50, width: 200 }}
                                onValueChange={async (itemValue, itemIndex) => {

                                    await setDivision(itemValue)
                                    console.log(getDivision, 'hello world ')

                                    if (itemValue.length > 0) {
                                        await common.fetchDistrictByDivision({
                                            division: itemValue
                                        })
                                    }

                                    setDistrict('')
                                    setThana('')

                                    setDefaultDistricts(common.DISTRICTS_BY_DIVISIONS)
                                }}>
                                <Picker.Item label="Select Division" value="" />
                                {getDefaultDivisions.map((item) => <Picker.Item key={item.id.toString()} label={item.division} value={item.division} />)}
                            </Picker>
                        </View>

                        <View>
                            <Text>District</Text>
                            <Picker
                                selectedValue={getDistrict}
                                style={{ height: 50, width: 200 }}
                                onValueChange={async (itemValue, itemIndex) => {

                                    await setDistrict(itemValue)

                                    await common.fetchSetThanaByDistrict({
                                        district: itemValue
                                    })


                                    setThana('')

                                    setDefaultThanas(common.THANA_BY_DISTRICT)
                                }}>
                                <Picker.Item label="Select District" value="" />
                                {getDefaultDistricts.map((item) => <Picker.Item key={item.id.toString()} label={item.district} value={item.district} />)}
                            </Picker>
                        </View>

                        <View>
                            <Text>Thana</Text>
                            <Picker
                                selectedValue={getThana}
                                style={{ height: 50, width: 200 }}
                                onValueChange={async (itemValue, itemIndex) => {
                                    await setThana(itemValue)
                                }}>
                                <Picker.Item label="Select Thana" value="" />
                                {getDefualtThanas.map((item) => <Picker.Item key={item.id.toString()} label={item.thana} value={item.thana} />)}
                            </Picker>
                        </View>

                        <View>
                            <Text>Address</Text>
                            <TextInput onChangeText={setAddress} value={user.ACCOUNT ? user.ACCOUNT.user.address : ''} />
                        </View>

                        <View>
                            <Text>Notes</Text>
                            <TextInput onChangeText={setNote} />
                        </View>
                    </View>
                    <View style={{ ...DefaultStyles.w40, ...DefaultStyles.p5 }}>
                        <View>
                            <Text>Billing Address</Text>
                            <View style={DefaultStyles.flexContainer}>
                                <View>
                                    <Checkbox
                                        color="#f28b01"
                                        status={getDbaMarked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setDbaMarked(!getDbaMarked)
                                        }}
                                    />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text>Same Address</Text>
                                </View>

                            </View>

                            {!getDbaMarked ? (
                                <View>
                                    <View>
                                        <Text>Name</Text>
                                        <TextInput onChangeText={setDbaName} />
                                    </View>
                                    <View>
                                        <Text>Division</Text>
                                        <Picker
                                            selectedValue={getDbaDivision}
                                            style={{ height: 50, width: 200 }}
                                            onValueChange={async (itemValue, itemIndex) => {

                                                await setDbaDivision(itemValue)
                                                await common.fetchDistrictByDivision({
                                                    division: itemValue
                                                })

                                                setDbaDistrict('')
                                                setDbaThana('')

                                                await setDBADistricts(common.DISTRICTS_BY_DIVISIONS)
                                            }}>
                                            {getDBADivisions.map((item) => <Picker.Item key={item.id.toString()} label={item.division} value={item.division} />)}
                                        </Picker>
                                    </View>


                                    <View>
                                        <Text>District</Text>
                                        <Picker
                                            selectedValue={getDbaDistrict}
                                            style={{ height: 50, width: 200 }}
                                            onValueChange={async (itemValue, itemIndex) => {

                                                await setDbaDistrict(itemValue)
                                                await common.fetchSetThanaByDistrict({
                                                    district: itemValue
                                                })
                                                setDbaThana('')

                                                await setDBAThanas(common.THANA_BY_DISTRICT)
                                            }}>
                                            <Picker.Item label="Select District" value="" />
                                            {getDBADistricts.map((item) => <Picker.Item key={item.id.toString()} label={item.district} value={item.district} />)}
                                        </Picker>
                                    </View>

                                    <View>
                                        <Text>Thana</Text>
                                        <Picker
                                            selectedValue={getDbaThana}
                                            style={{ height: 50, width: 200 }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setDbaThana(itemValue)
                                            }}>
                                            <Picker.Item label="Select Thana" value="" />
                                            {getDBAThanas.map((item) => <Picker.Item key={item.id.toString()} label={item.thana} value={item.thana} />)}
                                        </Picker>
                                    </View>

                                    <View>
                                        <Text>Address</Text>
                                        <TextInput onChangeText={setDbaAddress} />
                                    </View>

                                </View>

                            ) : (
                                    <View></View>
                                )}

                        </View>


                        {loggedUser ? (<Text></Text>) : (
                            <View>
                                <Text>Create Account</Text>
                                <View style={DefaultStyles.flexContainer}>
                                    <View>
                                        <Checkbox
                                            color="#f28b01"
                                            status={getCreateAccount ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setCreateAccount(!getCreateAccount)
                                            }}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text>Create </Text>
                                    </View>
                                    {getCreateAccount ? (
                                        <View>
                                            <Text>Password</Text>
                                            <TextInput secureTextEntry={true} onChangeText={setPassword} />
                                        </View>
                                    ) : (
                                            <View>

                                            </View>
                                        )}
                                </View>
                            </View>

                        )}

                    </View>
                </View>

                {getSomeError ? (
                    <View>
                        <Text>There is some error please check...</Text>
                    </View>
                ) : (
                        <View>
                            
                        </View>
                )}

            </ScrollView>
            <View style={{
                ...DefaultStyles.stickyBottom, ...DefaultStyles.flexContainer, flex: 1, left: '10%', transform: [
                    {
                        translateX: 20
                    }
                ], ...DefaultStyles.m5
            }}>

                <TouchableOpacity style={{ ...DefaultStyles.m5, ...DefaultStyles.p5, backgroundColor: 'gray' }} >
                    <Text>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ ...DefaultStyles.m5, ...DefaultStyles.p5, marginLeft: '25%', backgroundColor: 'green' }} onPress={async () => {

                    const user = {
                        name: getFullName,
                        phone: getPhone,
                        emergency_phone: getEmergencyPhone,
                        email: getEmail,
                        division: getDivision,
                        district: getDistrict,
                        thana: getThana,
                        deliveryfee: 0,
                        address: getAddress,
                        dba: !getDbaMarked,
                        dba_name: getDbaName,
                        dba_division: getDbaDivision,
                        dba_district: getDbaDistrict,
                        dba_thana: getDbaThana,
                        dba_address: getDbaAddress,
                        notes: getNote,
                        username: getEmail? getEmail.split('@')[0]: new Date().getTime(),
                        password: getPassword,
                        create: getCreateAccount,
                        logged: loggedUser
                    }

                    await shop.fetchSubmitCheckoutUserDetails({
                        user: user
                    })

                    if (shop.SUBMIT_CHECK_OUT_USER_DETAILS) {
                        setSomeError(false)
                        props.navigation.navigate('CartPayment')
                    } else {
                        setSomeError(true)
                    }
                }}>
                    <Text style={DefaultStyles.fontColor1}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

});



export default inject("store")(observer(CartScreen));

