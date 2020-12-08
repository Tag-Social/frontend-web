import React from 'react'
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import store from './store'
import firebase from '../firebase/firebaseConfig'

const rrfProps = {
    firebase,
    config: {
        userProfile: "users",
        useFirestoreForProfile: true,
    },
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
