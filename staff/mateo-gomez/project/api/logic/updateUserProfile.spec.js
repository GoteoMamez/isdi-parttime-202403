import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { User } from '../models/index.js'
import updateUserProfile from './updateUserProfile.js'
import { ContentError, MatchError } from 'com/errors.js'


const { MONGODB_URL_TEST } = process.env

describe('updateGalleryImages', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())


    it('succeeds on updating profile images', () => {
        let userId

        return bcrypt.hash('123123123', 8)
            .then(hash =>
                User.create({
                    name: 'Mac',
                    surname: 'Book',
                    email: 'mac@book.com',
                    username: 'macbook',
                    password: hash,
                    profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                    description: 'klklklktest',
                    galleryImages: [],
                    socialLinks: {}
                })
            )
            .then(user => {
                userId = user.id

                return updateUserProfile(userId, {
                    name: 'Kobe',
                    surname: 'Bryant'
                })
            })
            .then(updatedUser => {
                expect(updatedUser.name).to.equal('Kobe')
                expect(updatedUser.surname).to.equal('Bryant')
            })
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()));

})