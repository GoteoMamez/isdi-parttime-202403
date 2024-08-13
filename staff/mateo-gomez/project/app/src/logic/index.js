import registerUser from "./registerUser";
import isUserLoggedIn from "./isUserLoggedIn";
import loginUser from "./loginUser";
import getUserName from "./getUserName";
import logoutUser from "./logoutUser";
import createGuestPost from "./createGuestPost";
import createHostPost from "./createHostPost";
import getHostPost from "./getHostPosts";
import getGuestPost from "./getGuestPosts";
import getUserId from "./getUserId";

const logic = {
    registerUser,
    isUserLoggedIn,
    loginUser,
    getUserName,
    logoutUser,
    createGuestPost,
    createHostPost,
    getHostPost,
    getGuestPost,
    getUserId
}

export default logic