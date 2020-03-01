import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome
} from "@expo/vector-icons";

import StartUpScreen from "../screens/StartUpScreen";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import CategoryProductScreen from "../screens/CategoryProductScreen";
import ProductScreen from "../screens/ProductScreen";

import CartScreen from "../screens/Checkout/CartScreen";
import CartCheckoutScreen from "../screens/Checkout/Checkout";
import CartPaymentScreen from "../screens/Checkout/Payment";
import CartReviewScreen from "../screens/Checkout/Review";
import CartSummeryScreen from "../screens/Checkout/Summary";

import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "../screens/auth/Login";
import RegisterScreen from "../screens/auth/Register";
import ReviewScreen from "../screens/product/ReviewScreen";

import RecommendedScreen from "../screens/pages/Recommended";
import JustForYouScreen from "../screens/pages/JustForYou";
import FlashSaleScreen from "../screens/pages/FlashSales";
import NewArrivalScreen from "../screens/pages/NewArrivals";

/*User Account*/
import UserIndex from "../screens/user/index";
import UserAccount from "../screens/user/Account";
import UserAccountUpdate from "../screens/user/AccountUpdate";
import UserAccountOrderHistory from "../screens/user/HistoryScreen";
import UserRewardPointScreen from "../screens/user/RewardPoints";
import UserReview from "../screens/user/ReviewScreen";
import UserCancellation from "../screens/user/Cancellation";

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
  NewArrivals: NewArrivalScreen,

  ///UserAccount
  UserAccount: UserAccount,
  UserAccountUpdate: UserAccountUpdate,
  UserAccountOrderHistory: UserAccountOrderHistory,
  UserRewardPoint: UserRewardPointScreen,
  UserReview: UserReview,
  UserCancellation: UserCancellation
});

MainNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.routes.length > 1) {
    const routeNamesToHideBottom = [
      "Cart",
      "CartCheckout",
      "CartPayment",
      "CartReview",
      "CartSummary"
    ];

    navigation.state.routes.map(route => {
      tabBarVisible = !routeNamesToHideBottom.includes(route.routeName);
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
      tabBarIcon: tabInfo => {
        return <Feather name="home" size={20} style={{ marginTop: 5 }} />;
      }
    }
  },
  Category: {
    screen: createStackNavigator({
      Category: CategoryScreen
    }),
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="md-list" size={26} />;
      },
      tabBarColor: "white",
      tabBarLabel: "Category"
    }
  },

  Cart: {
    screen: createStackNavigator({
      Cart: CartScreen
    }),
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="md-cart" size={26} />;
      }
    }
  },
  Account: {
    screen: createStackNavigator({
      Account: UserIndex
    }),
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <FontAwesome name="users" size={20} />;
      },
      tabBarColor: "gray"
    }
  }
};

const AppNavigator =
  Platform.OS == "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        shifting: true, //TabBarColor
        activeColor: "red",
        barStyle: {
          backgroundColor: "white"
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "#000000"
        }
      });

const DrawerNavigator = createDrawerNavigator(
  {
    Home: AppNavigator,
    Category: CategoryScreen
  },
  {
    defaultNavigationOptions: navigationOptions
  }
);

const combineNavigator = createSwitchNavigator({
  Start: StartUpScreen,
  Drawer: DrawerNavigator
});

export default createAppContainer(combineNavigator);
