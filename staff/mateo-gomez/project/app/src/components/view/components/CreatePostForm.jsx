import { useState } from "react";

import logic from "../../../logic";
import View from "../../../../components/library/View";
import FormWithFeedback from "../../../../components/library/FormWithFeedBack";
import Field from "../../../../components/core/Field"
import Heading from "../../../../components/core/Heading";
import Button from "../../../../components/core/Button";
import PostTypeSelection from "./PostTypeSelection";

function CreatePostForm({ onCancelCreatePostClick, onHostPostCreated, onGuestPostCreated }) {
    console.log('CreatePostForm -> render')

    const [message, setMessage] = useState('')
    const [postType, setPostType] = useState(null)

    const handlePostTypeSelection = (type) => {
        setPostType(type)
    }

    const handleCreatePostSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const description = form.description.value

        if (postType === 'HostPost') {
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
            <Heading level={2}>Create your post</Heading>
            {!postType && (
                <PostTypeSelection onSelect={handlePostTypeSelection} />)}
            {!postType && (
                <div>
                    <Button onClick={() => handlePostTypeSelection('HostPost')}>Host Post</Button>
                    <Button onClick={() => handlePostTypeSelection('GuestPost')}>Guest Post</Button>
                </div>
            )}
            {postType && (
                <FormWithFeedback onSubmit={handleCreatePostSubmit} message={message}>
                    <Field type="text" name="image" label="Image URL" required />
                    <Field type="text" name="description" label="Description" required />
                    {postType === 'HostPost' && (
                        <>
                            <Field type="text" name="city" label="City" required />
                            <Field type="text" name="age" label="Age" required />
                            <Field type="text" name="offer" label="Offer" required />
                        </>
                    )}
                    {postType === 'GuestPost' && (
                        <>
                            <Field type="text" name="date" label="Date" required />
                            <Field type="text" name="age" label="Age" required />
                            <Field type="text" name="fromLocation" label="From Location" required />
                            <Field type="text" name="toLocation" label="To Location" required />
                        </>
                    )}
                    <Button type="submit">Create Post</Button>
                    <Button type="Button" onClick={onCancelCreatePostClick}>Cancel</Button>
                </FormWithFeedback>
            )}
        </View>
    )
}

export default CreatePostForm;