import React, { FormEvent, useState } from 'react';
import { Link as A, Redirect } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Divider,
    Link,
    Grid,
    Typography,
    SvgIcon,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import FacebookIcon from '@material-ui/icons/Facebook';
import {makeStyles} from '@material-ui/core/styles'

import firebase, { auth } from '../firebase';

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        maxWidth: '400px',
    },
    title: {
       color: '#653695',
    },
    button: {
        margin: theme.spacing(1, 0),
        borderRadius: '50px',
        padding: '0.75rem 0',
        fontWeight: 600
    },
    facebook:  {
        margin: theme.spacing(1, 0),
        borderRadius: '50px',
        padding: '0.75rem 0',
        fontWeight: 600,
        backgroundColor: '#3b5998',
        color: '#ffffff',
    }
}));


const Login = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles()

    const signIn = (e: FormEvent) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            setError(error.message);
            setTimeout(() => setError(''), 5000);
        });
    };
    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch((error) => {
            setError(error.message);
            setTimeout(() => setError(''), 5000);
        });;
    };

    const fbSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider).catch((error) => {
            setError(error.message);
            setTimeout(() => setError(''), 5000);
        });;
    };

    const googleIcon = (
        <SvgIcon className='button-icon'>
            <svg>
                <path
                    fill='currentColor'
                    d='M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z'
                />
            </svg>
        </SvgIcon>
    );

    if (auth.currentUser) {
        return <Redirect to='/' />;
    }
    return (
        <>
            <CssBaseline />
            <div className={classes.root}>
                <Typography component='h1' variant='h4' className={classes.title}>
                    Sign in
                </Typography>
                {error && (
                    <Alert className='alert' severity='error'>
                        {error}
                    </Alert>
                )}
                <form noValidate onSubmit={signIn}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Email Address'
                        autoComplete='email'
                        autoFocus
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Password'
                        type='password'
                        autoComplete='current-password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Grid container>
                        <Grid item xs>
                            <Link
                                component={A}
                                to='/resetpassword'
                                variant='body2'
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={A} to='/register' variant='body2'>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.button}
                    >
                        Sign In
                    </Button>
                    <Divider />
                    <Button
                        fullWidth
                        variant='contained'
                        color='secondary'
                        className={classes.button}
                        onClick={googleSignIn}
                    >
                        {googleIcon}
                        Sign In with Google
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        className={classes.facebook}
                        onClick={fbSignIn}
                    >
                        <FacebookIcon className='button-icon' />
                        Sign In with Facebook
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Login;
