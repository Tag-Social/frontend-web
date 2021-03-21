import { useState, useReducer } from 'react';
import { useFirestore } from 'react-redux-firebase';

const useEmailCapture = () => {
    const firestore = useFirestore();
    const [validEmail, setValidEmail] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const emailReducer = (state: string, action: string) => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = regex.test(String(action).toLowerCase());
        setValidEmail(valid);
        return action;
    };
    const [emailInput, setEmailInput] = useReducer(emailReducer, '');

    const addEmail = () => {
        firestore
            .collection('emails')
            .add({
                email: emailInput,
                date: new Date().toISOString(),
            })
            .then(() => {
                console.log('ran');
                setEmailInput('');
                setEmailMessage(
                    'Thank you! We have subscribed you to our newsletter.'
                );
            })
            .catch((error) => {
                console.error(error);
                setEmailMessage(
                    'Oops. There has been an error. Please try again later.'
                );
            });
    };
    return { emailInput, setEmailInput, addEmail, emailMessage, validEmail };
};

export default useEmailCapture;
