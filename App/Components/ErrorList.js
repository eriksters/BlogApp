import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HelperText } from "react-native-paper";

const ErrorList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <HelperText type='error'>{item}</HelperText>}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    width: "100%",
  },
});

export default ErrorList;
