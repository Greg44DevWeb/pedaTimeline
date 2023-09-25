import axios from "axios";

const apiCall = () => {
  axios.create({
    baseURL: "http://localhost:8080",
  });
};
export default apiCall;
