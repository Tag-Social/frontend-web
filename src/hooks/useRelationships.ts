import { useFirestore } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Relationship } from '../firebase/utils/relationships';
const useRelationships = (currentUser: string) => {
    const firestore = useFirestore();
    const { followers, following, mentors, mentees, pending } = useSelector(
        ({ relationships }: RootStateOrAny) => relationships
    );

    const follow = (userId: string) => {
        // Follow  = type: 0
        const exists = following.some(
            (rel: Relationship) => rel.uid2 === userId
        );

        if (!exists) {
            firestore.collection('relationships').add({
                uid1: currentUser,
                uid2: userId,
                type: 0,
                status: 1,
            });
        }
    };

    const unfollow = (relationshipId: string | undefined) => {
        const exists = following.some(
            (rel: Relationship) => rel.relId === relationshipId
        );

        if (exists)
            firestore
                .collection('relationships')
                .doc(relationshipId)
                .update({ status: 3 });
    };

    const requestMentorship = (mentorId: string) => {
        // Mentorship = type: 1
        const exists =
            pending.mentors.some(
                (rel: Relationship) => rel.uid1 === mentorId
            ) || mentors.some((rel: Relationship) => rel.uid1 === mentorId);

        if (!exists) {
            firestore.collection('relationships').add({
                uid1: mentorId,
                uid2: currentUser,
                type: 1,
                status: 0,
            });
        }
    };

    const acceptMentorship = (relationshipId: string) => {
        // Accept mentorship = status: 1
        const exists = pending.mentees.some(
            (rel: Relationship) => rel.relId === relationshipId
        );

        if (exists)
            firestore
                .collection('relationships')
                .doc(relationshipId)
                .update({ status: 1 });
    };

    const terminateMentorship = (relationshipId: string) => {
        // Mentorship = type: 1
        const exists = [
            ...mentors,
            ...mentees,
            ...pending.mentors,
            ...pending.mentees,
        ].some((rel: Relationship) => rel.relId === relationshipId);

        if (exists)
            firestore
                .collection('relationships')
                .doc(relationshipId)
                .update({ status: 3 });
    };

    return {
        follow,
        unfollow,
        requestMentorship,
        acceptMentorship,
        terminateMentorship,
    };
};

export default useRelationships;
