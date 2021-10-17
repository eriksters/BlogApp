import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signOut } from "../Redux/AccountSlice";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  const onSignOutPress = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (account.signInStatus === "guest") {
      dispatch(signOut());
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Signed in as {account.username}</Text>
      <Button style={styles.signOutButton} onPress={onSignOutPress}>
        Sign Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButton: {},
});
export default AccountScreen;
