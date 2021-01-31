import { useParams } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import {
    Container,
    CssBaseline,
    Grid,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { useStyles } from './styles';
import { ProfileHeader, ProfileInfo, Bug } from '../../containers';

type Params = {
    profileId: string;
};

// TODO: Finish
const UserProfile = () => {
    let { profileId } = useParams<Params>();
    useFirestoreConnect(() => [{ collection: 'users', doc: profileId }]);
    const profile = useSelector(
        ({ firestore: { data } }: RootStateOrAny) =>
            data.users && data.users[profileId]
    );
    const auth = useSelector(({ firebase }: RootStateOrAny) => firebase.auth);
    const classes = useStyles();
    const owner = profileId === auth.uid;

    if (profile) {
        document.title = 'Tag | ' + profile.displayName;
    }

    return (
        <Container maxWidth='md' className={classes.container}>
            <Grid container spacing={2}>
                {!isLoaded(profile) ? (
                    <Grid item xs={12} sm={12} className={classes.gridItem}>
                        <Skeleton variant='rect' height={150} />
                        <Skeleton variant='circle' width={150} height={150} />
                        <Skeleton variant='rect' height={300} />
                    </Grid>
                ) : isLoaded(profile) && profile ? (
                    <>
                        <Grid item xs={12} sm={12} className={classes.gridItem}>
                            <ProfileHeader
                                profile={profile}
                                owner={owner}
                                profileId={profileId}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.gridItem}>
                            <ProfileInfo profile={profile} owner={owner} />
                        </Grid>
                    </>
                ) : (
                    <Bug
                        message='Sorry this profile was not found...'
                        errorType={404}
                    />
                )}
            </Grid>
        </Container>
    );
};

export default UserProfile;
