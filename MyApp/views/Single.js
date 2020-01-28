import React from "react";
import { Image } from "react-native";
import { Container, Body, Text} from 'native-base'

const Single = props => {
  const { navigation } = props;
  return (
    <Container>
      <Body>
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain', marginTop:20}}
        source={{
          uri:
            "http://media.mw.metropolia.fi/wbma/uploads/" +
            navigation.getParam("filename", "no_filename")
        }}
      />
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ navigation.getParam("title", "no_title")}</Text>
      <Text style={{marginTop: 10}}>{navigation.getParam('description', 'no_descrtiption')}</Text>
      </Body>
    </Container>
  );
};


export default Single;
