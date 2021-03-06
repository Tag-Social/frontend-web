import React from 'react';
import { Link } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Fab,
} from '@material-ui/core';
import {
    Add,
    Home,
    People,
    NotificationsActive,
    Chat,
} from '@material-ui/icons';
import { useStyles } from './styles';

import {
    CONNECTIONS,
    HOME,
    NOTIFICATIONS,
    MESSAGING,
} from '../../routes/routePaths';
import { NewMessageIndicator } from '..';


const BottomNavbar = () => {
    const [
        auth,
        profile,
    ] = useSelector(({ firebase: { auth, profile } }: RootStateOrAny) => [
        auth,
        profile,
    ]);
    const classes = useStyles();

    return isLoaded(auth) && !isEmpty(auth) && profile.onboarded ? (
        <AppBar position='fixed' className={classes.bottomNav}>
            <Toolbar
                style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
                <IconButton
                    edge='start'
                    color='inherit'
                    component={Link}
                    to={HOME}
                >
                    <Home fontSize='large' />
                </IconButton>
                <IconButton color='inherit' component={Link} to={CONNECTIONS}>
                    <People fontSize='large' />
                </IconButton>
                <IconButton
                    edge='end'
                    color='inherit'
                    component={Link}
                    to={MESSAGING}
                >
                    <NewMessageIndicator>
                        <Chat fontSize='large' />
                    </NewMessageIndicator>
                </IconButton>
            </Toolbar>
        </AppBar>
    ) : null;
};

export default BottomNavbar;
