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
    InputBase,
} from '@material-ui/core';
import { Search } from '@material-ui/icons'

import { useStyles } from './styles';
import { DASHBOARD, LOGIN, PROFILES, REGISTER } from '../../routes/routePaths';

// TODO : Finish search functionality
const Navbar = () => {
    const firebase = useFirebase();
    const auth = useSelector((state: RootStateOrAny) => state.firebase.auth);
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
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <Search />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <div>
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
                        <MenuItem
                            component={Link}
                            to={`${PROFILES}/${auth.uid}`}
                            onClick={handleClose}
                        >
                            Profile
                    </MenuItem>
                        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                    </Menu>
                )}
            </div>
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
        <div className={classes.root}>
            <AppBar
                position='fixed'
                className={classes.nav}
            >
                <Container maxWidth='lg' className={classes.container}>
                    <Toolbar>
                        <Typography variant='h5' className={classes.title}>
                            <Link to={DASHBOARD}>{logoImg}</Link>
                        </Typography>
                        {isLoaded(auth) && !isEmpty(auth) ? userNav : guestNav}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Navbar;
