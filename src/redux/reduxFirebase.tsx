import React, { useEffect } from 'react'
import { Provider, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
    ReactReduxFirebaseProvider,
    useFirestoreConnect,
} from 'react-redux-firebase';
import { createFirestoreInstance } from "redux-firestore";
import * as AuthTypes from '@firebase/auth-types'

import store from './store'
import firebase from '../firebase/firebaseConfig'
import { userProfile, UserProfile } from '../firebase/utils/userProfile'
import { getRelationships } from './actions/relationships';

type UserData = AuthTypes.User | undefined

const profileFactory = (userData: UserData): UserProfile => {
    return {
        ...userProfile,
        displayName: userData?.displayName,
        email: userData?.email,
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

const Init: React.FC = ({ children }) => {
    const dispatch = useDispatch();
    const { uid } = useSelector(
        ({ firebase }: RootStateOrAny) => firebase.auth
    );

    useEffect(() => {
        if (uid) dispatch(getRelationships(uid));
    }, [dispatch, uid]);

    useFirestoreConnect([
        {
            collection: 'conversations',
            where: [['users', 'array-contains', uid || '']],
            //orderBy: ['lastSeenAt', 'desc'],
        },
    ]);

    return <>{children}</>;
}

const ReduxFirebaseProvider: React.FC = ({ children }) => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <Init>
                    {children}
                </Init>
            </ReactReduxFirebaseProvider>
        </Provider>
    )
}

export default ReduxFirebaseProvider
