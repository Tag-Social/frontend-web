import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    Container,
    CssBaseline,
} from '@material-ui/core';
import { ProfileProgress, RecommendedMentors } from '../../components';

const Dashboard = () => {
    const profile = useSelector(
        ({ firebase }: RootStateOrAny) =>
            firebase.profile
    );
    return (
        <Container maxWidth='md'>
            <CssBaseline />
            <ProfileProgress />
            <RecommendedMentors profile={profile} />
        </Container>
    );
};

export default Dashboard;
