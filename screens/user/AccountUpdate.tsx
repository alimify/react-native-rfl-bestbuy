import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Button,
    TextInput
} from "react-native";
import { withNavigation } from 'react-navigation'
import { inject, observer } from "mobx-react";
import DefaultStyles from '../../constants/DefaultStyles'
import { TouchableOpacity } from "react-native-gesture-handler";
import Spinner from '../../components/helpers/Spinner'

const UserIndex = props => {

    const { user } = props.store,
        [getLoading, setLoading] = useState(true);
    
    const [getFullName, setFullName] = useState(''),
        [getUserName, setUserName] = useState('fferg'),
        [getEmail, setEmail] = useState(''),
        [getPhone, setPhone] = useState(''),
        [getEmergencyPhone, setEmergencyPhone] = useState(''),
        [getOldPassword, setOldPassword] = useState(''),
        [getNewPassword, setNewPassword] = useState(''),
        [getNewConfirmedPassword, setNewConfirmedPassword] = useState(''),
        [getAddress, setAddress] = useState(''),
        [getSecondaryAddress, setSecondaryAddress] = useState(''),
        [getDistrict, setDistrict] = useState(''),
        [getPostcode, setPostCode] = useState('')

    const setUserProfile = (account) => {
        const user = account.user
        setFullName(user.name)
        setUserName(user.username)
        setEmail(user.email)
        setPhone(user.phone)
        setEmergencyPhone(user.emergency_phone)
        setAddress(user.address)
        setSecondaryAddress(user.address_2)
        setDistrict(user.district)
        setPostCode(user.postcode)
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                await user.fetchAccount()
                await setUserProfile(user.ACCOUNT)
            } catch{

            } finally {
                await setLoading(false)
            }

        }
        loadData()
    }, [user,getLoading, setLoading])
    

    if (getLoading) {
        return <Spinner />
    }





    if (!user.ACCESS_TOKEN && !user.ACCOUNT && !getLoading) {
        return props.navigation.navigate("Login");
    } else if(!getLoading) {


        return (
            <ScrollView>
                <View>
                    <Text>Account Details</Text>
                    <View style={DefaultStyles.flexContainer}>
                        <View style={DefaultStyles.w45}>
                            <Text>Full Name</Text>
                            <TextInput value={getFullName} onChangeText={setFullName} />
                        </View>
                        <View style={DefaultStyles.w45}>
                            <Text>Username</Text>
                            <TextInput editable={false} value={getUserName} />
                        </View>
                    </View>

                    <View style={DefaultStyles.w95}>
                        <Text>Email</Text>
                        <TextInput value={getEmail} onChangeText={setEmail} />
                    </View>

                    <View style={DefaultStyles.flexContainer}>
                        <View style={DefaultStyles.w45}>
                            <Text>Mobile Number</Text>
                            <TextInput value={getPhone} onChangeText={setPhone} />
                        </View>
                        <View style={DefaultStyles.w45}>
                            <Text>Emergency Mobile Number</Text>
                            <TextInput value={getEmergencyPhone} onChangeText={setEmergencyPhone} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={async () => {

                        setLoading(true)

                        try {
                            const userData = {
                                name: getFullName,
                                email: getEmail,
                                phone: getPhone,
                                emergency_phone: getEmergencyPhone
                            }
                            await user.fetchUpdateAccount(userData)
                            await user.fetchAccount()
                            await setUserProfile(user.ACCOUNT)
                        } catch{

                        } finally {
                            await setLoading(false)
                        }

                    }}>
                        <Text>Update</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text>Change Password</Text>
                    {getNewPassword && getNewConfirmedPassword && getOldPassword && !(user.UPDATE_ACCOUNT && user.UPDATE_ACCOUNT.success) && (!getOldPassword || getNewPassword != getNewConfirmedPassword) ? <Text>Please check password.</Text> : <Text></Text>}
                    {user.UPDATE_ACCOUNT && user.UPDATE_ACCOUNT.success ? <Text> Password Successfully Changed..</Text> : <Text></Text>}
                    <View style={DefaultStyles.w95}>
                        <Text>Old Password</Text>
                        <TextInput value={getOldPassword} secureTextEntry={true} onChangeText={setOldPassword} />
                    </View>
                    <View style={DefaultStyles.flexContainer}>
                        <View style={DefaultStyles.w45}>
                            <Text>New Password</Text>
                            <TextInput value={getNewPassword} onChangeText={setNewPassword} secureTextEntry={true}/>
                        </View>
                        <View style={DefaultStyles.w45}>
                            <Text>Confirmed New Password</Text>
                            <TextInput value={getNewConfirmedPassword} onChangeText={setNewConfirmedPassword} secureTextEntry={true}/>
                        </View>
                    </View>

                    <TouchableOpacity onPress={async () => {

                        await setLoading(true)
                        await user.fetchUpdatePassword({
                            current_password: getOldPassword,
                            password: getNewPassword,
                            password_confirmation: getNewConfirmedPassword
                        })
                        await setLoading(false)

                    }}>
                        <Text>Update</Text>
                    </TouchableOpacity>
                </View>


                <View>
                    <Text>Billing Address</Text>
                    <View style={DefaultStyles.flexContainer}>
                        <View style={DefaultStyles.w45}>
                            <Text>Address</Text>
                            <TextInput value={getAddress} onChangeText={setAddress} />
                        </View>
                        <View style={DefaultStyles.w45}>
                            <Text>Secondary Address</Text>
                            <TextInput value={getSecondaryAddress} onChangeText={setSecondaryAddress} />
                        </View>
                    </View>

                    <View style={DefaultStyles.flexContainer}>
                        <View style={DefaultStyles.w45}>
                            <Text>District</Text>
                            <TextInput value={getDistrict} onChangeText={setDistrict} />
                        </View>
                        <View style={DefaultStyles.w45}>
                            <Text>Post Code</Text>
                            <TextInput value={getPostcode} onChangeText={setPostCode} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={async () => {

                        setLoading(true)

                        try {
                            const userData = {
                                address: getAddress,
                                address_2: getSecondaryAddress,
                                district: getDistrict,
                                postcode: getPostcode
                            }
                            await user.fetchUpdateBillingAddress(userData)
                            await user.fetchAccount()
                            await setUserProfile(user.ACCOUNT)
                        } catch{

                        } finally {
                            await setLoading(false)
                        }

                    }}>
                        <Text>Update</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );


    }


};

const styles = StyleSheet.create({});


export default inject("store")(observer(withNavigation(UserIndex)));
