import axios from "axios";

const API_URL = "https://localhost:7244/api/login/authorize/authenticate";

const signUp = async (userName, password) => {
    const response = await axios
        .post(API_URL, "/signup", {
            userName,
            password
        });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

const logIn = async (userName, password) => {
    const response = await axios
        .post(API_URL, {
            userName,
            password
        });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    console.log(response);
    return response.data;
}

const logOut = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
    signUp,
    logIn,
    logOut,
    getCurrentUser
}

export default AuthService;