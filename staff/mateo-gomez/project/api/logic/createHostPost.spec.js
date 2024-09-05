import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { expect } from 'chai';


import createHostPost from './createHostPost.js';
import HostPost from '../models/HostPost.js';
import { ContentError, NotFoundError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env

describe('createHostPost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany().then(() => HostPost.deleteMany()))
    )


    beforeEach(() => Promise.all([User.deleteMany(), HostPost.deleteMany()]))


    const { MONGODB_URL_TEST } = process.env
    const { ObjectId } = Types

    it('succeeds on create guest post', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book', username: 'macbook', password: hash }))
            .then((user) => createHostPost(user.id, 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Madrid', 'Sofá', '27', "Test test test test")
                .then(() => user)
            )
            .then((user) => HostPost.findOne()
                .then((post) => {
                    expect(post.author.toString()).to.equal(user.id.toString())
                    expect(post.image).to.equal('https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g')
                    expect(post.city).to.equal("Madrid")
                    expect(post.offer).to.equal("Sofá")
                    expect(post.age).to.equal("27")
                    expect(post.description).to.equal("Test test test test")
                })
            )
    )

    it('fails on non-existing user', () => {
        createHostPost(new ObjectId().toString(), 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Madrid', 'Sofá', '27', "Test test test test")
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown).to.equal('User not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createHostPost(11111, 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Madrid', 'Sofá', '27', "Test test test test")

        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid image', () => {
        let errorThrown

        try {
            createHostPost(new ObjectId().toString(), 1111, 'Madrid', 'Sofá', '27', "Test test test test")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('image is not valid')
        }
    })

    it('fails on invalid city', () => {
        let errorThrown

        try {
            createHostPost(new ObjectId().toString(), 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 1111, 'Sofá', '27', "Test test test test")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('city is not valid')
        }
    })


    it('fails on invalid offer', () => {
        let errorThrown

        try {
            createHostPost(new ObjectId().toString(), 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Madrid', 1111, '27', "Test test test test")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('offer is not valid')
        }
    })


    it('fails on invalid age', () => {
        let errorThrown

        try {
            createHostPost(new ObjectId().toString(), 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Madrid', 'Sofá', 1111, "Test test test test")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('age is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown

        try {
            createHostPost(new ObjectId().toString(), 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Madrid', 'Sofá', '27', 11111)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    after(() => User.deleteMany().then(() => HostPost.deleteMany()).then(() => mongoose.disconnect()))
})