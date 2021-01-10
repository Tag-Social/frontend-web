import React from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    Typography,
    Card,
    CardContent,
    CardActionArea,
    CircularProgress,
    Box,
    Grid,
} from '@material-ui/core';

import { useStyles } from './styles'
import { checkProfileCompletion } from '../../firebase/utils/userProfile';
import { PROFILES } from '../../routes/routePaths';

const ProfileProgress = () => {
    const classes = useStyles()
    const { profile, auth } = useSelector((state: RootStateOrAny) => state.firebase);
    const { completedFields, fields } = checkProfileCompletion(profile);
    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`${PROFILES}/${auth.uid}`}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <Typography
                                variant='h5'
                                style={{ color: '#663695' }}
                            >
                                Complete Your Profile
                                    </Typography>
                            <Typography variant='subtitle1'>
                                A complete profile helps find your perfect
                                mentor.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Box position='relative' display='inline-flex'>
                                <CircularProgress
                                    variant='determinate'
                                    size={50}
                                    value={(completedFields * 100) / fields}
                                    style={{ color: '#663695' }}
                                />
                                <Box
                                    top={0}
                                    left={0}
                                    bottom={0}
                                    right={0}
                                    position='absolute'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    <Typography
                                        variant='body1'
                                        component='div'
                                        color='textSecondary'
                                    >{`${Math.round(
                                        (completedFields * 100) / fields
                                    )}%`}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};

export default ProfileProgress;
