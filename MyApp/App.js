import React from "react";
import Navigator from './navigators/Navigator'
import {MediaProvider} from './contexts/MediaContext'

const App = () => {
  return (
    <MediaProvider>
        <Navigator />
    </MediaProvider>

  );
};

export default App;
