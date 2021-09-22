import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Baskervville_400Regular,
} from "@expo-google-fonts/baskervville";
import AppLoading from "expo-app-loading";
import {
  Provider as PaperProvider,
  BottomNavigation,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";

import CreateBlogPostScreen from "./Screens/CreateBlogPostScreen";
import NewestBlogPostListTab from "./Screens/NewestBlogPostListTab";
import PopularBlogPostListTab from "./Screens/PopularBlogPostListTab";
import TopBlogPostListTab from "./Screens/TopBlogPostListTab";
import MyBlogPostListTab from "./Screens/MyBlogPostListTab";

export default function App() {
  let [fontsLoaded] = useFonts({
    Baskervville_400Regular,
  });

  const Tab = createBottomTabNavigator();

  if (fontsLoaded) {
    return (
      <NavigationContainer>
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
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return <AppLoading />;
  }

  // const CreateBlogPostRoute = () => <NewBlogPostScreen />;
  // const BlogPostListRoute = () => <BlogPostList />;

  // const [index, setIndex] = useState(0);
  // const [routes] = useState([
  //   { key: "blogPostList", title: "List", icon: "view-list-outline" },
  //   { key: "createBlogPost", title: "Create", icon: "plus-box" },
  // ]);

  // const renderScene = BottomNavigation.SceneMap({
  //   blogPostList: BlogPostListRoute,
  //   createBlogPost: CreateBlogPostRoute,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else {
  //   return (
  //     <PaperProvider>
  //       <StatusBar style={styles.statusBar} translucent={true} />
  //       {/* <View style={styles.container}> */}
  //       <BottomNavigation
  //         navigationState={{ index, routes }}
  //         onIndexChange={setIndex}
  //         renderScene={renderScene}
  //       />

  //       {/* </View> */}
  //     </PaperProvider>
  //   );

  // <PaperProvider>
  //   <StatusBar style='auto' />
  //   <NewBlogPostScreen />

  //   <View style={styles.container}>
  //     <BlogPostList />
  //     <StatusBar style='auto' />
  //   </View>
  // </PaperProvider>
  // );
  // }
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
