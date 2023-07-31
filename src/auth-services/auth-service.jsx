import axios from "axios";
import Cookies from "js-cookie"; 
import UrlRoutes from "../api/UrlRoutes";
const user = "user";

//handle the user creation if does not exists
const signUp = async (userName, password) => {
  const response = await axios.post(UrlRoutes.signUpUser(), "/signup", {
    userName,
    password
  });
  if (response.data.accessToken) {
    Cookies.set(user, JSON.stringify(response.data));
  }
  return response.data;
};

//handle user login
const logIn = async (userName, password) => {
  try{
    const response = await axios.post(UrlRoutes.authenticateUser(), {
      userName,
      password
    });
    if (response.data.accessToken) {
      Cookies.set(user, JSON.stringify(response.data));
    }
    console.log(response);
    return response.data;
  }catch(error){
    console.error(error);
    throw error;
  }
 
};

//logout user
const logOut = () => {
  Cookies.remove(user);
};

//get user cookie if exists
const getCurrentUser = () => {
  const userCookie = Cookies.get(user);
  return userCookie !== undefined && userCookie !== null ? JSON.parse(userCookie) : null;
}
//handle authentication methods for authentication
const AuthService = {
  signUp,
  logIn,
  logOut,
  getCurrentUser
};

export default AuthService;
