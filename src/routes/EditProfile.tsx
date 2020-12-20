import React from 'react';
import { Link } from 'react-router-dom'
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    Container,
    CssBaseline,
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { PROFILE } from '../routes/routePaths';

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
        }
    }
}))



// TODO: Finish
const EditProfile = () => {
    const { profile, auth } = useSelector((state: RootStateOrAny) => state.firebase)
    const classes = useStyles()

    return (
        <Container maxWidth='md' className={classes.container}>
            <CssBaseline />
            <Grid container spacing={2} >
                <Grid item xs={12} sm={12} className={classes.gridItem}>
                    <Link to={`${PROFILE}/${auth.uid}`}>View Profile</Link>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.gridItem}>
                    fields
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditProfile;
