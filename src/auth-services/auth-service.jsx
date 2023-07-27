import axios from "axios";
import Cookies from "js-cookie"; 

const API_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:44380/api/login/authorize/authenticate"
    : "https://10.0.0.3:44380/api/login/authorize/authenticate";

const user = "user";
const signUp = async (userName, password) => {
  const response = await axios.post(API_URL, "/signup", {
    userName,
    password
  });
  if (response.data.accessToken) {
    Cookies.set(user, JSON.stringify(response.data));
  }
  return response.data;
};

const logIn = async (userName, password) => {
  const response = await axios.post(API_URL, {
    userName,
    password
  });
  if (response.data.accessToken) {
    Cookies.set(user, JSON.stringify(response.data));
  }
  console.log(response);
  return response.data;
};

const logOut = () => {
  Cookies.remove(user);
};

const getCurrentUser = () => {
  const userCookie = Cookies.get(user);
  return userCookie ? JSON.parse(userCookie) : null;
};

const AuthService = {
  signUp,
  logIn,
  logOut,
  getCurrentUser
};

export default AuthService;
