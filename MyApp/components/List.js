import React, { useContext, useEffect } from "react";
import { FlatList, Image, Dimensions, View, Text } from "react-native";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import { MediaContext } from "../contexts/MediaContext";
import { getAllMedia } from "../hooks/APIhooks";

const List = props => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();

  useEffect(() => {
    setMedia(data);
  }, [loading]);
  return (
    <View>
      <Image
        source={require("../img/911.jpg")}
        style={{
          width: Dimensions.get("window").width * 1,
          height: Dimensions.get("window").width * 0.4,
        }}
      ></Image>
      <Text style={{ position: "absolute", left: 10, top: 10, color: '#fff', fontWeight: "bold", fontSize: 20, backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: 10}}>
        Turha teksti
      </Text>
      <FlatList
        data={media}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem navigation={props.navigation} singleMedia={item} />
        )}
      />
    </View>
  );
};

List.propTypes = {
  mediaArray: PropTypes.array
};

export default List;
