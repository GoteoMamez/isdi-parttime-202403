import { ContentError, MatchError } from "./errors.js"

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ID_REGEX = /^[0-9a-z]+$/
const AGE_REGEX = /^(0|[1-9][0-9]?|1[01][0-9]|120)$/;
const TWITTER_REGEX = /^https:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]{1,15}(\/status\/\d+)?(\?.*)?$/
const INSTAGRAM_REGEX = /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_\.]+\/?(\?.*)?$/
const FACEBOOK_REGEX = /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9\.]+$/
const YOUTUBE_REGEX = /^https?:\/\/(www\.)?youtube\.com\/(@|channel\/|user\/|c\/)[A-Za-z0-9_-]+$/



function validateName(name, explain = 'name') {
    if (typeof name !== 'string' || !NAME_REGEX.test(name))
        throw new ContentError(`${explain} is not valid`)
}

function validateSurname(surname, explain = 'surname') {
    if (typeof surname !== 'string' || !NAME_REGEX.test(surname))
        throw new ContentError(`${explain} is not valid`)
}

function validateUserName(username, explain = 'username') {
    if (typeof username !== 'string' || !USERNAME_REGEX.test(username))
        throw new ContentError(`${explain} is not valid`)
}

function validatePassword(password) {
    if (typeof password !== 'string' || !PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')
}

function validatePasswordMatch(password, passwordRepeat) {
    if (password !== passwordRepeat) {
        throw new MatchError('password don\'t match')
    }
}

function validateCallback(callback) {
    if (typeof callback !== 'function')
        throw new TypeError('callback is not a function')
}

function validateEmail(email) {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')
}

function validateText(text, explain = 'text', maxLength = Infinity) {
    if (typeof text !== 'string' || !text.length || text.length > maxLength) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateURL(url, explain = 'url') {
    if (typeof url !== 'string' || !url.startsWith('http')) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateId(id, explain = 'id') {
    if (!ID_REGEX.test(id) || typeof id !== 'string')
        throw new ContentError(`${explain} is not valid`)
}

function validateAge(age, explain = 'age') {
    if (!AGE_REGEX.test(age) || typeof age !== 'string') {
        throw new ContentError(`${explain} is not valid`)
    }

}

function validateTwitterLink(url, explain = 'twitterUrl') {
    if (typeof url !== 'string' || !TWITTER_REGEX.test(url)) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateInstagramLink(url, explain = 'instagramUrl') {
    if (typeof url !== 'string' || !INSTAGRAM_REGEX.test(url)) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateFacebookLink(url, explain = 'facebookUrl') {
    if (typeof url !== 'string' || !FACEBOOK_REGEX.test(url)) {
        throw new ContentError(`${explain} is not valid`)
    }
}

function validateYoutubeLink(url, explain = 'youtubeUrl') {
    if (typeof url !== 'string' || !YOUTUBE_REGEX.test(url)) {
        throw new ContentError(`${explain} is not valid`)
    }
}

const validate = {
    name: validateName,
    surname: validateSurname,
    username: validateUserName,
    password: validatePassword,
    passwordMatch: validatePasswordMatch,
    callback: validateCallback,
    email: validateEmail,
    text: validateText,
    url: validateURL,
    id: validateId,
    age: validateAge,

    twitterUrl: validateTwitterLink,
    instagramUrl: validateInstagramLink,
    facebookUrl: validateFacebookLink,
    youtubeUrl: validateYoutubeLink

}

export default validate