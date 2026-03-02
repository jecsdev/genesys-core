/**This class contains the URL routes for the whole project**/

const mainUrl = "https://localhost:44312/api/";

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