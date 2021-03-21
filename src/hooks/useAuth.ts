import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';

import { DASHBOARD } from '../routes/routePaths';
import { userProfile } from '../firebase/utils/userProfile';

type Provider =
    | 'facebook'
    | 'google'
    | 'twitter'
    | 'github'
    | 'microsoft.com'
    | 'apple.com'
    | 'yahoo.com';
type Error = {
    message: string;
    code: number;
};
const useAuth = () => {
    const firebase = useFirebase();
    const firestore = useFirestore();
    const history = useHistory();
    const [error, setError] = useState<Error>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetError, setResetError] = useState<Error>();

    const signIn = (e: FormEvent): void => {
        e.preventDefault();
        firebase
            .login({
                email,
                password,
            })
            .then(() => history.push(DASHBOARD))
            .catch((err) => {
                setError(err);
                console.error(err);
            });
    };

    const providerSignIn = (provider: Provider): void => {
        firebase
            .login({
                provider,
                type: 'popup',
            })
            .then(() => history.push(DASHBOARD))
            .catch((err) => {
                setError(err);
                console.error(err);
            });
    };
    const reAuthenticateWithProvider = (provider: Provider) => {
        firebase
            .reauthenticate({
                provider,
                type: 'popup',
            })
            .catch((err) => {
                setError(err);
                console.error(err);
            });
    };

    const handleRegister = (e: FormEvent): void => {
        e.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                if (result.user) {
                    const { user } = result;
                    user.updateProfile({
                        displayName: name,
                    })
                        .then(() =>
                            firestore
                                .collection('users')
                                .doc(user.uid)
                                .set({
                                    ...userProfile,
                                    displayName: user?.displayName,
                                    email: user?.email,
                                })
                        )
                        .then(() => {
                            history.push(DASHBOARD);
                        });
                }
            })
            .catch((err) => {
                setError(err);
                console.error(err);
            });
    };

    const resetPassword = (e: FormEvent) => {
        e.preventDefault();
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => setResetSuccess(true))
            .catch((error) => setResetError(error));
    };

    return {
        signIn,
        providerSignIn,
        reAuthenticateWithProvider,
        email,
        setEmail,
        name,
        setName,
        password,
        setPassword,
        handleRegister,
        resetPassword,
        resetError,
        resetSuccess,
        error,
    };
};

export default useAuth;
