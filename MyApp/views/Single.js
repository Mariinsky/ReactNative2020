import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  H3,
  Icon,
  Text,
  Button
} from "native-base";
import {AsyncStorage} from 'react-native'
import PropTypes from "prop-types";
import AsyncImage from "../components/AsyncImage";
import { Dimensions } from "react-native";
import { Video } from "expo-av";
import { fetchGET, postFavourite, isLiked} from '../hooks/APIHooks'


const deviceHeight = Dimensions.get("window").height;

const mediaURL = "http://media.mw.metropolia.fi/wbma/uploads/";

const Single = props => {
  const [liked, setLiked] = useState()
  const { navigation } = props;
  const file = navigation.state.params.file;
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const user = await fetchGET('users', file.user_id, token)
      setUser(user);
    }catch (e) {
      console.log(e)
    }
  }
  const checkLicked = async () => {
    const status = await isLiked(file.file_id);
    setLiked(status)
    console.log('liked? ',liked)
  }
  const putLike = async () => {
    await postFavourite(file.file_id);
    await checkLicked(file.file_id);
  }
  useEffect(()=> {
    getUser();
    checkLicked();
  },[])
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            {file.media_type === "image" && (
              <AsyncImage
                style={{
                  width: "100%",
                  height: deviceHeight / 2
                }}
                spinnerColor="#777"
                source={{ uri: mediaURL + file.filename }}
              />
            )}
            {file.media_type === "video" && (
              <Video
                source={{ uri: mediaURL + file.filename }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: "100%", height: deviceHeight / 2 }}
                onError={(e) => {console.log('video error', e)}}

              />
            )}
          </CardItem>
          <CardItem>
            <Left>
              <Icon name="image" />
              <Body>
                <H3>{file.title}</H3>
                <Text>{file.description}</Text>
                <Text>By {user.username}</Text>
              </Body>
            </Left>
           <Button transparent onPress={() => {putLike(file.file_id)}}>
             {liked === undefined && <Icon name="heart" />}
             {liked !== undefined && <Icon name="add"/>}


            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  file: PropTypes.object
};

export default Single;
