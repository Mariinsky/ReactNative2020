import {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const fetchGET = async (endpoint = '', params = '', token = '') => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  const response = await fetch(apiUrl + endpoint + '/' + params,
      fetchOptions);
  if (!response.ok) {
    throw new Error('fetchGET error: ' + response.status);
  }
  return await response.json();
};

const fetchPOST = async (endpoint = '', data = {}, token = '') => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };
  console.log(apiUrl + endpoint)
  const response = await fetch(apiUrl + endpoint, fetchOptions);
  const json = await response.json();
  console.log(response);
  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error('fetchPOST error: ' + response.status);
  }
  return json;
};


const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMedia = async () => {
    try {
      const json = await fetchGET('media/all');
      const result = await Promise.all(json.files.map(async (item) => {
        return await fetchGET('media', item.file_id);
      }));
      setData(result);
      setLoading(false);
    } catch (e) {
      console.log('getAllMedia error', e.message);
    }
  };
  useEffect(() => {
    fetchMedia();
  }, []);
  return [data, loading];
};

const uploadImage = async (data) => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await fetch ('http://media.mw.metropolia.fi/wbma/media', {
    method: "POST",
    body: data,
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": token,
    },
  });
  return response.json();
};

export {getAllMedia, fetchGET, fetchPOST, uploadImage};
