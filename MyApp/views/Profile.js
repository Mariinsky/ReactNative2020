import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";

const fetchUser = () => {
  const [user, setUser] = useState([]);
  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    setUser(JSON.parse(user));
  };
  useEffect(() => {
    getUser();
  })

  return user;
};

const Profile = props => {
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("Auth");
  };
  const user = fetchUser();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>username: {user.username}</Text>
      <Text style={styles.text}>email: {user.email}</Text>
      <View style={styles.logout}>
        <Button title="Logout!" onPress={signOutAsync} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40
  },
  text: {
    paddingBottom: 10,
    fontSize: 20
  },
  logout: {
    alignSelf: "stretch",
    margin: 30
  }
});

export default Profile;
