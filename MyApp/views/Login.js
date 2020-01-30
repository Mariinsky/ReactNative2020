import React, { useState, useEffect } from "react";
import useSignUpForm from "../hooks/LoginHooks";
import FormTextInput from "../components/FormTextInput";
import { AsyncStorage, StyleSheet } from "react-native";
import propTypes from "prop-types";
import { getProfilePic, login } from "../hooks/APIhooks";
import {
  Button,
  Container,
  Form,
  Item,
  Body,
  Text,
  Label,
  Icon,
  Toast
} from "native-base";

const Login = props => {
  // props is needed for navigation
  const [userAvailable, setUserAvailable] = useState(true);
  const checkUser = async text => {
    if (valid.username == undefined) {
      try {
        const response = await fetch(
          "http://media.mw.metropolia.fi/wbma/users/username/" + text
        );
        const result = await response.json();
        setUserAvailable(result.available);
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handlePasswordCheck,
    inputs,
    valid
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
    const checkValid = valid => {
      let ok = false;
      for (let it in valid) {
        if (valid[it] == undefined) {
          ok = !ok;
        } else {
          ok = !ok;
        }
      }
       return ok;

    };
    if (checkValid()) {
      try {
        const json = await login(
          "http://media.mw.metropolia.fi/wbma/users",
          inputs
        );
        if (json.user_id) {
          signInAsync();
        } else {
          alert("registration failed.");
        }
      } catch (e) {
        console.log("register error", e);
      }
    } else {
      showToast("check registration form");
    }
  };
  const changeLoginStatus = () => setFormToggle(!formToggle);
  let [formToggle, setFormToggle] = useState(true);
  useEffect(() => {
    if (!userAvailable) {
      Toast.show({
        text: "Username already in use!",
        buttonText: "Ok",
        duration: 3000,
        position: "top",
        type: "warning"
      });
    }
  }, [userAvailable]);
  const showToast = message => {
    if (message != undefined) {
      Toast.show({
        text: message,
        buttonText: "Ok",
        duration: 2000,
        position: "top",
        type: "warning"
      });
    }
  };
  return (
    <Container>
      {formToggle ? (
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
            <Text onPress={changeLoginStatus} style={styles.text}>
              Not registered?
            </Text>
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
              onEndEditing={e => {
                checkUser(e.nativeEvent.text);
                showToast(valid.username);
              }}
            />
            {!userAvailable && (
              <Icon name="close-circle" style={{ color: "red" }} />
            )}
            {valid.username != undefined && (
              <Icon name="close-circle" style={{ color: "red" }} />
            )}
          </Item>

          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="password"
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              onEndEditing={e => showToast(valid.password)}

            />
            {valid.password != undefined && (
              <Icon name="close-circle" style={{ color: "red" }} />
            )}
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="repeat password"
              secureTextEntry={true}
              onChangeText={handlePasswordCheck}
              onEndEditing={e => showToast(valid.passCheck)}

            />
            {valid.passCheck != undefined && (
              <Icon name="close-circle" style={{ color: "red" }} />
            )}
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="email"
              onChangeText={handleEmailChange}
              onEndEditing={e => showToast(valid.email)}
            />
            {valid.email != undefined && (
              <Icon name="close-circle" style={{ color: "red" }} />
            )}
          </Item>
          <Button onPress={registerInAsync}>
            <Body>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Register
              </Text>
            </Body>
          </Button>
          <Body>
            <Text onPress={changeLoginStatus} style={styles.text}>
              Back to login
            </Text>
          </Body>
        </Form>
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    color: "#C2185B"
  }
});
// proptypes here
Login.propTypes = {
  navigation: propTypes.object
};

export default Login;
