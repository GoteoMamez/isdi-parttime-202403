import UserProfileImage from "../../../../components/core/UserProfileImage"

const UserProfile = ({ user }) => (
    <div className="UserProfile">
        <UserProfileImage imageUrl={user.profileImage}></UserProfileImage>
    </div>
)