import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const LikeCounter = ({ style, value }) => {
  return (
    <TouchableOpacity
      style={{ ...style, ...styles.touchableContainer }}
      onPress={() => console.log("Pressed")}
    >
      <View style={styles.innerContainer}>
        <Ionicons name='md-thumbs-up' size={20} color={Colors.white} />
        <Text style={styles.count}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    padding: 10,
  },
  innerContainer: {
    paddingVertical: 4,
    flexDirection: "row",
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: Colors.blue500,
  },
  count: {
    alignSelf: "center",
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
});
export default LikeCounter;
