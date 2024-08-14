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
        <div className="CityAgePost">
            <Text className='PostCity'><b>City: </b>&nbsp;{post.city}</Text>
            <Text className='PostAge'><b>Age: </b>&nbsp;{post.age}</Text>
        </div>
        <Text className='PostOffer'><b>Offer:</b>&nbsp;{post.offer}</Text>
        <Text className='PostDescription'><b>Description:</b>&nbsp;{post.description}</Text>

    </article>
}

export default Post