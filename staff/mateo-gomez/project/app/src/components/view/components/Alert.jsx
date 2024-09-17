import Button from '../../../../components/core/Button'
import Text from '../../../../components/core/Text'



function Alert({ message, onAccepted }) {
    return (
        <>

            <div className="ConfirmAlertForm">
                <Text className='ConfirmAlertText'>{message}</Text>
                <div className="AlertButtons">


                    <Button className='AlertConfirmButton' onClick={onAccepted}>Confirm</Button>
                </div>
            </div>
        </>
    )
}

export default Alert