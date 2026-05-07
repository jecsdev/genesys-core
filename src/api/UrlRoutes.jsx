/**This class contains the URL routes for the whole project**/

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:44312/api';

const authorizeUser = () => {
    return mainUrl + "login/authorize";
}

const authenticateUser = () => {
    return authorizeUser() + "/authenticate";
}

const signUpUser = () => {
    return authenticateUser() + "/signUp";
}

const UrlRoutes = {
    authorizeUser,
    authenticateUser,
    signUpUser
}

export default UrlRoutes;