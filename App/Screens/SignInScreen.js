import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../Redux/AccountSlice";
import { Provider as PaperProvider, TextInput } from "react-native-paper";
import ErrorList from "../Components/ErrorList";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const onSignInPress = () => {
    dispatch(
      signIn({
        email,
        password,
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        label='E-Mail'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        mode='outlined'
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.textInput}
        mode='outlined'
        secureTextEntry={true}
      />
      <ErrorList data={account.errors} />
      <Button
        mode='contained'
        style={styles.signInButton}
        onPress={onSignInPress}
        disabled={account.loading}
      >
        Sign in
      </Button>
      <Text style={styles.noAccountText}>Don't have an account?</Text>
      <Button onPress={() => navigation.navigate("SignUp")}>
        Sign up here!
      </Button>
      <Text>or</Text>
      {/* TODO: Continue as guest */}
      <Button onPress={() => navigation.navigate("SignUp")}>
        Continue as guest
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  textInput: {
    width: "100%",
  },
  signInButton: {
    marginTop: 10,
    width: "100%",
  },
  noAccountText: {
    marginTop: 40,
  },
});
export default SignInScreen;
