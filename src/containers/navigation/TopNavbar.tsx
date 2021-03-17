import React, { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Menu,
    MenuItem,
    Avatar,
    Container,
} from '@material-ui/core';
import { People, /*NotificationsActive,*/ Chat } from '@material-ui/icons';

import { useStyles } from './styles';
// import { UserSearchBar } from '..';
import {
    DASHBOARD,
    LOGIN,
    PROFILES,
    REGISTER,
    CONNECTIONS,
    // NOTIFICATIONS,
    MESSAGING,
    MY_ACCOUNT,
} from '../../routes/routePaths';

// TODO : Finish search functionality
const TopNavbar = () => {
    const firebase = useFirebase();
    const [
        auth,
        profile,
    ] = useSelector(({ firebase: { auth, profile } }: RootStateOrAny) => [
        auth,
        profile,
    ]);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
        null
    );
    const open = Boolean(anchorEl);

    const handleMenu = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        firebase.auth().signOut();
        handleClose();
    };

    const userNav = (
        <>
            {profile.onboarded && (
                <div className={classes.topNavUserActions}>
                    <IconButton
                        color='primary'
                        component={Link}
                        to={CONNECTIONS}
                    >
                        <People fontSize='large' />
                    </IconButton>
                    <IconButton color='primary' component={Link} to={MESSAGING}>
                        <Chat fontSize='large' />
                    </IconButton>
                </div>
            )}
            <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
            >
                <Avatar
                    alt={auth.displayName || undefined}
                    src={auth.photoURL || undefined}
                />
            </IconButton>
            {auth && (
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    {profile.onboarded && (
                        <>
                            <MenuItem
                                component={Link}
                                to={`${PROFILES}/${auth.uid}`}
                                onClick={handleClose}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to={MY_ACCOUNT}
                                onClick={handleClose}
                            >
                                My Account
                            </MenuItem>
                        </>
                    )}

                    <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                </Menu>
            )}
        </>
    );

    const guestNav = (
        <>
            <Button component={Link} to={LOGIN}>
                Login
            </Button>
            <Button
                component={Link}
                to={REGISTER}
                variant='outlined'
                color='primary'
            >
                Sign Up
            </Button>
        </>
    );

    const logoImg = (
        <img
            src='https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fassets%2Flogo.svg?alt=media&token=16b8288b-042e-4e68-8dda-5de15c3c7d1f'
            className={classes.logo}
            alt='Tag logo'
        />
    );

    return (
        <AppBar position='fixed' className={classes.topNav}>
            <Container maxWidth='lg' className={classes.container}>
                <Toolbar>
                    <Typography variant='h5' className={classes.title}>
                        <Link to={DASHBOARD}>{logoImg}</Link>
                    </Typography>
                    {isLoaded(auth) && !isEmpty(auth) ? userNav : guestNav}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default TopNavbar;
