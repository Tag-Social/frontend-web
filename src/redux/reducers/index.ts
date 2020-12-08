import {combineReducers} from "redux";
import {firebaseReducer, FirebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

import {UserProfile} from '../../firebase/utils/userProfile'

interface RootState {
    firebase: FirebaseReducer.Reducer<UserProfile>
    firestore: any
}

const rootReducer = combineReducers<RootState>({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer;