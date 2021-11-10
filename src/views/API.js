// import axios from "axios";


// const apiEndpoint = `${process.env.REACT_APP_REACT_APP_BASE_URL}/dolphin/apiv1/graph/workflow`;
// const channelApi = `${process.env.REACT_APP_WB_GET_CHANNEL_NAME}`;
// const groupApi = `${process.env.REACT_APP_WB_GET_GROUP}`;
// const agentNameApi = `${process.env.REACT_APP_WB_GET_AGENT}`;
// const ratingApi = `${process.env.REACT_APP_WB_GET_RATING}`;
// const userApi = `${process.env.REACT_APP_WB_GET_USER}`;


// const headers = {
//   "Content-Type": "application/json",
// };

// const getData = async (url, body, callback, errorCallback) => {
//   try {
//     const response = await axios.post(url, body, headers);
//     callback(response.data);
//   } catch (error) {
//     errorCallback(error);
//   }
  
// };


// export const getChannelNameAPI = (payload, callback, errorCallback) => {
//   const url = `${apiEndpoint}${channelApi}`;
//   const body = JSON.stringify(payload);
//   getData(url, body, callback, errorCallback);
//   console.log("testttttt"+ ` ${channelApi}`)
// }

// export const getGroupAPI = (payload, callback, errorCallback) => {
//   const url = `${apiEndpoint}${groupApi}`;
//   const body = JSON.stringify(payload);
//   getData(url, body, callback, errorCallback);
// }

// export const getAgentNameAPI = (payload, callback, errorCallback) => {
//   const url = `${apiEndpoint}${agentNameApi}`;
//   const body = JSON.stringify(payload);
//   getData(url, body, callback, errorCallback);
// }

// export const getRatingAPI = (payload, callback, errorCallback) => {
//   const url = `${apiEndpoint}${ratingApi}`;
//   const body = JSON.stringify(payload);
//   getData(url, body, callback, errorCallback);
// }

// export const getUserAPI = (payload, callback, errorCallback) => {
//   const url = `${apiEndpoint}`+`${userApi}`; 
  
//   const body = JSON.stringify(payload);
//   getData(url, body, callback, errorCallback);
//   console.log(body);
// }

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


export const getChannelNameAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_CHANNEL_NAME;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getGroupAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_GROUP;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getAgentNameAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_AGENT_NAME;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getRatingAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_GET_RATING;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getUserAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}`+process.env.REACT_APP_WB_GET_USER;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

