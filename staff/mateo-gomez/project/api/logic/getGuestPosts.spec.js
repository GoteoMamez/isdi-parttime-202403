import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User, GuestPost } from '../models/index.js'

import getGuestPosts from './getGuestPosts.js'

import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('getAllPosts', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany().then(() => GuestPost.deleteMany()))
    )

    beforeEach(() => Promise.all([User.deleteMany(), GuestPost.deleteMany()]))

    it('succeeds on get guest posts', () => {
        return bcrypt.hash('123123123', 8)
            .then((hash) => User.create({
                name: 'Mac',
                surname: 'Book',
                email: 'mac@book',
                username: 'macbook',
                password: hash
            }))
            .then((user) => GuestPost.create({
                author: user.id,
                image: "https://uvn-brightspot.s3.amazonaws.com/assets/vixes/btg/bodyart.batanga.com/files/tatuajes-en-la-espalda-para-hombres-4_0.jpg",
                fromLocation: "Sevilla",
                toLocation: "Madrid",
                date: "26 de agosto",
                description: "klklklklk"
            })
                .then(() => user)
            )
            .then(user => getGuestPosts(user.id, 1, 2))
            .then(posts => {
                expect(posts).that.be.an('array')
                expect(posts).to.have.lengthOf(1)
            })

    })

    it('fails on non-existing user', () => {
        let errorThrown

        return getGuestPosts(new ObjectId().toString(), 1, 2)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })

    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getGuestPosts(7777, 1, 2)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })




    after(() => User.deleteMany().then(() => GuestPost.deleteMany()).then(() => mongoose.disconnect()))

})