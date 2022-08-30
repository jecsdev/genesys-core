import axios from "axios";

const API_URL = "/auth";

const signUp = (email, password) => {
    return axios
    .post(API_URL, "/signup", {
        email,
        password
    })
    .then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
}

const logIn = (email, password) => {
    return axios
    .post(API_URL + "/login", {
        email,
        password
    })
    .then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    })
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