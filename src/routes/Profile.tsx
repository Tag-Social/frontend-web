import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    Container,
    CssBaseline,
    Grid
} from '@material-ui/core';


import { ProfileHeader, ProfileInfo } from '../components';



// TODO: Finish
const Profile = () => {
    const { profile, auth } = useSelector((state: RootStateOrAny) => state.firebase)
    const headerItems = {
        displayName: profile.displayName,
        photoURL: auth.photoURL,
        occupation: profile.occupation,
        location: profile.location,
        organization: profile.organization,
        mentor: profile.mentor
    }
    return (
        <Container maxWidth='md'>
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <ProfileHeader headerItems={headerItems} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <ProfileInfo profile={profile} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
