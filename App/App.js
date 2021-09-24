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

export default function App() {
  let [fontsLoaded] = useFonts({
    Baskervville_400Regular,
  });

  // const preloadedState = {
  //   account: {
  //     signedIn: true,
  //     accountId: 101010,
  //     username: "Bob",
  //     token: "TEST_JWT_TOKEN",
  //   },
  // };

  // const reducers = combineReducers({ account: AccountReducer });
  const reduxStore = configureStore({ reducer: { account: AccountReducer } });

  const Tab = createBottomTabNavigator();

  const Stack = createStackNavigator();

  if (fontsLoaded) {
    return (
      <ReduxProvider store={reduxStore}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName='SignUp'
            >
              <Stack.Screen name='SignIn' component={SignInScreen} />
              <Stack.Screen name='SignUp' component={SignUpScreen} />
            </Stack.Navigator>
            {/* <Tab.Navigator
            initialRouteName={"Newest"}
            screenOptions={{ headerShown: false }}
          >
            <Tab.Screen
              name='Newest'
              component={NewestBlogPostListTab}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name='newspaper'
                    size={size}
                    color={color}
                  />
                ),
                tabBarLabel: "New",
              }}
            />
            <Tab.Screen
              name='Popular'
              component={PopularBlogPostListTab}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Octicons name='flame' size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name='Top'
              component={TopBlogPostListTab}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='ribbon-sharp' size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name='Mine'
              component={MyBlogPostListTab}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons
                    name='account-circle'
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name='Remove Me!'
              component={CreateBlogPostScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name='plus-box'
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator> */}
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    );
  } else {
    return <AppLoading />;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    // flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  statusBar: {},
});
