import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Baskervville_400Regular,
} from "@expo-google-fonts/baskervville";
import AppLoading from "expo-app-loading";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";

import reduxStore from "./Redux/Store";
import NavigationBase from "./Screens/NavigationBase";

export default function App() {
  let [fontsLoaded] = useFonts({
    Baskervville_400Regular,
  });

  if (fontsLoaded) {
    return (
      <ReduxProvider store={reduxStore}>
        <PaperProvider>
          <NavigationBase />
        </PaperProvider>
      </ReduxProvider>
    );
  } else {
    return <AppLoading />;
  }
}

const styles = StyleSheet.create({});
