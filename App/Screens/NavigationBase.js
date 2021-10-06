import { StatusBar } from "expo-status-bar";
import React from "react";
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

import {
  Button,
  Colors,
  IconButton,
  Provider as PaperProvider,
} from "react-native-paper";

// import { createStore, combineReducers } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "../Redux/AccountSlice";

import ViewBlogPostScreen from "./ViewBlogPostScreen";
import CreateBlogPostScreen from "./CreateBlogPostScreen";
import NewestBlogPostListTab from "./NewestBlogPostListTab";
import PopularBlogPostListTab from "./PopularBlogPostListTab";
import TopBlogPostListTab from "./TopBlogPostListTab";
import MyBlogPostListTab from "./MyBlogPostListTab";
import EditBlogPostScreen from "./EditBlogPostScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import TestTab from "./TestTab";
import { like } from "../Redux/BlogPostSlice";

const TabComponent = () => {
  const Tab = createBottomTabNavigator();
  const account = useSelector((state) => state.account);
  return (
    <Tab.Navigator
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
            <MaterialIcons name='account-circle' size={size} color={color} />
          ),
        }}
        initialParams={{ creatorId: account._id }}
      />
      <Tab.Screen
        name='Test'
        component={TestTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='plus-box' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const NavigationBase = () => {
  const AuthStack = createStackNavigator();
  const MainStack = createStackNavigator();

  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const posts = useSelector((state) => state.blogPosts);

  const onTestPress = () => {
    console.log("Liking post");
    dispatch(like({ postId: "61508d50e8c2952ff1015392" }));
  };

  return (
    <>
      <IconButton
        onPress={onTestPress}
        style={styles.testButton}
        icon='alpha-t-circle'
        size={50}
        color={Colors.amber500}
      />
      <NavigationContainer>
        {account.signInStatus === "none" ? (
          <AuthStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='SignIn'
          >
            <AuthStack.Screen name='SignIn' component={SignInScreen} />
            <AuthStack.Screen name='SignUp' component={SignUpScreen} />
          </AuthStack.Navigator>
        ) : (
          <MainStack.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
          >
            <MainStack.Screen name='Home' component={TabComponent} />
            <MainStack.Screen name='Create' component={CreateBlogPostScreen} />
            <MainStack.Screen name='Edit' component={EditBlogPostScreen} />
            <MainStack.Screen name='View' component={ViewBlogPostScreen} />
            <MainStack.Screen name='CreatedBy' component={MyBlogPostListTab} />
          </MainStack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    // flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  testButton: {
    position: "absolute",
    right: 10,
    top: 20,
    zIndex: 1,
  },
});
export default NavigationBase;
