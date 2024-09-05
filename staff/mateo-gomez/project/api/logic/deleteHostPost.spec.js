import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User, HostPost } from '../models/index.js'

import deleteHostPost from './deleteHostPost.js'

import { NotFoundError, ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('deleteHostPost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany().then(() => HostPost.deleteMany()))
    )

    beforeEach(() => Promise.all([User.deleteMany(), HostPost.deleteMany()]))


    it('succeeds on delete Host Post', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book', username: 'macbook', password: hash }))
            .then(user => HostPost.create({
                author: user.id,
                image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                city: "from",
                offer: "Sofá",
                age: "27",
                description: "hello description"
            })
                .then((post) => ({ user, post }))
            )
            .then(({ user, post }) =>
                deleteHostPost(user.id, post.id)
            )
            .then(postId =>
                HostPost.findById(postId).then(deletedPost => {
                    expect(deletedPost).to.be.null
                })
            )
    )
    it('fails on non existing', () => {
        let errorThrown

        return HostPost.create({
            author: new ObjectId().toString(),
            image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
            city: "from",
            offer: "Sofá",
            age: "27",
            description: "hello description"
        })
            .then((post) => deleteHostPost(new ObjectId().toString(), post.id))
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
                .then((user) => deleteHostPost(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('post not found')
            })


    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deleteHostPost(11111, "https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g", "27", "Oviedo", "Madrid", "Mavs is close to get in the NBA Finals", "27 de junio a 1 de julio")

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
            deleteHostPost(new ObjectId().toString(), 11111)
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
                const post = new HostPost({
                    author: new ObjectId().toString(),
                    image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    city: "from",
                    offer: "Sofá",
                    age: "27",
                    description: "hello description"

                })

                return Promise.all([user.save(), post.save()])
                    .then(([savedUser, savedPost]) => {
                        return deleteHostPost(savedUser.id.toString(), savedPost.id.toString())
                    })
                    .catch(error => errorThrown = error)
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(MatchError)
                expect(errorThrown.message).to.equal('post author does not match user')
            })
    })




    after(() => HostPost.deleteMany().then(() => User.deleteMany()).then(() => mongoose.disconnect()))

})
