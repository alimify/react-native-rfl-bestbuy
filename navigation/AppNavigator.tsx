import React from 'react'
import { Platform,Text } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

import StartUpScreen from '../screens/StartUpScreen'
import HomeScreen from '../screens/HomeScreen'
import CategoryScreen from '../screens/CategoryScreen'
import CategoryProductScreen from '../screens/CategoryProductScreen'
import ProductScreen from '../screens/ProductScreen'


import CartScreen from '../screens/Checkout/CartScreen'
import CartCheckoutScreen from '../screens/Checkout/Checkout'
import CartPaymentScreen from '../screens/Checkout/Payment'
import CartReviewScreen from '../screens/Checkout/Review'
import CartSummeryScreen from '../screens/Checkout/Summary'


import SearchScreen from '../screens/SearchScreen'
import UserIndex from '../screens/user/index'
import LoginScreen from '../screens/auth/Login'
import RegisterScreen from '../screens/auth/Register'
import ReviewScreen from '../screens/product/ReviewScreen'


import RecommendedScreen from "../screens/pages/Recommended"
import JustForYouScreen from "../screens/pages/JustForYou"
import FlashSaleScreen from "../screens/pages/FlashSales"
import NewArrivalScreen from "../screens/pages/NewArrivals"


const navigationOptions = {
    //   title: "RflbestbuyRFL",
    headerStyle: {
        backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontWeight: "bold"
    }
};



const MainNavigator = createStackNavigator({
    Home: HomeScreen,
    Category: CategoryScreen,
    CategoryProduct: CategoryProductScreen,
    Product: ProductScreen,
    Search: SearchScreen,
    Reviews: ReviewScreen,
    Login: LoginScreen,
    Register: RegisterScreen,

    Cart: CartScreen,
    CartCheckout: CartCheckoutScreen,
    CartPayment: CartPaymentScreen,
    CartReview: CartReviewScreen,
    CartSummary: CartSummeryScreen,

    Recommended: RecommendedScreen,
    JustForYou: JustForYouScreen,
    FlashSales: FlashSaleScreen,
    NewArrivals: NewArrivalScreen
});



MainNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.routes.length > 1) {
        const routeNamesToHideBottom = ['Cart', 'CartCheckout', 'CartPayment', 'CartReview','CartSummary']

        navigation.state.routes.map(route => {
                tabBarVisible = !routeNamesToHideBottom.includes(route.routeName)
        });
    }

    return {
        tabBarVisible
    };
};




const tabScreenConfig = {
    Home: {
        screen: MainNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name="home" size={20} />;
            }
        }
    },
    Category: {
        screen: CategoryScreen,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {

                return <MaterialIcons name="dashboard" size={20} />
            },
            tabBarColor: 'white',
            tabBarLabel: 'Category'
        }
    },

    Cart: {
        screen: CartScreen,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name="shoppingcart" size={20} />
            },
            tabBarColor: 'gray',
            tabBarVisible: true,
            title: 'Home',
            headerTitle: 'Home',
            tabBarLabel: 'Home',
            header: { visible: true }
        }
    },
    Account: {
        screen: UserIndex,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name="user" size={20} />
            },
            tabBarColor: 'gray'
        }
    }
};


const AppNavigator = Platform.OS == 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
    shifting: true, //TabBarColor
    activeColor: 'red',
    barStyle: {
        backgroundColor: 'white'
    }

}) : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: 'red'
    }
})


const DrawerNavigator = createDrawerNavigator({
    Home: AppNavigator,
    Category: CategoryScreen
}, {
    defaultNavigationOptions: navigationOptions
})


const combineNavigator = createSwitchNavigator({
    Start: StartUpScreen,
    Drawer: DrawerNavigator
})




export default createAppContainer(combineNavigator);