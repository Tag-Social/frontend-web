import React from 'react';
import {
    Container,
    CssBaseline,
    Grid
} from '@material-ui/core';


import { ProfileHeader } from '../components';


// TODO: Finish
const Profile = () => {
    return (
        <Container maxWidth='md'>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <ProfileHeader />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
