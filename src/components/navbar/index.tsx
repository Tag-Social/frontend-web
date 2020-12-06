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

import {useStyles} from './styles'
import logo from '../../images/Logo.svg';
import { DASHBOARD, LOGIN, REGISTER } from '../../routes/routePaths'

const Navbar = () => {
    const firebase = useFirebase()
    const auth = useSelector((state: RootStateOrAny) => state.firebase.auth);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null);
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
                    id='menu-appbar'
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
                    <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                </Menu>
            )}
        </div>
    );

    const guestNav = (
        <div>
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
        </div>
    );

    const logoImg = (
        <img
            src={logo}
            style={{ width: '100px', height: 'auto', paddingTop:'12px' }}
            alt='Tag logo'
        />
    );

    return (
        <div className={classes.root}>
            <AppBar
                position='fixed'
                color='transparent'
                className={classes.nav}
            >
                <Container maxWidth='lg'>
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
