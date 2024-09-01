import Button from "../../../../components/core/Button"
import Field from "../../../../components/core/Field"
import Input from "../../../../components/core/Input"
import { useState } from 'react'

function GalleryImagesEditor({ galleryImages, onAddImage }) {
    const [newImageUrl, setNewImageUrl] = useState('')

    const handleAddImage = () => {
        if (newImageUrl.trim() !== '') {
            onAddImage(newImageUrl.trim())
            setNewImageUrl('')
        }
    }

    return (
        <div className="GalleryImageEditor">
            <Field id="NewGalleryImage" type='text' placeholder="New Gallery Image URL" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)}>
                New Gallery Image URL
            </Field>
            <Button type='button' className='EditGalery AddGalleryImageButton' onClick={handleAddImage}>
                Add Image
            </Button>
        </div>
    )
}

export default GalleryImagesEditor