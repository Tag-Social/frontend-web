import React from 'react';
import { Link } from 'react-router-dom';
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

const ProfileProgress = ({ profile, auth }: any) => {
    const classes = useStyles()
    const { completedFields, fields } = checkProfileCompletion(profile);
    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`${PROFILES}/${auth.uid}`}>
                <CardContent>
                    <Grid container >
                        <Grid item xs={10}>
                            <Typography
                                variant='body2'
                                style={{ color: '#663695' }}
                            >
                                Complete Your Profile
                                    </Typography>
                            <Typography variant='caption' className={classes.caption}>
                                A complete profile helps find your perfect
                                mentor.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Box position='relative' display='inline-flex'>
                                <CircularProgress
                                    variant='determinate'
                                    size={45}
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
                                        variant='body2'
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
