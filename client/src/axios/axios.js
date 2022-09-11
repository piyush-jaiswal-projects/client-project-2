import axios from "axios";

const axiosConfig = () => {
  const axiosInstance = axios.create({
    baseURL: "http://137.184.215.16:8000/api/v1.0",
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "multipart/form-data";
    
return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      const transformedResponse =
        response && response.data
          ? { ...response.data, statusCode: response.status }
          : {
              message: "Success",
              statusCode: response.status,
            };
      if (transformedResponse.message === "Invalid Authorization") {
        if (localStorage.hasOwnProperty("current_user")) {
          localStorage.removeItem("current_user");
          window.location.href = "/";
        }
      }
      
return transformedResponse;
    },
    (error) => {
      if (
        error.response.data.message === "Invalid Authorization" &&
        error.response.data.statusCode === 401
      ) {
        if (localStorage.hasOwnProperty("current_user")) {
          localStorage.removeItem("current_user");
        }
        window.location.href = "/";
      }
      
return error.response
        ? error.response.data
          ? { ...error.response.data, statusCode: error.response.status }
          : {
              message: error.message,
              statusCode: error.response.status,
            }
        : Promise.reject(error.message);
    }
  );
  
return axiosInstance;
};

export const axiosHelper = axiosConfig();
