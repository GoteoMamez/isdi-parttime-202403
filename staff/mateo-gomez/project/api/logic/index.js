import authenticateUser from "./authenticateUser.js";
import registerUser from "./registerUser.js";
import getUserName from "./getUserName.js";
import createGuestPost from "./createGuestPost.js";
import createHostPost from "./createHostPost.js";
import getHostPosts from "./getHostPosts.js";
import getGuestPosts from "./getGuestPosts.js";
import deleteHostPost from "./deleteHostPost.js";
import deleteGuestPost from "./deleteGuestPost.js";
import getUserProfile from "./getUserProfile.js";
import updateUserProfile from "./updateUserProfile.js";

const logic = {
    authenticateUser,
    registerUser,
    getUserName,
    createGuestPost,
    createHostPost,
    getHostPosts,
    getGuestPosts,
    deleteHostPost,
    deleteGuestPost,

    getUserProfile,
    updateUserProfile
}

export default logic