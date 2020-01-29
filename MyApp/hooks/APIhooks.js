import { useState, useEffect } from "react";
const apiUrl = "http://media.mw.metropolia.fi/wbma/";

const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUrl = async () => {
    try {
    const response = await fetch(apiUrl + "media");
    const json = await response.json();
    const result = await Promise.all(
      json.map(async item => {
        const response = await fetch(apiUrl + "media/" + item.file_id);
        return await response.json();
      })
    );
    setData(result);
    setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
};

const login = async (url,inputs) => {
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(inputs)
    })
    const user = response.json();
    return user;
  } catch (e) {
    console.log('erroor', e.message)
  }
}

const getProfilePic = async ({user}) => {
  try {
    const response = await fetch(apiUrl + 'tags/avatar_' + user.user_id);
    return response.json();
  } catch (e) {
     console.log(e.message)
  }
}

export { getAllMedia, login, getProfilePic };
