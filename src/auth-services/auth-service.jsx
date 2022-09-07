import axios from "axios";

const API_URL = "https://localhost:7244/api/JwtToken";

const signUp = (userName, password) => {
    return axios
    .post(API_URL, "/signup", {
        userName,
        password
    })
    .then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
}

const logIn = (userName, password) => {
    return axios
    .post(API_URL, {
        userName,
        password
    })
    .then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response);
        
        return response.data;
    });
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