import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Colors } from "react-native-paper";

const TabItem = ({ selected, icon, label, onPress }) => {
  const color = selected ? Colors.blue500 : Colors.grey500;

  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      {icon({ color, size: 24 })}
      <Text style={{ ...styles.label, color: color }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    width: 50,
  },
  label: {
    fontSize: 10,
  },
});
export default TabItem;
