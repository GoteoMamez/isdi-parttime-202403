const data = {}

data.findUser = (callback) => {
    let userJson = localStorage.users

    if (!userJson) userJson = '[]'

    const users = JSON.parse(userJson)

    const user = users.find(callback)

    return user
}


data.insertUser = (user) => {
    let userJson = localStorage.users //-->Extraer info --> const userJson = localStorage.getItem('users)

    if (!userJson) userJson = '[]'

    const users = JSON.parse(userJson)

    users.push(user)

    userJson = JSON.stringify(users)

    localStorage.users = userJson

}

data.findPosts = callback => {
    const postsJson = localStorage.posts

    if (!postsJson) postsJson = '[]'

    const posts = JSON.parse(postsJson)

    const filtered = posts.filter(callback)

    return filtered
    // localStorage.posts = postsJson
}

data.insertPost = (post) => {
    let postJson = localStorage.posts //-->Extraer info --> const postJson = localStorage.getItem('posts)

    if (!postJson) postJson = '[]'

    const posts = JSON.parse(postJson)

    posts.push(post)

    postJson = JSON.stringify(posts)

    localStorage.posts = postJson

}