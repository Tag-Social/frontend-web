import React from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Container, CssBaseline, Grid, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PROFILES } from '../routePaths';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    gridItem: {
        [theme.breakpoints.down('xs')]: {
            paddingRight: '0 !important',
            paddingLeft: '0 !important',
        },
    },
}));

// TODO: Finish
const EditProfile = () => {
    const { profile, auth } = useSelector(
        (state: RootStateOrAny) => state.firebase
    );
    const classes = useStyles();

    return (
        <Container maxWidth='md' className={classes.container}>
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} className={classes.gridItem}>
                    <Link to={`${PROFILES}/${auth.uid}`}>View Profile</Link>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.gridItem}>
                    <Typography variant='h6' gutterBottom>
                        Shipping address
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='firstName'
                                name='firstName'
                                label='First name'
                                fullWidth
                                autoComplete='given-name'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='lastName'
                                name='lastName'
                                label='Last name'
                                fullWidth
                                autoComplete='family-name'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='address1'
                                name='address1'
                                label='Address line 1'
                                fullWidth
                                autoComplete='shipping address-line1'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='address2'
                                name='address2'
                                label='Address line 2'
                                fullWidth
                                autoComplete='shipping address-line2'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='city'
                                name='city'
                                label='City'
                                fullWidth
                                autoComplete='shipping address-level2'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='state'
                                name='state'
                                label='State/Province/Region'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='zip'
                                name='zip'
                                label='Zip / Postal code'
                                fullWidth
                                autoComplete='shipping postal-code'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='country'
                                name='country'
                                label='Country'
                                fullWidth
                                autoComplete='shipping country'
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditProfile;
