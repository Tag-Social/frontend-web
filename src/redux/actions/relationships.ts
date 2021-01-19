import { AnyAction, Dispatch } from 'redux';
import { firestore } from '../../firebase/firebaseConfig';
import {
    GET_FOLLOWERS,
    GET_FOLLOWING,
    GET_MENTEES,
    GET_MENTORS,
    GET_PENDING,
} from '../types';

type Payload = any[] | PromiseLike<any[] | undefined> | {} | undefined;
type Action = {
    readonly payload: Payload;
};

interface GetFollowersAction extends Action {
    readonly type: typeof GET_FOLLOWERS;
}

interface GetFollowingAction extends Action {
    readonly type: typeof GET_FOLLOWING;
}

interface GetMentorsAction extends Action {
    readonly type: typeof GET_MENTORS;
}

interface GetMenteesAction extends Action {
    readonly type: typeof GET_MENTEES;
}

interface GetPendingAction extends Action {
    readonly type: typeof GET_PENDING;
}

export const getFollowers = (uid: string) => async (
    dispatch: Dispatch<GetFollowersAction>
) => {
    const payload = await firestore
        .collection('relationships')
        .where('type', '==', 0)
        .where('uid2', '==', uid)
        .get()
        .then((snapshots) => {
            if (!snapshots.empty) {
                const users:
                    | any[]
                    | PromiseLike<any[] | undefined>
                    | undefined = [];
                snapshots.forEach((snapshot) =>
                    users.push({
                        relId: snapshot.id,
                        uid: snapshot.data().uid1,
                    })
                );
                return users;
            }
        });
    dispatch({
        type: GET_FOLLOWERS,
        payload: payload || [],
    } as const);
};

export const getFollowing = (uid: string) => async (
    dispatch: Dispatch<GetFollowingAction>
) => {
    const payload = await firestore
        .collection('relationships')
        .where('type', '==', 0)
        .where('uid1', '==', uid)
        .get()
        .then((snapshots) => {
            if (!snapshots.empty) {
                const users:
                    | any[]
                    | PromiseLike<any[] | undefined>
                    | undefined = [];
                snapshots.forEach((snapshot) =>
                    users.push({
                        relId: snapshot.id,
                        uid: snapshot.data().uid2,
                    })
                );
                return users;
            }
        });
    dispatch({
        type: GET_FOLLOWING,
        payload: payload || [],
    } as const);
};

export const getMentors = (uid: string) => async (
    dispatch: Dispatch<GetMentorsAction>
) => {
    const payload = await firestore
        .collection('relationships')
        .where('type', '==', 1)
        .where('status', '==', 1)
        .where('uid2', '==', uid)
        .get()
        .then((snapshots) => {
            if (!snapshots.empty) {
                const users:
                    | any[]
                    | PromiseLike<any[] | undefined>
                    | undefined = [];
                snapshots.forEach((snapshot) =>
                    users.push({
                        relId: snapshot.id,
                        uid: snapshot.data().uid1,
                    })
                );
                return users;
            }
        });
    dispatch({
        type: GET_MENTORS,
        payload: payload || [],
    } as const);
};

export const getMentees = (uid: string) => async (
    dispatch: Dispatch<GetMenteesAction>
) => {
    const payload = await firestore
        .collection('relationships')
        .where('type', '==', 1)
        .where('status', '==', 1)
        .where('uid1', '==', uid)
        .get()
        .then((snapshots) => {
            if (!snapshots.empty) {
                const users:
                    | any[]
                    | PromiseLike<any[] | undefined>
                    | undefined = [];
                snapshots.forEach((snapshot) =>
                    users.push({
                        relId: snapshot.id,
                        uid: snapshot.data().uid2,
                    })
                );
                return users;
            }
        });
    dispatch({
        type: GET_MENTEES,
        payload: payload || [],
    } as const);
};

export const getPending = (uid: string) => async (
    dispatch: Dispatch<GetPendingAction>
) => {
    const mentees = await firestore
        .collection('relationships')
        .where('type', '==', 1)
        .where('status', '==', 0)
        .where('uid1', '==', uid)
        .get()
        .then((snapshots) => {
            if (!snapshots.empty) {
                const users:
                    | any[]
                    | PromiseLike<any[] | undefined>
                    | undefined = [];
                snapshots.forEach((snapshot) =>
                    users.push({
                        relId: snapshot.id,
                        uid: snapshot.data().uid2,
                    })
                );
                return users;
            }
        });

    const mentors = await firestore
        .collection('relationships')
        .where('type', '==', 1)
        .where('status', '==', 0)
        .where('uid2', '==', uid)
        .get()
        .then((snapshots) => {
            if (!snapshots.empty) {
                const users:
                    | any[]
                    | PromiseLike<any[] | undefined>
                    | undefined = [];
                snapshots.forEach((snapshot) =>
                    users.push({
                        relId: snapshot.id,
                        uid: snapshot.data().uid1,
                    })
                );
                return users;
            }
        });

    dispatch({
        type: GET_PENDING,
        payload: {
            mentors: mentors || [],
            mentees: mentees || [],
        },
    } as const);
};
