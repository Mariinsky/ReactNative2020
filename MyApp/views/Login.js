import React from "react";
import useSignUpForm from "../hooks/LoginHooks";
import FormTextInput from "../components/FormTextInput";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";
import propTypes from 'prop-types';
import { login } from "../hooks/APIhooks";

const Login = props => {
  // props is needed for navigation
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    inputs
  } = useSignUpForm();
  const signInAsync = async () => {
    try {
      const json = await login("http://media.mw.metropolia.fi/wbma/login", inputs);
      await AsyncStorage.setItem("user", JSON.stringify(json.user));
      await AsyncStorage.setItem("userToken", json.token);
      props.navigation.navigate("App");
    } catch (e) {
      console.log(e);
    }
  };
  const registerInAsync = async () => {
    try {
      const json = await login("http://media.mw.metropolia.fi/wbma/users",inputs);
      console.log('register', json);
      if (json.user_id) {
       signInAsync()
      } else {
        alert('registration failed.');
      }
    } catch (e) {
      console.log('register error', e);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <View style={styles.form}>
        <FormTextInput
          autoCapitalize="none"
          placeholder="username"
          onChangeText={handleUsernameChange}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="password"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
        />
        <Button title="Sign in!" onPress={signInAsync} />
      </View>
      <Text>Register</Text>
      <View style={styles.form}>
        <FormTextInput
          autoCapitalize="none"
          placeholder="username"
          onChangeText={handleUsernameChange}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="password"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
        />
        <FormTextInput
          autoCapitalize="none"
          placeholder="email"
          onChangeText={handleEmailChange}
        />
        <Button title="Register!" onPress={registerInAsync} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  }
});

// proptypes here
Login.propTypes = {
  navigation: propTypes.object,
};

export default Login;
