import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User, GuestPost } from '../models/index.js'

import deleteGuestPost from './deleteGuestPost.js'

import { NotFoundError, ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('deleteGuestPost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany().then(() => GuestPost.deleteMany()))
    )

    beforeEach(() => Promise.all([User.deleteMany(), GuestPost.deleteMany()]))


    it('succeeds on delete Guest Post', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book', username: 'macbook', password: hash }))
            .then(user => GuestPost.create({
                author: user.id,
                image: "https://uvn-brightspot.s3.amazonaws.com/assets/vixes/btg/bodyart.batanga.com/files/tatuajes-en-la-espalda-para-hombres-4_0.jpg",
                fromLocation: "Sevilla",
                toLocation: "Madrid",
                date: "26 de agosto",
                description: "klklklklk"
            })
                .then((post) => ({ user, post }))
            )
            .then(({ user, post }) =>
                deleteGuestPost(user.id, post.id)
            )
            .then(postId =>
                GuestPost.findById(postId).then(deletedPost => {
                    expect(deletedPost).to.be.null
                })
            )
    )
    it('fails on non existing', () => {
        let errorThrown

        return GuestPost.create({
            author: new ObjectId().toString(),
            image: "https://uvn-brightspot.s3.amazonaws.com/assets/vixes/btg/bodyart.batanga.com/files/tatuajes-en-la-espalda-para-hombres-4_0.jpg",
            fromLocation: "Sevilla",
            toLocation: "Madrid",
            date: "26 de agosto",
            description: "klklklklk"
        })
            .then((post) => deleteGuestPost(new ObjectId().toString(), post.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })

    })


    it('fails on non-existing post', () => {
        let errorThrown


        return bcrypt.hash('123123123', 8)
            .then((hash) => User.create({
                name: 'Mac',
                surname: 'Book',
                email: 'mac@book',
                username: 'macbook',
                password: hash
            })
                .then((user) => deleteGuestPost(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('post not found')
            })


    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deleteGuestPost(11111, "https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g", "27", "Oviedo", "Madrid", "Mavs is close to get in the NBA Finals", "27 de junio a 1 de julio")

        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })


    it('fails on invalid postId', () => {
        let errorThrown

        try {
            deleteGuestPost(new ObjectId().toString(), 11111)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('postId is not valid')
        }
    })
    it('fails on non-match user', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then(hash => {
                const user = new User({
                    name: "Mocha",
                    surname: "Chai",
                    email: "Mocha@Chai.com",
                    username: "MochaChai",
                    password: hash
                })
                const post = new GuestPost({
                    author: new ObjectId().toString(),
                    image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    fromLocation: "from",
                    toLocation: "to",
                    date: "26 de agosto",
                    description: "hello description"

                })

                return Promise.all([user.save(), post.save()])
                    .then(([savedUser, savedPost]) => {
                        return deleteGuestPost(savedUser.id.toString(), savedPost.id.toString())
                    })
                    .catch(error => errorThrown = error)
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(MatchError)
                expect(errorThrown.message).to.equal('post author does not match user')
            })
    })



    after(() => GuestPost.deleteMany().then(() => User.deleteMany()).then(() => mongoose.disconnect()))

})
