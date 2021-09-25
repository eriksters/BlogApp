import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Baskervville_400Regular,
} from "@expo-google-fonts/baskervville";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";

import { Provider as PaperProvider } from "react-native-paper";

// import { createStore, combineReducers } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "./Redux/AccountSlice";

import CreateBlogPostScreen from "./Screens/CreateBlogPostScreen";
import NewestBlogPostListTab from "./Screens/NewestBlogPostListTab";
import PopularBlogPostListTab from "./Screens/PopularBlogPostListTab";
import TopBlogPostListTab from "./Screens/TopBlogPostListTab";
import MyBlogPostListTab from "./Screens/MyBlogPostListTab";
import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import NavigationBase from "./Screens/NavigationBase";

export default function App() {
  let [fontsLoaded] = useFonts({
    Baskervville_400Regular,
  });

  const reduxStore = configureStore({ reducer: { account: AccountReducer } });

  if (fontsLoaded) {
    return (
      <ReduxProvider store={reduxStore}>
        <PaperProvider>
          <NavigationBase />
        </PaperProvider>
      </ReduxProvider>
    );
  } else {
    return <AppLoading />;
  }
}

const styles = StyleSheet.create({});
