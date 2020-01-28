import React, { useState } from "react";
import useSignUpForm from "../hooks/LoginHooks";
import FormTextInput from "../components/FormTextInput";
import { AsyncStorage } from "react-native";
import propTypes from "prop-types";
import { login, getProfilePic } from "../hooks/APIhooks";
import { Button, Container, Form, Item, Body, Text, Label } from "native-base";

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
      const json = await login(
        "http://media.mw.metropolia.fi/wbma/login",
        inputs
      );
      const pic = await getProfilePic(json);
      json.user.picture = pic[0].filename;
      console.log(json.user);
      await AsyncStorage.setItem("user", JSON.stringify(json.user));
      await AsyncStorage.setItem("userToken", json.token);
      props.navigation.navigate("App");
    } catch (e) {
      console.log(e);
    }
  };
  const registerInAsync = async () => {
    try {
      const json = await login(
        "http://media.mw.metropolia.fi/wbma/users",
        inputs
      );
      console.log("register", json);
      if (json.user_id) {
        signInAsync();
      } else {
        alert("registration failed.");
      }
    } catch (e) {
      console.log("register error", e);
    }
  };
  const changeLoginStatus = () => setLogin(!login);
  let [login, setLogin] = useState(true);
  return (
    <Container>
      {login ? (
        <Form>
          <Item style={{ borderColor: "transparent" }}>
            <Body>
              <Label style={{ fontSize: 20, fontWeight: "bold", margin: 20 }}>
                Login
              </Label>
            </Body>
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="username"
              onChangeText={handleUsernameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="password"
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
          </Item>
          <Button onPress={signInAsync}>
            <Body>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Sign In
              </Text>
            </Body>
          </Button>
          <Body>
            <Text onPress={changeLoginStatus}>Not registered?</Text>
          </Body>
        </Form>
      ) : (
        <Form>
          <Item style={{ borderColor: "transparent" }}>
            <Body>
              <Label style={{ fontSize: 20, fontWeight: "bold", margin: 20 }}>
                Register
              </Label>
            </Body>
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="username"
              onChangeText={handleUsernameChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="password"
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="email"
              onChangeText={handleEmailChange}
            />
          </Item>
          <Button onPress={registerInAsync}>
            <Body>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Register
              </Text>
            </Body>
          </Button>
          <Body>
            <Text onPress={changeLoginStatus}>Back to login</Text>
          </Body>
        </Form>
      )}
    </Container>
  );
};

// proptypes here
Login.propTypes = {
  navigation: propTypes.object
};

export default Login;
