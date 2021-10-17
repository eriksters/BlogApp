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
import AccountReducer, { signOut } from "../Redux/AccountSlice";

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
import { create, like } from "../Redux/BlogPostSlice";
import BlogPostListScreen from "./BlogPostListScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AccountScreen from "./AccountScreen";

const PostsStack = () => {
  const MainStack = createStackNavigator();

  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name='Home' component={BlogPostListScreen} />
      <MainStack.Screen name='Create' component={CreateBlogPostScreen} />
      <MainStack.Screen name='Edit' component={EditBlogPostScreen} />
      <MainStack.Screen name='View' component={ViewBlogPostScreen} />
      <MainStack.Screen name='CreatedBy' component={MyBlogPostListTab} />
    </MainStack.Navigator>
  );
};

const MainStackComponent = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName='ListStack'
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        component={PostsStack}
        name='ListStack'
        options={({ route }) => ({
          title: route.params?.title || "Posts",
        })}
      />
      <Drawer.Screen component={AccountScreen} name='Account' />
    </Drawer.Navigator>
  );
};

const NavigationBase = ({ navigation }) => {
  const AuthStack = createStackNavigator();

  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const posts = useSelector((state) => state.blogPosts);

  const onDrawerPress = () => {
    console.log("Opening drawer");
  };

  return (
    <>
      {/* <IconButton
        icon='format-list-bulleted'
        style={styles.drawerButton}
        onPress={onDrawerPress}
        size={30}
      /> */}
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
          <MainStackComponent />
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
  drawerButton: {
    position: "absolute",
    top: 50,
    left: 10,
    zIndex: 1,
  },
});
export default NavigationBase;
