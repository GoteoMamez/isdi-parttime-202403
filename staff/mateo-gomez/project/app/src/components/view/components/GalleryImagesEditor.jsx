import Button from "../../../../components/core/Button"
import Field from "../../../../components/core/Field"
import Input from "../../../../components/core/Input"

function GalleryImagesEditor({ galleryImages, onAddImage, onDeleteImage, onImageChange }) {
    return (
        <div className="GalleryImageEditor">
            {galleryImages.map((image, index) => (
                <div key={index} className="GalleryImageField">
                    <Field id={`GalleryImage${index}`} type='text' placeholder={`Gallery Image ${index + 1} URL`}>
                        Gallery Image {index + 1} URL
                        <Input
                            type='text'
                            id={`GalleryImages${index}`}
                            value={image}
                            onChange={(e) => onImageChange(index, e.target.value)}
                        />
                    </Field>
                    <Button
                        type='button'
                        className='EditGalery DeleteGalleryImageButton'
                        onClick={() => onDeleteImage(index)}
                    >
                        Delete
                    </Button>
                </div>
            ))}
            <Button type='button' onClick={onAddImage} className='EditGalery AddGalleryImageButton'>
                Add Image
            </Button>
        </div>
    )
}
export default GalleryImagesEditor