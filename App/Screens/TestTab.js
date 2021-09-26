import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "../Redux/AccountSlice";

const TestTab = () => {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Signed in as {account.username}</Text>
      <Text>Id: {account._id}</Text>
      <Button
        onPress={() => {
          dispatch(signOut());
        }}
      >
        Sign Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TestTab;
