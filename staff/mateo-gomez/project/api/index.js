import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import registerUserHandler from './handlers/registerUserHandler.js'


const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.get('/', (req, res) => res.send('Hello World!'))

        api.post('users', jsonBodyParser, registerUserHandler)


    })

    .catch(error => console.error(error))