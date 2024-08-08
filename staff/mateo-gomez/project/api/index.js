import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { registerUserHandler, authenticateUserHandler, getUserNameHandler } from './handlers/index.js'
import createGuestPostHandler from './handlers/createGuestPostHandler.js'


const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.get('/', (req, res) => res.send('Hello World!'))

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:userId', jsonBodyParser, getUserNameHandler)

        api.post('/posts/guest', jsonBodyParser, createGuestPostHandler)

        api.listen(PORT, () => console.log(`API running on port ${PORT}`));


    })

    .catch(error => console.error(error))