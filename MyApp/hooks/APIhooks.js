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
  const response = await fetch(apiUrl + endpoint, fetchOptions);
  const json = await response.json();
  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error('fetchPOST error: ' + response.status);
  }
  return json;
};

const fetchDELETE = async (endpoint = '', params = '', token = '') => {
  console.log('delete: ',apiUrl + endpoint + '/' + params);
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  };
   const response = await fetch(apiUrl + endpoint + '/' + params,
      fetchOptions);
  if (!response.ok) {
    throw new Error('fetchGET error: ' + response.status);
  }
  console.log('delete response: ', await response.json() )
  return await response.json();
};

const isLiked = async(file_id) => {
  try {
  const arr = await fetchGET('favourites/file', file_id);
  const userFromStorage = await AsyncStorage.getItem('user');
  const user = JSON.parse(userFromStorage);
  return arr.find(it => it.user_id === user.user_id)
  } catch (e) {
    console.log(e.message)
  }
}

const postFavourite = async (file_id) => {
  const token =  await AsyncStorage.getItem('userToken')
  if(await isLiked(file_id) === undefined) {
    try {
      await fetchPOST('favourites', {file_id:file_id},token);
    } catch (e) {
      console.log(e.message);
    }
  } else {
    try {
      await fetchDELETE('favourites/file', file_id, token);
    } catch (e) {
      console.log(e.message)
    }
  }

}
const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMedia = async () => {
    try {
      const json = await fetchGET('media/all');
      // slice for only last 20
      const result = await Promise.all(json.files.reverse().slice(0, 20).map(async (item) => {
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
  try {
  const response = await fetch ('http://media.mw.metropolia.fi/wbma/media', {
    method: "POST",
    body: data,
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": token,
    },
  });
  } catch (e) {
    console.log('upload image error: ', e.message);
  }

};

export {getAllMedia, fetchGET, fetchPOST, uploadImage, postFavourite, isLiked};
