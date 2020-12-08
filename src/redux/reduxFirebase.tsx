import React from 'react'
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import * as AuthTypes from '@firebase/auth-types'


import store from './store'
import firebase from '../firebase/firebaseConfig'
import { userProfile, UserProfile } from '../firebase/utils/userProfile'

type UserData = AuthTypes.User | undefined

const profileFactory = (userData: UserData): UserProfile => {
    return {
        displayName: userData?.displayName,
        email: userData?.email,
        ...userProfile
    }
}

const config = {
    userProfile: "users", // where profiles are stored in database
    useFirestoreForProfile: true, // use Firestore for profile instead of RTDB
    presence: 'presence', // where list of online users is stored in database
    sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
    profileFactory,
}

const rrfProps = {
    firebase,
    config,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

const ReduxFirebaseProvider: React.FC = ({ children }) => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                {children}
            </ReactReduxFirebaseProvider>
        </Provider>
    )
}

export default ReduxFirebaseProvider
