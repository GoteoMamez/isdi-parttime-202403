import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { User } from '../models/index.js'
import updateSocialLinks from './updateSocialLinks.js'
import { ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('updateSocialLinks', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating valid social links', () => {

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

                return updateSocialLinks(userId, {
                    twitter: "https://x.com/KDTrey5",
                    instagram: "https://www.instagram.com/durant/",
                    facebook: "https://facebook.com/validuser",
                    youtube: "https://www.youtube.com/@lukadoncic6206"
                })
            })
            .then(updatedUser => {
                expect(updatedUser.socialLinks.twitter).to.equal("https://x.com/KDTrey5")
                expect(updatedUser.socialLinks.instagram).to.equal("https://www.instagram.com/durant/")
                expect(updatedUser.socialLinks.facebook).to.equal("https://facebook.com/validuser")
                expect(updatedUser.socialLinks.youtube).to.equal("https://www.youtube.com/@lukadoncic6206")

                expect(Object.keys(updatedUser.socialLinks)).to.have.lengthOf(4)
            })
    })

    it("fails on invalid Twitter URL", () => {
        let errorThrown
        try {
            validateTwitterLink('invalid-url')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("twitterUrl is not valid")
        }
    })

    it("fails on invalid Instagram URL", () => {
        let errorThrown
        try {
            validateInstagramLink('invalid-url')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("instagramUrl is not valid")
        }
    })


    it("fails on invalid Facebook URL", () => {
        let errorThrown
        try {
            validateFacebookLink('invalid-url')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("facebookUrl is not valid")
        }
    })

    it("fails on invalid YouTube URL", () => {
        let errorThrown
        try {
            validateYoutubeLink('invalid-url')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("youtubeUrl is not valid")
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()));
})