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
  const url = `${apiEndpoint}/20dee540e8ca121468c82f2e89d465ae/WF/node-1636353958122/wbChannel`;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getGroupAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}/33ba8a3f83ad0de0cd377c66e9be50c3/WF/node-1636354232192/wbGroup`;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getAgentNameAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}/287037521ffdf94d3969871ed0b25155/WF/node-1636354144937/wbAgent`;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getRatingAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}/41e7fe813e60c98cd72a3519dd3665c6/WF/node-1635076666221/getRating`;
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
}

export const getUserAPI = (payload, callback, errorCallback) => {
  const url = `${apiEndpoint}/80f80c2c719f33ec0ce0faade2c3dc22/WF/node-1636353156424/wbRating`; 
  
  const body = JSON.stringify(payload);
  getData(url, body, callback, errorCallback);
  console.log(body);
}

