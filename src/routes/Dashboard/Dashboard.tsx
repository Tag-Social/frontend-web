import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { RecommendedMentors, ProfileCard } from '../../containers';
import { useStyles } from './styles';

const Dashboard = () => {
    const classes = useStyles();
    const [
        auth,
        profile,
    ] = useSelector(({ firebase: { auth, profile } }: RootStateOrAny) => [
        auth,
        profile,
    ]);

    document.title = 'Tag | Dashboard ';
    return (
        <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {/* Alerts go here */}
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item md={3} xs={12}>
                        <ProfileCard profile={profile} auth={auth} />
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <RecommendedMentors profile={profile} auth={auth} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
