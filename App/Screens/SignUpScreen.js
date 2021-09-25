import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  TextInput,
  Button,
  Colors,
  DefaultTheme,
  HelperText,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ErrorList from "../Components/ErrorList";
import { signUp } from "../Redux/AccountSlice";

const SignUpScreen = ({ navigation }) => {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("eriksters");
  const [email, setEmail] = useState("email@email.com");
  const [password, setPassword] = useState("[Password1]");
  const [confPassword, setConfPassword] = useState("[Password1]");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (account.errors.length > 0) {
      setErrors(account.errors);
    }
  }, [account.errors]);

  const getPasswordErrors = () => {
    let errors = [];

    const regContainsLowercase = /^(?=.*[a-z])/;
    if (!regContainsLowercase.test(password))
      errors = [
        ...errors,
        "Password must contain at least one lowercase letter",
      ];

    const regContainsUppercase = /^(?=.*[A-Z])/;
    if (!regContainsUppercase.test(password))
      errors = [
        ...errors,
        "Password must contain at least one uppercase letter",
      ];

    const regContainsSpecial = /^(?=.*[~!@#$%^&*)(_+:[}="`-])/;
    if (!regContainsSpecial.test(password))
      errors = [
        ...errors,
        "Password must contain at least one special character",
      ];

    const regContainsNumber = /^(?=.*\d)/;
    if (!regContainsNumber.test(password))
      errors = [...errors, "Password must contain at least one number"];

    const regLength = /^[~!@#$%^&*)(+:[}="`\w-]{8,20}/;
    if (!regLength.test(password))
      errors = [...errors, "Password must be between 8 and 20 characters long"];

    return errors;
  };

  const emailValid = () => {
    let reg =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return reg.test(email);
  };

  const passwordMatch = () => {
    return password === confPassword;
  };

  const onSignUpPress = () => {
    let errors = getPasswordErrors();

    if (!emailValid()) errors = [...errors, "Not a valid E-Mail"];

    if (!passwordMatch()) errors = [...errors, "Passwords do not match"];

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      setErrors([]);
      dispatch(signUp({ email, password, username }));
    }
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.backButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        {"<"} Back
      </Button>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.textInput}
        mode='outlined'
        label='Username'
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.textInput}
        mode='outlined'
        label='E-Mail'
        value={email}
        onChangeText={(text) => setEmail(text)}
        theme={
          emailValid()
            ? { colors: { primary: Colors.green500 } }
            : { colors: { primary: Colors.red500 } }
        }
      />
      <TextInput
        style={{ ...styles.textInput, ...styles.passwordInput }}
        mode='outlined'
        label='Password'
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        theme={
          getPasswordErrors().length === 0
            ? { colors: { primary: Colors.green500 } }
            : { colors: { primary: Colors.red500 } }
        }
      />
      <TextInput
        style={styles.textInput}
        mode='outlined'
        label='Confirm Password'
        secureTextEntry={true}
        color={Colors.red500}
        value={confPassword}
        onChangeText={(text) => setConfPassword(text)}
        theme={
          passwordMatch()
            ? { colors: { primary: Colors.green500 } }
            : { colors: { primary: Colors.red600 } }
        }
      />
      <ErrorList data={errors} />
      <Button
        onPress={onSignUpPress}
        mode='contained'
        style={styles.signUpButton}
        disabled={account.loading}
      >
        Sign Up
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
    marginBottom: 6,
  },
  passwordInput: {
    marginBottom: 0,
  },
  signUpButton: {
    width: "100%",
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 30,
  },
});
export default SignUpScreen;
