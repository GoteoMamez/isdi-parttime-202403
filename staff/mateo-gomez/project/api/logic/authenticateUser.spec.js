import 'dotenv/config'
import mongoose from 'mongoose'

import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { expect } from 'chai';


import authenticateUser from './authenticateUser.js'
import { CredentialsError, ContentError } from '../../com/errors.js';

const { MONGODB_URL_TEST } = process.env

describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    const { MONGODB_URL_TEST } = process.env


    it('succeds on existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book', username: 'macbook', password: hash }))
            .then(() => authenticateUser('macbook', '123123123'))
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)

            })
    )

    it('fails on non-existing user', () =>
        authenticateUser('otrouser', '123123123')
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('User not found')
            })
    )

    it('fails on existing user by wrong password', () =>
        bcrypt.hash('123123123__', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book', username: 'macbook', password: hash }))
            .then(() => authenticateUser('macbook', '123123123'))
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')
            })
    )

    it('fails on invalid username', () => {
        let errorThrown

        try {
            authenticateUser(1234567890, '123123123')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('username is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown

        try {
            authenticateUser('doncic', 123123123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
