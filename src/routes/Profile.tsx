import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    Container,
    CssBaseline,
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { ProfileHeader, ProfileInfo } from '../components';

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



// TODO: Finish
const Profile = () => {
    const { profile, auth } = useSelector((state: RootStateOrAny) => state.firebase)
    const classes = useStyles()
    const headerItems = {
        displayName: profile.displayName,
        photoURL: auth.photoURL,
        occupation: profile.occupation,
        location: profile.location,
        organization: profile.organization,
        mentor: profile.mentor,
        bio: profile.bio,
    }
    return (
        <Container maxWidth='md' className={classes.container}>
            <CssBaseline />
            <Grid container spacing={2} >
                <Grid item xs={12} sm={12} className={classes.gridItem}>
                    <ProfileHeader headerItems={headerItems} />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.gridItem}>
                    <ProfileInfo profile={profile} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
