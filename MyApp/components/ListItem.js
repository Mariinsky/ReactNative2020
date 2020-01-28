import React from "react";
import { Dimensions, Image } from "react-native";
import PropTypes from "prop-types";
import { ListItem as Item, Text, Left, Body, Button, Right } from "native-base";

const url = "http://media.mw.metropolia.fi/wbma/uploads/";
const ListItem = props => {
  return (
    <Item>
      <Left>
        <Image
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 0.15,
            height: Dimensions.get("window").width * 0.15,
            margin: 10
          }}
          source={{ uri: url + props.singleMedia.thumbnails.w160 }}
        />

        <Body>
          <Text style={{ fontWeight: "bold" }}>{props.singleMedia.title}</Text>
          <Text>{props.singleMedia.description}</Text>
        </Body>
      </Left>
      <Right>
        <Button
          primary
          onPress={() => {
            props.navigation.push("Single", {
              filename: props.singleMedia.filename,
              title: props.singleMedia.title,
              description: props.singleMedia.description
            });
          }}
        >
          <Text>View</Text>
        </Button>
      </Right>
    </Item>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object
};

export default ListItem;
