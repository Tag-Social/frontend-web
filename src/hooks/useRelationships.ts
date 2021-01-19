import { useFirestore } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';

type RelationshipObject = {
    relId: string;
    uid: string;
};

const useRelationships = (currentUser: string) => {
    const firestore = useFirestore();
    const { followers, following, mentors, mentees, pending } = useSelector(
        ({ relationships }: RootStateOrAny) => relationships
    );

    const follow = (userId: string) => {
        // Follow  = type: 0
        const exist = following.payload.some(
            (rel: RelationshipObject) => rel.uid === userId
        );
        if (!exist) {
            firestore.collection('relationships').add({
                uid1: currentUser,
                uid2: userId,
                type: 0,
            });
        }
    };

    const unfollow = (relationshipId: string) => {
        firestore
            .collection('relationship')
            .doc(relationshipId)
            .update({ status: 3 });
    };

    const requestMentorship = (mentorId: string) => {
        // Mentorship = type: 1
        const exist =
            pending.mentors.some(
                (rel: RelationshipObject) => rel.uid === mentorId
            ) ||
            mentors.payload.some(
                (rel: RelationshipObject) => rel.uid === mentorId
            );

        if (!exist) {
            firestore.collection('relationships').add({
                uid1: mentorId,
                uid2: currentUser,
                type: 1,
                status: 0,
            });
        }
    };

    const acceptMentorship = (uid: string, relationshipId: string) => {
        // Accept mentorship = status: 1
        firestore
            .collection('relationship')
            .where('__name__', '==', relationshipId)
            .where('uid2', '==', uid)
            .get()
            .then((snapshot) => {
                if (!snapshot.empty) {
                    firestore
                        .collection('relationship')
                        .doc(relationshipId)
                        .update({ status: 1 });
                }
            });
    };

    return {
        follow,
        unfollow,
        requestMentorship,
        acceptMentorship,
    };
};

export default useRelationships;
