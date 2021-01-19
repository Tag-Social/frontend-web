import {combineReducers} from "redux";
import {firebaseReducer, FirebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

import {UserProfile} from '../../firebase/utils/userProfile'
import relationshipsReducer from './relationshipsReducer';

interface RootState {
    firebase: FirebaseReducer.Reducer<UserProfile>;
    firestore: any;
    relationships: any;
}

const rootReducer = combineReducers<RootState>({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    relationships: relationshipsReducer,
});

export default rootReducer;