import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User, HostPost } from '../models/index.js'

import getHostPosts from './getHostPosts.js'

import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('getAllPosts', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany().then(() => HostPost.deleteMany()))
    )

    beforeEach(() => Promise.all([User.deleteMany(), HostPost.deleteMany()]))

    it('succeeds on get host posts', () => {
        return bcrypt.hash('123123123', 8)
            .then((hash) => User.create({
                name: 'Mac',
                surname: 'Book',
                email: 'mac@book',
                username: 'macbook',
                password: hash
            }))
            .then((user) => HostPost.create({
                author: user.id,
                image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                city: "from",
                offer: "Sofá",
                age: "27",
                description: "hello description"
            })
                .then(() => user)
            )
            .then(user => getHostPosts(user.id, 1, 2))
            .then(posts => {
                expect(posts).that.be.an('array')
                expect(posts).to.have.lengthOf(1)
            })

    })

    it('fails on non-existing user', () => {
        let errorThrown

        return getHostPosts(new ObjectId().toString(), 1, 2)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })

    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getHostPosts(7777, 1, 2)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })




    after(() => User.deleteMany().then(() => HostPost.deleteMany()).then(() => mongoose.disconnect()))

})