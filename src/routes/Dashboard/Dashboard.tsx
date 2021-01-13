import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    Container,
    CssBaseline,
    Grid,
    Paper
} from '@material-ui/core';
import { RecommendedMentors, ProfileCard } from '../../components';
import { useStyles } from './styles';

const Dashboard = () => {
    const classes = useStyles()
    const [auth, profile] = useSelector(
        ({ firebase: { auth, profile } }: RootStateOrAny) =>
            [auth, profile]
    );

    return (
        <Container maxWidth='lg'>
            <CssBaseline />
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {/* Alerts go here */}
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item md={3} xs={12}>
                        <ProfileCard profile={profile} auth={auth} />
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <Paper elevation={0} className={classes.main}>
                            <RecommendedMentors profile={profile} auth={auth} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
