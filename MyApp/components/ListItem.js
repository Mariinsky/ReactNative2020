import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const ListItem = props => {
  return (
    <TouchableOpacity
      onPress={() => console.log(props.singleMedia.filename)}
      style={{
        backgroundColor: "darkgrey",
        marginBottom: 10,
        flexDirection: "row",
        padding: 10
      }}
    >
      <Image
        style={{ width: 100, height: null, flex: 1 }}
        source={{ uri: props.singleMedia.thumbnails.w160 }}
      />
      <View style={{ flex: 1, marginLeft: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {props.singleMedia.title}
        </Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default ListItem;
