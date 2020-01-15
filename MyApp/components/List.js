import React, { useContext } from "react";
import { FlatList } from "react-native";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import { MediaContext } from '../contexts/MediaContext'

const List = () => {
  const [media, setMedia] = useContext(MediaContext);
  return (
    <FlatList
      data={media}
      keyExtractor={( item, index) => index.toString()}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  );
};

List.propTypes = {
  mediaArray: PropTypes.array
};

export default List;
