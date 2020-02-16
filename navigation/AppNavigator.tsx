import React from 'react'
import {Platform} from 'react-native'
import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AntDesign,MaterialIcons} from '@expo/vector-icons'

import StartUpScreen from '../screens/StartUpScreen'
import HomeScreen from '../screens/HomeScreen'
import CategoryScreen from '../screens/CategoryScreen'
import CategoryProductScreen from '../screens/CategoryProductScreen'
import ProductScreen from '../screens/ProductScreen'
import CartScreen from '../screens/CartScreen'
import SearchScreen from '../screens/SearchScreen'
import UserIndex from '../screens/user/index'
import LoginScreen from '../screens/auth/Login'
import RegisterScreen from '../screens/auth/Register'
import ReviewScreen from '../screens/product/ReviewScreen'

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
    Cart: CartScreen,
    Search: SearchScreen,
    Reviews: ReviewScreen,
    Login: LoginScreen,
    Register: RegisterScreen

})


const tabScreenConfig = {
  Home: {
        screen: MainNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name="home" size={30} />;
            }
        }
  },
  Category: {
      screen: CategoryScreen,
      navigationOptions: {
          tabBarIcon: (tabInfo) => {
              
              return <MaterialIcons name="dashboard" size={30}/>
          },
          tabBarColor: 'white',
          tabBarLabel: 'Category'
      }
    },
  
  Cart: {
      screen: CartScreen,
      navigationOptions: {
          tabBarIcon: (tabInfo) => {
              return <AntDesign name="shoppingcart" size={30}/>
          },
          tabBarColor: 'gray'
      }
    },
    Account: {
        screen: UserIndex,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <AntDesign name="user" size={30} />
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
    Category: {
        screen: CategoryScreen
    }
}, {
    defaultNavigationOptions: navigationOptions
})


const combineNavigator = createSwitchNavigator({
    Start: StartUpScreen,
    Drawer: DrawerNavigator
})




export default createAppContainer(combineNavigator);