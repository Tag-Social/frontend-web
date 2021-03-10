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
    IconButton
} from '@material-ui/core';
import { LocationOn, AssignmentInd, Person, Edit } from '@material-ui/icons';

import { useStyles } from './styles';
import { PROFILES } from '../../routes/routePaths';
import { RequestsButton } from '..';

// TODO : Add actions to connection buttons and add interests
const RecommendedMentors = ({ profile, auth }: any) => {
    const firestore = useFirestore();
    const [mentors, setMentors] = useState<any[]>([]);

    useEffect(() => {
        const interests =
            profile.interests && profile.interests.length > 0
                ? profile.interests
                : ['none'];
        const usersCollection = firestore.collection('users');
        usersCollection
            .where('__name__', '!=', auth.uid)
            .where('accountType', '==', 1)
            .where('interests', 'in', interests)
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
                        .get()
                        .then((snapshot) => {
                            snapshot.forEach((doc) =>
                                data.push({ ...doc.data(), id: doc.id })
                            );
                            setMentors(data);
                        });
                }
            });
    }, [firestore, auth.uid, profile,]);
    const classes = useStyles();

    const mentorCards =
        mentors.length > 0 ? (
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
                            image={mentor.photoURL}
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
