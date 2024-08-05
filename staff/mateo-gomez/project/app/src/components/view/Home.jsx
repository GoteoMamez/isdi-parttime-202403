import { useState } from "react"
import View from "../../../components/library/View"
import Heading from "../../../components/core/Heading"
import Header from "./components/Header"


function Home({ }) {
    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')

    return <View>
        <Header>
            <Heading className='ConnecttooTitle' level='2'>Connecttoo</Heading>
        </Header>
    </View>
}

export default Home