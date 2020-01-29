import React, { useState, useEffect } from 'react';
import Navigator from './navigators/Navigator'
import {MediaProvider} from './contexts/MediaContext'
import * as Expo from "expo";
import * as Font from 'expo-font';
import { Root } from 'native-base'


const App = () => {
  const [fontReady, setFontReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    setFontReady(true);
  }
  useEffect(() => {
   loadFonts();
  }, []);

  if (!fontReady) {
    console.log('Waiting for fonts...');
    return (
      <Expo.AppLoading />
    );
  }
  return (
    <Root>
     <MediaProvider>
        <Navigator />
    </MediaProvider>
    </Root>

  );
};

export default App;
