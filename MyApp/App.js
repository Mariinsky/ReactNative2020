import React from "react";
import { View } from "react-native";
import List from "./components/List";
import {MediaProvider} from './contexts/MediaContext'



const App = () => {
  return (
    <View style={{paddingTop: 30}}>
      <MediaProvider>
          <List/>
      </MediaProvider>
    </View>
  );
};

export default App;
