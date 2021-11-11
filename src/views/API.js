import axios from "axios";


const apiEndpoint = `${process.env.REACT_APP_BASE_URL}/dolphin/apiv1/graph/workflow`;



const headers = {
  "Content-Type": "application/json",
};

const getData = async (url, body, callback, errorCallback) => {
  try {
    const response = await axios.post(url, body, headers);
    callback(response.data);
  } catch (error) {
    errorCallback(error);
  }
};


export const getListChannelNameAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_CHANNEL_NAME;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getListGroupNameAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_GROUP;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getListAgentNameAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_AGENT_NAME;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getListRatingAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_AGENT_NAME;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getListUserAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_USER;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

