import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User } from '../models/index.js'
import getUserProfile from './getUserProfile.js'


import { NotFoundError, ContentError } from 'com/errors.js'


const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('getUserProfile', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany())
    )

    beforeEach(() => User.deleteMany())

    it('succeeds in retrieving a user profile', () => {
        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({
                name: 'Mocha',
                surname: 'Chai',
                email: 'mocha@chai.com',
                username: 'MochaChai',
                password: hash
            }))
            .then(user =>
                getUserProfile(user.id, user.id)
                    .then(profile => {
                        expect(profile).to.be.an('object')
                        expect(profile).to.have.property('username', 'MochaChai')
                        expect(profile).to.not.have.property('email')
                    })
            )
    })

    it('fails on non-existing user', () => {
        let errorThrown
        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({
                name: "Mocha",
                surname: "Chai",
                email: "Mocha@Chai.com",
                username: "MochaChai",
                password: hash
            }))
            .then(targetUserId => getUserProfile(new ObjectId().toString(), targetUserId.id,))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown


        try {
            getUserProfile(111, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid requestingUserId', () => {
        let errorThrown


        try {
            getUserProfile(new ObjectId().toString(), 777)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('requestingUserId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})