import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import { User } from "../models/index.js"

import registerUser from "./registerUser.js"
import { ContentError, DuplicityError, MatchError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env


describe("registerUser", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it("succeeds on new user", () =>
        registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 'klklklktest', [], {})
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal("Mocha")
                expect(user.surname).to.equal("Chai")
                expect(user.email).to.equal("Mocha@Chai.com")
                expect(user.username).to.equal("MochaChai")
                expect(user.profileImage).to.equal("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
                expect(user.description).to.equal('klklklktest')
                expect(user.galleryImages).to.be.an('array')
                expect(user.socialLinks).to.be.an('object')

                return bcrypt.compare("123123123", user.password)
            })
            .then((match) => expect(match).to.be.true)
    )


    it("fails on existing user", () => {
        let errorThrown

        return bcrypt.hash("123123123", 8)
            .then(hash => User.create({ name: "Mocha", surname: "Chai", email: "Mocha@Chai.com", username: "MochaChai", password: hash, profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", description: 'klklklktest', galleryImages: [], socialLinks: {} }))
            .then(() => registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 'klklklktest', [], {}))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal("username already exists")
            })
    })

    it("fails on invalid name", () => {
        let errorThrown
        try {
            registerUser(123123123, "Chai", "Mocha@Chai.com", "MochaChai", "123123123", "123123123")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("name is not valid")
        }
    })

    it("fails on invalid surname", () => {
        let errorThrown
        try {
            registerUser("Mocha", 123123123, "Mocha@Chai.com", "MochaChai", "123123123", "123123123")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("surname is not valid")
        }
    })

    it("fails on invalid email", () => {
        let errorThrown
        try {

            registerUser("Mocha", "Chai", "MochaChai", "invalid-email", "123123123", "123123123")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("email is not valid")
        }
    })

    it("fails on invalid username", () => {
        let errorThrown
        try {
            registerUser("Mocha", "Chai", "Mocha@Chai.com", 123123123, "123123123", "123123123")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("username is not valid")
        }
    })

    it("fails on non-matching password repeat", () => {
        let errorThrown
        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "differentPassword")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal("passwords don't match")
        }
    })
    it("fails on non-matching password repeat", () => {
        let errorThrown
        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "6666");
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal("passwords don\'t match")
        }
    })

    it('fails on invalid profile image', () => {
        let errorThrown

        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", 111111)

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('profileImage is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown

        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 1111)

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    it('fails on invalid galleryImages', () => {
        let errorThrown

        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", "testing description", 1111)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('galleryImages is not valid')
        }
    })


    it('fails on invalid socialLinks', () => {
        let errorThrown

        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", "testing description", [], 1111)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('socialLinks is not valid')
        }
    })

    it('fails on invalid Twitter URL in socialLinks', () => {
        let errorThrown

        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 'testing description', [], { twitter: 'invalid-twitter-url' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('twitter is not valid')
        }
    })

    it('fails on invalid Instagram URL in socialLinks', () => {
        let errorThrown

        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 'testing description', [], { instagram: 'invalid-instagram-url' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('instagram is not valid')
        }
    })

    it('fails on invalid Facebook URL in socialLinks', () => {
        let errorThrown

        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 'testing description', [], { facebook: 'invalid-facebook-url' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('facebook is not valid')
        }
    })

    it('fails on invalid YouTube URL in socialLinks', () => {
        let errorThrown

        try {
            registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 'testing description', [], { youtube: 'invalid-youtube-url' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('youtube is not valid')
        }
    })

    it('succeeds on valid socialLinks', () => {
        return registerUser("Mocha", "Chai", "MochaChai", "Mocha@Chai.com", "123123123", "123123123", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 'testing description', [], {
            twitter: 'https://twitter.com/validuser',
            instagram: 'https://instagram.com/validuser',
            facebook: 'https://facebook.com/validuser',
            youtube: 'https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw'
        })
            .then(() => User.findOne())
            .then(user => {
                expect(user.socialLinks.twitter).to.equal('https://twitter.com/validuser')
                expect(user.socialLinks.instagram).to.equal('https://instagram.com/validuser')
                expect(user.socialLinks.facebook).to.equal('https://facebook.com/validuser')
                expect(user.socialLinks.youtube).to.equal('https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw')
            })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})