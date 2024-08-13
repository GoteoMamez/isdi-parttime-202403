import Text from "../../../../components/core/Text"
import Image from "../../../../components/core/Image"

import logic from "../../../logic/index"

import './Post.css'

function Post({ post }) {
    console.log('Post -> render')
    console.log(post)


    return <article className="Post">
        <Text className='AuthorTitle'>{post.author.username}</Text>
        <Image className='PostImage' src={post.image}></Image>
        <Text className='PostCity'>{post.city}</Text>
        <Text className='PostAge'>{post.age}</Text>
        <Text className='PostDescription'>{post.description}</Text>

    </article>
}

export default Post