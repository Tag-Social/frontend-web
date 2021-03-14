import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    IconButton,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { LocationOn, AssignmentInd, Person, Edit } from '@material-ui/icons';

import { useStyles } from './styles';
import { PROFILES } from '../../routes/routePaths';
import { RequestsButton } from '..';

const RecommendedMentors = ({ profile, auth }: any) => {
    const firestore = useFirestore();
    const [mentors, setMentors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const usersCollection = firestore.collection('users');
        const interests =
            profile.interests.length > 0 ? profile.interests : [''];
        usersCollection
            .where('__name__', '!=', auth.uid)
            .where('accountType', '==', 1)
            .where('interests', 'array-contains-any', interests)
            .get()
            .then((snapshot) => {
                const data: React.SetStateAction<any[]> = [];
                if (!snapshot.empty) {
                    snapshot.forEach((doc) =>
                        data.push({ ...doc.data(), id: doc.id })
                    );
                    setMentors(data);
                } else {
                    usersCollection
                        .where('__name__', '!=', auth.uid)
                        .where('accountType', '==', 1)
                        .limit(20)
                        .get()
                        .then((snapshot) => {
                            snapshot.forEach((doc) =>
                                data.push({ ...doc.data(), id: doc.id })
                            );
                            setMentors(data);
                        });
                }
                setLoading(false);
            });
    }, [firestore, auth.uid, profile]);
    const classes = useStyles();

    const mentorCards =
        mentors.length > 0 && !loading ? (
            mentors.map((mentor) => (
                <Card
                    className={classes.userCard}
                    key={`mentors-${mentor.id}`}
                    elevation={0}
                >
                    <CardActionArea
                        component={Link}
                        to={`${PROFILES}/${mentor.id}`}
                        className={classes.actionArea}
                    >
                        <CardMedia
                            component='img'
                            alt={mentor.displayName}
                            height='300'
                            image={
                                mentor.photoURL ||
                                'https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fdefault-banner.jpg?alt=media&token=425fde9f-6ae8-447b-8684-bf458e9a8255'
                            }
                            title={mentor.displayName}
                            className={classes.avatarContainer}
                        />
                        <CardContent>
                            <Typography
                                variant='h4'
                                component='h2'
                                className={classes.title}
                                gutterBottom
                            >
                                {mentor.displayName}
                            </Typography>

                            {mentor.occupation && (
                                <Typography
                                    variant='h6'
                                    color='textSecondary'
                                    component='p'
                                    className={classes.userInfoText}
                                >
                                    <AssignmentInd fontSize='small' />
                                    {mentor.occupation}
                                </Typography>
                            )}

                            {(mentor.location.state ||
                                mentor.location.province ||
                                mentor.location.country) && (
                                <Typography
                                    variant='h6'
                                    color='textSecondary'
                                    component='p'
                                    className={classes.userInfoText}
                                >
                                    <LocationOn fontSize='small' />
                                    {`${
                                        mentor.location.state ||
                                        mentor.location.province
                                    }${
                                        (mentor.location.state ||
                                            mentor.location.province) &&
                                        ','
                                    } ${mentor.location.country}`}
                                </Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.actions}>
                        <Button
                            startIcon={<Person />}
                            variant='contained'
                            component={Link}
                            to={`${PROFILES}/${mentor.id}`}
                            color='primary'
                            disableElevation
                        >
                            View Profile
                        </Button>
                        <RequestsButton
                            mentor={mentor.accountType === 1}
                            uid={mentor.id}
                            user={mentor}
                        />
                    </CardActions>
                </Card>
            ))
        ) : loading ? (
            <>
                <Skeleton variant='rect' width={350} height={500} />
                <Skeleton variant='rect' width={350} height={500} />
            </>
        ) : (
            <Typography variant='body1'>
                Sorry we have not found any mentors for you yet...
            </Typography>
        );

    return (
        <>
            <Typography
                variant='h6'
                component='h1'
                gutterBottom
                color='primary'
                style={{ marginLeft: '16px' }}
            >
                Recommened Mentors
            </Typography>
            <div className={classes.gridList}>
                <div></div>
                {mentorCards}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 16,
                        width: 300,
                    }}
                >
                    <Typography
                        variant='h6'
                        component='h1'
                        gutterBottom
                        color='primary'
                        align='center'
                    >
                        Update your interests for more matches!
                    </Typography>
                    <IconButton
                        color='primary'
                        style={{ border: '2px solid #673ab7' }}
                        component={Link}
                        to={`${PROFILES}/${auth.uid}`}
                    >
                        <Edit fontSize='large' />
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default RecommendedMentors;
