import authenticateUser from "./authenticateUser.js";
import registerUser from "./registerUser.js";
import getUserName from "./getUserName.js";
import createGuestPost from "./createGuestPost.js";
import createHostPost from "./createHostPost.js";
import getHostPosts from "./getHostPosts.js";

const logic = {
    authenticateUser,
    registerUser,
    getUserName,
    createGuestPost,
    createHostPost,
    getHostPosts
}

export default logic