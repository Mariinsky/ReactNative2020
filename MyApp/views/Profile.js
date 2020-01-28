import React, { useState, useEffect } from "react";
import { AsyncStorage, Image, Dimensions } from "react-native";
import {
  Container,
  Text,
  Button,
  Body,
  Icon,
  Content,
  Card,
  CardItem,
  Label
} from "native-base";

const url = "http://media.mw.metropolia.fi/wbma/uploads/";
const fetchUser = () => {
  const [user, setUser] = useState([]);
  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    setUser(JSON.parse(user));
  };
  useEffect(() => {
    getUser();
  });

  return user;
};

const Profile = props => {
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("Auth");
  };
  const user = fetchUser();
  return (
    <Container>
      <Content>
        <Card>
          <CardItem bordered>
            <Icon name="person" />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              username: {user.username}
            </Text>
          </CardItem>
          <Body>
          <CardItem bordered>
            <Image
              style={{
                width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").width * 0.9,

              }}
              source={{ uri: url + user.picture }}
            />
          </CardItem>
          </Body>
          <CardItem bordered>
            <Body>
              <Text>email: {user.email}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Button style={{ flex: 1 }} onPress={signOutAsync}>
              <Body>
                <Label style={{ color: "white" }}>Logout</Label>
              </Body>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Profile;
