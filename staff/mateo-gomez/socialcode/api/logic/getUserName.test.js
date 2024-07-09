import 'dotenv/config'
import { MongoClient } from 'mongodb'
import data from '../data/index.js'

import logic from './index.js'

const { MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db('test')

        const users = db.collection('users')

        data.users = users

        try {
            logic.getUserName('doncic', 'lebronJames2024', (error, name) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user name retrieved', name)

            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))