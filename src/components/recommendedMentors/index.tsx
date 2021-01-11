import React from 'react';
import { Link } from 'react-router-dom'
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Avatar,
    Paper
} from '@material-ui/core';

import { useStyles } from './styles';
import { UserProfile } from '../../firebase/utils/userProfile';
import { PROFILES } from '../../routes/routePaths'

interface Props {
    profile: UserProfile
}

interface Mentor extends UserProfile {
    id: string
}
// TODO : Add action buttons
const RecommendedMentors = ({ profile }: Props) => {
    const interests = (profile.interests && profile.interests.length > 0) ? profile.interests : ['none']
    useFirestoreConnect(() => [{
        collection: 'users'
    }]);
    const mentorsData = useSelector(
        ({ firestore: { data } }: RootStateOrAny) =>
            data.users
    );

    const mentors = (): Mentor[] => {
        if (mentorsData) {
            return Object.keys(mentorsData).map(id => ({ ...mentorsData[id], id }))
        }
        return []
    }

    const classes = useStyles();
    return (
        <Paper elevation={0} className={classes.container}>
            <Typography variant='h5' component='h1' gutterBottom color='primary'>
                Recommened Mentors
            </Typography>
            <div className={classes.gridList}>
                <div></div>
                {mentors().map((mentor) => (
                    <Card className={classes.userCard} key={`mentors-${mentor.id}`}>
                        <CardActionArea
                            component={Link}
                            to={`${PROFILES}/${mentor.id}`}
                            className={classes.actionArea}
                        >
                            <CardMedia
                                component='img'
                                alt='Banner'
                                height='75'
                                image='https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fdefault-banner.jpg?alt=media&token=425fde9f-6ae8-447b-8684-bf458e9a8255'
                                title='Banner'
                            />
                            <Avatar
                                className={classes.avatarContainer}
                                alt={mentor.displayName?.toString()}
                                src={mentor.photoURL}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='h5'
                                    component='h2'
                                >
                                    {mentor.displayName}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    component='p'
                                >
                                    {mentor.occupation}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    component='p'
                                >
                                    {`${(mentor.location.state || mentor.location.province)}${(mentor.location.state || mentor.location.province) && ','} ${mentor.location.country}`}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </Paper>
    );
}

export default RecommendedMentors
