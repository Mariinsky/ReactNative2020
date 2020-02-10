import React, {useState, } from 'react';
import {Text, Button, Form, Body, Item, Container, Label, Right, } from "native-base";
import {Image, Dimensions, StyleSheet, ActivityIndicator} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import useUploadForm from "../hooks/UploadHooks";
import * as ImagePicker from "expo-image-picker";


const Upload = (props) => {
  const {
    inputs,
    valid,
    handleTextChange,
    handleTitleChange,
    validateInput,
    handleUpload,
    resetText,

  } = useUploadForm();


  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("result", result);
    if (!result.cancelled) {
      setImage(result.uri);
      console.log("image state:", image);
    }
  };

  const clearForms = () => {
    setImage(null);
    resetText("title", "");
    resetText("postText", "");
  };
  const [loading, setLoading] = useState(false);
  return (
    <Container>
      {!loading ? (
      <Form>
        <Item style={{borderColor: "transparent"}}>
          <Body>
            <Text style={{fontWeight: "bold", fontSize: 30,}}>Upload</Text>
          </Body>
        </Item>
        <Item style={{borderColor: "transparent"}}>
            <FormTextInput
              value={inputs.title}
              placeholder='title'
              onChangeText={handleTitleChange}
              onEndEditing={() => validateInput("title", inputs.title)}
            />

          {valid.title &&
          <Label style={{color: "red"}}>{valid.title}</Label>
          }
        </Item>
        <Item style={{borderColor: "transparent"}}>

            <FormTextInput
              value={inputs.postText}
              placeholder='text'
              onChangeText={handleTextChange}
            />

        </Item>
        <Button primary dark onPress={pickImage}>
          <Body>
            <Text style={{color: "white"}}>Select</Text>
          </Body>
        </Button>
        {!valid.title && image &&
        <Form>
          <Button primary onPress={async () => {
            setLoading(true);
            await handleUpload(image);
            props.navigation.replace("Home");
          }}>
            <Body>
              <Text style={{color: "white"}}>Upload</Text>
            </Body>
          </Button>
          <Button danger onPress={clearForms}>
            <Body>
              <Text style={{color: "white"}}>Delete</Text>
            </Body>
          </Button>
        </Form>
        }
        {image &&
      <Item>
        <Body>
          <Text style={{fontWeight: "bold", fontSize: 30,}}>Selected image</Text>
          <Image source={{uri: image}} style={styles.image}/>
        </Body>
      </Item>
      }

      </Form>
      ):(<ActivityIndicator size="large" color="#0000ff" />)}

    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
  },
});

export default Upload;
