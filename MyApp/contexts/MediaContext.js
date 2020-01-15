import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAllMedia } from "../hooks/APIhooks";

const MediaContext = React.createContext([{}, () => {}]);

const MediaProvider = props => {
  const [media, setMedia] = useState();
  const [data, loading] = getAllMedia();

  useEffect(() => {
    setMedia(data);
  }, [loading]);

  return (
    <MediaContext.Provider value={[media, setMedia]}>
      {props.children}
    </MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  children: PropTypes.node
};

export { MediaContext, MediaProvider };
