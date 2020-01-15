import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const Single = props => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text>{ navigation.getParam("title", "no_title")}</Text>
      <Image
        style={{ width: '100%', height: null, flex: 1, resizeMode: "contain"}}
        source={{
          uri:
            "http://media.mw.metropolia.fi/wbma/uploads/" +
            navigation.getParam("filename", "no_filename")
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,

  }
});

export default Single;
