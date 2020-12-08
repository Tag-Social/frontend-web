import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    Container,
    CssBaseline,
    Grid,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { ProfileAvatar } from '../components';

const useStyles = makeStyles((theme) => ({
    userCard: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 240,
        width: '100%',
        backgroundColor: '#f3f3f3',
    },
    avatarContainer: {
        marginBottom: '15px',
    },
    info: {
        position: 'relative',
        bottom: '100px',
        left: '20px',
        height: '250px',
    },
}));

// TODO: Finish
const Profile = () => {
    const { auth, profile } = useSelector(
        (state: RootStateOrAny) => state.firebase
    );
    const classes = useStyles();

    const { displayName, occupation, location } = profile;

    const userCard = (
        <Card>
            <CardMedia
                component='img'
                alt='Banner'
                height='200'
                image='https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fdefault-banner.jpg?alt=media&token=425fde9f-6ae8-447b-8684-bf458e9a8255'
                title='Banner'
            />
            <CardContent className={classes.info}>
                <div className={classes.avatarContainer}>
                    <ProfileAvatar alt={displayName} src={auth.photoURL} />
                </div>
                <Typography gutterBottom variant='h4' component='h2'>
                    {displayName && displayName}
                </Typography>
                <Typography variant='body1' component='p'>
                    {occupation}
                </Typography>
                <Typography variant='body1' color='textSecondary' component='p'>
                    {location && `${location.state}, ${location.country}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' color='primary'>
                    Share
                </Button>
            </CardActions>
        </Card>
    );

    return (
        <>
            <CssBaseline />
            <Container maxWidth='md'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        {userCard}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Profile;
