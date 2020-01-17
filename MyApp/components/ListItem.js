import React from "react";
import { Dimensions, View, Image, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const url = "http://media.mw.metropolia.fi/wbma/uploads/";
const ListItem = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.push("Single", {
          filename: props.singleMedia.filename,
          title: props.singleMedia.title
        });
      }}
      style={{
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 0.3,

        elevation: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: "row",
        padding: 10
      }}
    >
      <Image
        style={{
          borderRadius:
            Math.round(
              Dimensions.get("window").width + Dimensions.get("window").height
            ) / 2,
          width: Dimensions.get("window").width * 0.35,
          height: Dimensions.get("window").width * 0.35,
          margin: 10
        }}
        source={{ uri: url + props.singleMedia.thumbnails.w160 }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {props.singleMedia.title}
        </Text>
        <Text style= {{paddingTop: 5}}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default ListItem;
