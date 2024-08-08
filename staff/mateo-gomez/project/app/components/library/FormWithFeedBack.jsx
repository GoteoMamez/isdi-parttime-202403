import Form from "../core/Form";
import Text from "../core/Text";

function FormWithFeedback({ children, onSubmit, message, level = 'error' }) {
    return <Form className='FormWithFeedback' onSubmit={onSubmit}>
        {children}
        {message && <Text className={`Feedback ${level}`}>{message}</Text>}
    </Form>
}


export default FormWithFeedback