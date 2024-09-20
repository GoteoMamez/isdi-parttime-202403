import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { User } from '../models/index.js'
import updateUserProfile from './updateUserProfile.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { ObjectId } = Types


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


    it('fails on invalid userId', () => {
        let errorThrown

        try {
            updateUserProfile(7777, 1, 2)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return updateUserProfile(new ObjectId().toString(), 1)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })

    })


    it('fails on invalid name', () => {
        const validUserId = '60b8d295f1f9c7aef0cf39f1'
        try {
            updateUserProfile(validUserId, { name: '123' })
        } catch (error) {
            expect(error.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid surname', () => {
        const validUserId = '60b8d295f1f9c7aef0cf39f1'
        try {
            updateUserProfile(validUserId, { surname: '123' })
        } catch (error) {
            expect(error.message).to.equal('surname is not valid')
        }
    })


    it('fails on invalid username', () => {
        const validUserId = '60b8d295f1f9c7aef0cf39f1'
        try {
            updateUserProfile(validUserId, { username: '@@invalid@@' })
        } catch (error) {
            expect(error.message).to.equal('username is not valid')
        }
    })


    it('fails on invalid profileImage', () => {
        const validUserId = '60b8d295f1f9c7aef0cf39f1'
        try {
            updateUserProfile(validUserId, { profileImage: 'invalid_url' })
        } catch (error) {
            expect(error.message).to.equal('profileImage is not valid')
        }
    })


    it('fails on invalid description', () => {
        const validUserId = '60b8d295f1f9c7aef0cf39f1'
        try {
            updateUserProfile(validUserId, { description: '' })
        } catch (error) {
            expect(error.message).to.equal('description is not valid')
        }
    })




    it('succeeds on updating profileImage', () => {
        let userId;

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
                userId = user.id;

                return updateUserProfile(userId, { profileImage: 'https://example.com/new-profile.png' });
            })
            .then(updatedUser => {
                expect(updatedUser.profileImage).to.equal('https://example.com/new-profile.png');
            });
    });

    it('succeeds on updating description', () => {
        let userId;

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
                userId = user.id;

                return updateUserProfile(userId, { description: 'Updated description' });
            })
            .then(updatedUser => {
                expect(updatedUser.description).to.equal('Updated description');
            });
    });

    after(() => User.deleteMany().then(() => mongoose.disconnect()));

})