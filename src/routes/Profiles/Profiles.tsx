import React from 'react';
import { useParams } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import {
    Container,
    CssBaseline,
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { ProfileHeader, ProfileInfo, Bug } from '../../components';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    gridItem: {
        [theme.breakpoints.down('xs')]: {
            paddingRight: '0 !important',
            paddingLeft: '0 !important',
        }
    }
}))



type Params = {
    profileId: string
}


// TODO: Finish
const UserProfile = () => {
    let { profileId } = useParams<Params>()
    useFirestoreConnect(() => [
        { collection: 'users', doc: profileId }
    ])
    const profile = useSelector(
        ({ firestore: { data } }: RootStateOrAny) => data.users && data.users[profileId]
    )
    const classes = useStyles()
    let headerItems = profile && {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        occupation: profile.occupation,
        location: profile.location,
        organization: profile.organization,
        mentor: profile.mentor,
        bio: profile.bio,
    }


    if (profile) { document.title = 'Tag | ' + profile.displayName; }

    return (
        <Container maxWidth='md' className={classes.container}>
            <CssBaseline />
            <Grid container spacing={2} >
                {profile ? (<>
                    <Grid item xs={12} sm={12} className={classes.gridItem}>
                        <ProfileHeader headerItems={headerItems} />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.gridItem}>
                        <ProfileInfo profile={profile} />
                    </Grid>
                </>) : <Bug message='Sorry this profile was not found...' errorType={404} />}
            </Grid>
        </Container>
    );
};

export default UserProfile;