import { useState } from "react";

import logic from "../../../logic";
import View from "../../../../components/library/View";
import FormWithFeedback from "../../../../components/library/FormWithFeedBack";
import Field from "../../../../components/core/Field"
import Heading from "../../../../components/core/Heading";
import Button from "../../../../components/core/Button";
import './CreatePostForm.css'

function CreatePostForm({ postType, onCancelCreatePostClick, onHostPostCreated, onGuestPostCreated }) {
    console.log('CreatePostForm -> render')

    const [message, setMessage] = useState('')



    const handleCreatePostSubmit = (event) => {
        event.preventDefault()



        if (postType === 'HostPost') {
            const form = event.target

            const image = form.image.value
            const description = form.description.value
            const city = form.city.value
            const age = form.age.value
            const offer = form.offer.value

            try {
                logic.createHostPost(image, description, city, age, offer)
                    .then(() => onHostPostCreated())
                    .catch((error) => {
                        console.error(error)

                        setMessage(error.message)
                    })
            } catch (error) {
                console.error(error)
                setMessage(error.message)
            }
        } else if (postType === 'GuestPost') {
            const form = event.target

            const image = form.image.value
            const description = form.description.value
            const date = form.date.value
            const fromLocation = form.fromLocation.value
            const toLocation = form.toLocation.value
            const age = form.age.value

            try {
                logic.createGuestPost(image, description, date, fromLocation, toLocation, age)
                    .then(() => onGuestPostCreated())
                    .catch((error) => {
                        console.error(error)

                        setMessage(error.message)
                    })
            } catch (error) {
                console.error(error)

                setMessage(error.message)
            }
        }
    }

    return (
        <View className='CreatePostForm'>
            <Heading className='CreatePostFormHeading' level={2}>Create your post</Heading>

            <FormWithFeedback onSubmit={handleCreatePostSubmit} >

                {postType === 'HostPost' && (
                    <>
                        <Field type="text" id="image" placeholder="Image URL" required >Image</Field>
                        <Field type="text" id="description" placeholder="Description" required >Description</Field>
                        <Field type="text" id="city" placeholder="City" required >City</Field>
                        <Field type="text" id="age" placeholder="Age" required >Age</Field>
                        <Field type="text" id="offer" placeholder="Offer" required >Offer</Field>
                    </>
                )}
                {postType === 'GuestPost' && (
                    <>
                        <Field type="text" id="image" placeholder="Image URL" required >Image</Field>
                        <Field type="text" id="description" placeholder="Description" required >Description</Field>
                        <Field type="text" id="date" placeholder="Date" required >Date</Field>
                        <Field type="text" id="age" placeholder="Age" required >Age</Field>
                        <Field type="text" id="fromLocation" placeholder="From Location" required >From Location</Field>
                        <Field type="text" id="toLocation" placeholder="To Location" required >To Location</Field>
                    </>
                )}
                <div className="CreateCancelButtons">
                    <Button type="submit">Create Post</Button>
                    <Button type="Button" onClick={onCancelCreatePostClick}>Cancel</Button>
                </div>
            </FormWithFeedback>

        </View>
    )
}

export default CreatePostForm;