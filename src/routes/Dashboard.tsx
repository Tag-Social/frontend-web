import React from 'react';
import {
    Container,
    Typography,
    CssBaseline,
} from '@material-ui/core';
import { ProfileProgress } from '../components';




const Dashboard = () => {
    return (
        <Container maxWidth='sm'>
            <CssBaseline />
            <ProfileProgress />
            <Typography variant='h2' component='h1'>
                Dashboard goes here!
            </Typography>
        </Container>
    );
};

export default Dashboard;
