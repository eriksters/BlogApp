import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
// import { signIn, signOut } from "../Redux/Actions/AccountActions";

const MyBlogPostListTab = () => {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>My posts</Text>
      <Text>
        {account.signedIn ? "You are signed in" : "You should sign in"}
      </Text>
      <Button onPress={() => dispatch(signIn("Bob@snailmail.com", "Bob123"))}>
        Log In
      </Button>
      <Button onPress={() => dispatch(signOut())}>Log Out</Button>
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
