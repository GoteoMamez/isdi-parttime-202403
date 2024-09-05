import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { User } from '../models/index.js'
import updateGalleryImages from './updateGalleryImages.js'
import { ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('updateGalleryImages', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating gallery images', () => {
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

                return updateGalleryImages(userId, [
                    "https://cc-prod.scene7.com/is/image/CCProdAuthor/Tattoo_marque?$png$&jpegSize=200&wid=1281",
                    "https://wantxneed-gear.com/wp-content/uploads/2023/07/VARIEDADES-DE-TATUAJES.webp"
                ]);
            })
            .then(updatedUser => {

                expect(updatedUser.galleryImages).to.include("https://cc-prod.scene7.com/is/image/CCProdAuthor/Tattoo_marque?$png$&jpegSize=200&wid=1281")
                expect(updatedUser.galleryImages).to.include("https://wantxneed-gear.com/wp-content/uploads/2023/07/VARIEDADES-DE-TATUAJES.webp")
                expect(updatedUser.galleryImages).to.have.lengthOf(2)
            });
    });

    it('fails if galleryImages is not an array', () => {
        let userId;
        let errorThrown;

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

                try {
                    updateGalleryImages(userId, 'invalid-data');
                } catch (error) {
                    errorThrown = error;
                } finally {
                    expect(errorThrown).to.be.instanceOf(MatchError);
                    expect(errorThrown.message).to.equal('galleryImages must be an array');
                }
            });
    });

    it('fails on invalid gallery image URL', () => {
        let userId;
        let errorThrown;

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

                try {
                    updateGalleryImages(userId, ['invalid-url']);
                } catch (error) {
                    errorThrown = error;
                } finally {
                    expect(errorThrown).to.be.instanceOf(ContentError);
                    expect(errorThrown.message).to.include('galleryImages[0] is not valid');
                }
            });
    });

    after(() => User.deleteMany().then(() => mongoose.disconnect()));
});