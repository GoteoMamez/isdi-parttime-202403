import Button from '../../../../components/core/Button'
import Text from '../../../../components/core/Text'



function Confirm({ message, onAccepted, onCancelled }) {
    return (
        <>

            <div className="ConfirmDeleteForm">
                <Text className='ConfirmDeleteText'>{message}</Text>
                <div className="DeleteButtons">
                    <Button className='Button ConfirmCancelButton' onClick={onCancelled} >Cancel</Button>

                    <Button className='ConfirmConfirmButton' onClick={onAccepted}>Confirm</Button>
                </div>
            </div>
        </>
    )
}

export default Confirm