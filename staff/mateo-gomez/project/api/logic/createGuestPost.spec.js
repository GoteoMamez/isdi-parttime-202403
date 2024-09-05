import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { expect } from 'chai';


import createGuestPost from './createGuestPost.js';
import GuestPost from '../models/GuestPost.js';
import { ContentError, NotFoundError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env

describe('createGuestPost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany().then(() => GuestPost.deleteMany()))
    )


    beforeEach(() => Promise.all([User.deleteMany(), GuestPost.deleteMany()]))


    const { MONGODB_URL_TEST } = process.env
    const { ObjectId } = Types

    it('succeeds on create guest post', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book', username: 'macbook', password: hash }))
            .then((user) => createGuestPost(user.id, "https://uvn-brightspot.s3.amazonaws.com/assets/vixes/btg/bodyart.batanga.com/files/tatuajes-en-la-espalda-para-hombres-4_0.jpg", "Sevilla", "Madrid", "26 de agosto", "klklklklk")
                .then(() => user)
            )
            .then((user) => GuestPost.findOne()
                .then((post) => {
                    expect(post.author.toString()).to.equal(user.id.toString())
                    expect(post.image).to.equal("https://uvn-brightspot.s3.amazonaws.com/assets/vixes/btg/bodyart.batanga.com/files/tatuajes-en-la-espalda-para-hombres-4_0.jpg")
                    expect(post.fromLocation).to.equal("Sevilla")
                    expect(post.toLocation).to.equal("Madrid")
                    expect(post.date).to.equal("26 de agosto")
                    expect(post.description).to.equal("klklklklk")
                })
            )
    )

    it('fails on non-existing user', () => {
        createGuestPost(new ObjectId().toString(), "https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g", "27", "Oviedo", "Madrid", "Mavs is close to get in the NBA Finals", "27 de junio a 1 de julio")
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown).to.equal('User not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createGuestPost(11111, "https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g", "27", "Oviedo", "Madrid", "Mavs is close to get in the NBA Finals", "27 de junio a 1 de julio")

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
            createGuestPost(new ObjectId().toString(), 1111, "Oviedo", "Madrid", "Mavs is close to get in the NBA Finals", "27 de junio a 1 de julio")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('image is not valid')
        }
    })

    it('fails on invalid toLocation', () => {
        let errorThrown

        try {
            createGuestPost(new ObjectId().toString(), "https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g", "Oviedo", 111, "Mavs is close to get in the NBA Finals", "27 de junio a 1 de julio")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('toLocation is not valid')
        }
    })


    it('fails on invalid fromLocation', () => {
        let errorThrown

        try {
            createGuestPost(new ObjectId().toString(), "https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g", 111, "Madrid", "27 de junio a 1 de julio", "Mavs is close to get in the NBA Finals")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('fromLocation is not valid')
        }
    })


    it('fails on invalid date', () => {
        let errorThrown

        try {
            createGuestPost(new ObjectId().toString(), "https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g", "Oviedo", "Madrid", 1111, "Mavs is close to get in the NBA Finals")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('date is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown

        try {
            createGuestPost(new ObjectId().toString(), "https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g", "Oviedo", "Madrid", "27 de junio a 1 de julio", 1111)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    after(() => User.deleteMany().then(() => GuestPost.deleteMany()).then(() => mongoose.disconnect()))
})