import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../Redux/AccountSlice";

const MyBlogPostListTab = () => {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>My posts</Text>
      <Text>Sign In Status: {account.signInStatus}</Text>
      {/* <Text></Text> */}
      <Button onPress={() => dispatch(signOut())}>
        Sign in to see your posts and create new ones!
      </Button>
      {/* <Button onPress={() => dispatch(signOut())}>Log Out</Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default MyBlogPostListTab;
