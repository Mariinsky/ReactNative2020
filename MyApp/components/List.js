import React, { useContext, useEffect } from "react";
import {  Image, Dimensions, View, Text } from "react-native";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import { MediaContext } from "../contexts/MediaContext";
import { getAllMedia } from "../hooks/APIhooks";
import {List as BaseList } from 'native-base'


const List = props => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();

  useEffect(() => {
    setMedia(data);
  }, [loading]);
  return (
    <BaseList
    dataArray={media}
    renderRow={
      (item) => <ListItem
        navigation={props.navigation}
        singleMedia={item}
      />
    }
    keyExtractor={(item, index) => index.toString()}
  />
  );
};

List.propTypes = {
  mediaArray: PropTypes.array
};

export default List;
