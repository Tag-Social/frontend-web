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

import { checkProfileCompletion } from '../../firebase/utils/userProfile';
import { PROFILE } from '../../routes/routePaths';

const ProfileProgress = () => {
    const { profile } = useSelector((state: RootStateOrAny) => state.firebase);
    const { completedFields, fields } = checkProfileCompletion(profile);
    return (
        <Card>
            <CardActionArea component={Link} to={PROFILE}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item>
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
                            <Typography variant='body1'>
                                Your will recieve 5 tags when you complete
                                your profile!
                                    </Typography>
                        </Grid>
                        <Grid item>
                            <Box position='relative' display='inline-flex'>
                                <CircularProgress
                                    variant='determinate'
                                    size={80}
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
                                        variant='h5'
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
