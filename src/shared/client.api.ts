import axios, { AxiosError } from "axios";
import { Alert } from "react-native";

const ClientApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 15000,
});

/* =======================
   Request interceptor
   ======================= */
ClientApi.interceptors.request.use(
  (config) => {
    // DEV LOG
    console.log(
      `[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
      config.params ?? config.data ?? ""
    );

    return config;
  },
  (error) => {
    console.log("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

/* =======================
   Response interceptor
   ======================= */
ClientApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // DEV LOG
    console.log("[API RESPONSE ERROR]", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    // USER MESSAGE
    if (!error.response) {
      Alert.alert(
        "Network error",
        "Please check your internet connection and try again."
      );
    } else if (error.response.status >= 500) {
      Alert.alert(
        "Server error",
        "Something went wrong on our side. Please try again later."
      );
    } else {
      Alert.alert(
        "Request error",
        "Unable to complete the request."
      );
    }

    return Promise.reject(error);
  }
);

export default ClientApi;
