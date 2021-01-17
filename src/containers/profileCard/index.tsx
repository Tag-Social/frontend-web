import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    Chip,
    Grid,
} from '@material-ui/core';

import { PROFILES } from '../../routes/routePaths';
import { useStyles } from './styles';
import ProfileProgress from '../profileProgress';

const ProfileCard = ({ profile, auth }: any) => {
    const classes = useStyles();
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ProfileProgress profile={profile} auth={auth} />
            </Grid>
            <Grid item className={classes.cardContainer}>
                <Card>
                    <CardActionArea
                        component={Link}
                        to={`${PROFILES}/${auth.uid}`}
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
                            alt={profile.displayName?.toString()}
                            src={profile.photoURL}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h5'
                                component='h2'
                            >
                                {profile.displayName}
                            </Typography>
                            <Typography
                                variant='body2'
                                color='textSecondary'
                                component='p'
                            >
                                {profile.occupation}
                            </Typography>
                            <Typography
                                variant='body2'
                                color='textSecondary'
                                component='p'
                            >
                                {profile.bio}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    {profile.interests && (
                        <>
                            <Divider variant='middle' />
                            <CardContent>
                                <Typography variant='body1' component='p'>
                                    Interests
                                </Typography>
                                <div className={classes.chips}>
                                    {profile.interests.map((s: string, i: number) => (
                                        <Chip
                                            key={`interests-${i}`}
                                            label={s}
                                            color='primary'
                                            size='small'
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </>
                    )}
                    {profile.skills && (
                        <>
                            <Divider variant='middle' />
                            <CardContent>
                                <Typography variant='body1' component='p'>
                                    Skills
                                </Typography>
                                <div className={classes.chips}>
                                    {profile.skills.map((s: string, i: number) => (
                                        <Chip
                                            key={`skills-${i}`}
                                            label={s}
                                            color='primary'
                                            size='small'
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </>
                    )}
                </Card>
            </Grid>
        </Grid>
    );
};

export default ProfileCard;
