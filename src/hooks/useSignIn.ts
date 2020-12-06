import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

import { DASHBOARD } from '../routes/routePaths';

type Provider = 'facebook'
            | 'google'
            | 'twitter'
            | 'github'
            | 'microsoft.com'
            | 'apple.com'
            | 'yahoo.com'

const useSignIn = () => {
    const firebase = useFirebase();
    const error = useSelector((state: RootStateOrAny) => state.firebase.authError);
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e: FormEvent) => {
        e.preventDefault()
        firebase.login({
            email,
            password
        })
        .then(() => history.push(DASHBOARD))
       
    }

    const providerSignIn = (provider: Provider) => {
        firebase
            .login({
                provider,
                type: 'popup',
            })
            .then(() => history.push(DASHBOARD))
        
    };

    return {signIn, providerSignIn, setEmail, setPassword, error}
}

export default useSignIn