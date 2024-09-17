/** @type {import('tailwindcss').Config} */
import buttonStyle from './tailwind-plugin/tailwind.button.plugin'
import fieldStyle from './tailwind-plugin/tailwind.field.plugin'
import headingStyle from './tailwind-plugin/tailwind.heading.plugin'
import inputStyle from './tailwind-plugin/tailwing.input.plugin'
import labelStyle from './tailwind-plugin/tailwind.label.plugin'
import profileLinkStyle from './tailwind-plugin/tailwind.profileLink.plugin'
import titleStyle from './tailwind-plugin/tailwind.title.plugin'
import profileImageStyle from './tailwind-plugin/tailwind.profileImage.plugin'
import viewStyle from './tailwind-plugin/tailwind.view.plugin'
import confirmDeleteStyle from './tailwind-plugin/tailwind.confirmDelete.plugin'
import createPostFormStyle from './tailwind-plugin/tailwind.createPostForm.plugin'
import footerStyle from './tailwind-plugin/tailwind.footer.plugin'
import guestPostList from './tailwind-plugin/tailwind.guestPostList.plugin'
import headerStyle from './tailwind-plugin/tailwind.header.plugin'
import hostPostList from './tailwind-plugin/tailwind.hostPostList.plugin'
import locationsFilter from './tailwind-plugin/tailwind.locationFilter.plugin'
import postStyle from './tailwind-plugin/tailwind.post.plugin'
import PostListBoardSelection from './tailwind-plugin/tailwind.postListBoardSelection.plugin'
import updateUserProfileStyle from './tailwind-plugin/tailwind.updateUserProfileForm.plugin'
import userProfileStyle from './tailwind-plugin/tailwind.userProfile.plugin'
import postTypeSelection from './tailwind-plugin/tailwind.postTypeSelection.plugin'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  /*theme: {
    extend: {
      fontFamily: {
        langar: ['Langar', 'system-ui'],
      },
    },
  },*/
  plugins: [
    buttonStyle,
    fieldStyle,
    headingStyle,
    inputStyle,
    labelStyle,
    profileLinkStyle,
    titleStyle,
    profileImageStyle,
    viewStyle,
    confirmDeleteStyle,
    createPostFormStyle,
    footerStyle,
    guestPostList,
    headerStyle,
    hostPostList,
    locationsFilter,
    postStyle,
    PostListBoardSelection,
    updateUserProfileStyle,
    userProfileStyle,
    postTypeSelection],
}