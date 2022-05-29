import axios from "axios";

const apiEndpoint = `https://www.googleapis.com/books/v1/volumes?q=`;


const getData = async (url, callback, errorCallback) => {
  try {
    const response = await axios.get(url);
    callback(response);
  } catch (error) {
    errorCallback(error);
  }
};

export const getBookData = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}` + payload;
  console.log(url);
  getData(url, callback, errorCallback);
};

