import { Dispatch } from 'redux';
import { firestore } from '../../firebase/firebaseConfig';
import {
    LOADING_RELATIONSHIPS,
    GET_RELATIONSHIPS,
    RELATIONSHIPS_ERROR,
} from '../types';

type Payload = any[] | PromiseLike<any[] | undefined> | {} | undefined;

type Action = {
    readonly type:
        | typeof GET_RELATIONSHIPS
        | typeof LOADING_RELATIONSHIPS
        | typeof RELATIONSHIPS_ERROR;
    readonly payload?: Payload;
};

export const getRelationships = (uid: string) => async (
    dispatch: Dispatch<Action>
) => {
    dispatch({
        type: LOADING_RELATIONSHIPS,
    } as const);

    try {
        const data1 = await firestore
            .collection('relationships')
            .where('uid1', '==', uid)
            .get()
            .then((snapshots) => {
                if (!snapshots.empty) {
                    const relationships:
                        | any[]
                        | PromiseLike<any[] | undefined>
                        | undefined = [];
                    snapshots.forEach((snapshot) =>
                        relationships.push({
                            relId: snapshot.id,
                            ...snapshot.data(),
                        })
                    );
                    return relationships;
                }
            });

        const data2 = await firestore
            .collection('relationships')
            .where('uid2', '==', uid)
            .get()
            .then((snapshots) => {
                if (!snapshots.empty) {
                    const relationships:
                        | any[]
                        | PromiseLike<any[] | undefined>
                        | undefined = [];
                    snapshots.forEach((snapshot) =>
                        relationships.push({
                            relId: snapshot.id,
                            ...snapshot.data(),
                        })
                    );
                    return relationships;
                }
            });

        const followers = data2?.filter(
            (rel) => rel.type === 0 && rel.status === 1
        ) || [];
        const following = data1?.filter(
            (rel) => rel.type === 0 && rel.status === 1
        ) || [];
        const mentors =
            data2?.filter((rel) => rel.type === 1 && rel.status === 1) ||
            [];
        const mentees =
            data1?.filter((rel) => rel.type === 1 && rel.status === 1) ||
            [];
        const pending = {
            mentors:data2?.filter((rel) => rel.type === 1 && rel.status === 0) || [],
            mentees:
                    data1?.filter((rel) => rel.type === 1 && rel.status === 0) || [],
        };
        dispatch({
            type: GET_RELATIONSHIPS,
            payload: {
                followers: [...followers],
                following: [...following],
                mentors: [...mentors],
                mentees: [...mentees],
                pending: {
                    mentors: [...pending.mentors],
                    mentees: [...pending.mentees],
                },
            },
        } as const);
    } catch (error) {
        dispatch({
            type: RELATIONSHIPS_ERROR,
            payload : error
        })
        
    }
};
