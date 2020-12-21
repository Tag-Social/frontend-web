import React from 'react';
import { Link as A } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Divider,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import FacebookIcon from '@material-ui/icons/Facebook';
import { makeStyles } from '@material-ui/core/styles';

import GoogleIcon from '../icons/GoogleIcon'
import { useAuth } from '../hooks';
import { PASSWORD_RESET, REGISTER } from './routePaths';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        fontWeight: 600,
    },
    facebook: {
        margin: theme.spacing(1, 0),
        borderRadius: '50px',
        padding: '0.75rem 0',
        fontWeight: 600,
        backgroundColor: '#3b5998',
        color: '#ffffff',
    },
}));

const Login: React.FC = () => {
    const classes = useStyles();
    const {
        signIn,
        providerSignIn,
        email,
        setEmail,
        password,
        setPassword,
        error,
    } = useAuth();

    return (
        <Container>
            <CssBaseline />
            <div className={classes.root}>
                <Typography
                    component='h1'
                    variant='h4'
                    className={classes.title}
                >
                    Sign in
                </Typography>
                {error && (
                    <Alert className='alert' severity='error'>
                        {error.message}
                    </Alert>
                )}
                <form noValidate onSubmit={signIn}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Email Address'
                        value={email}
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
                        value={password}
                        type='password'
                        autoComplete='current-password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Grid container>
                        <Grid item xs>
                            <Link
                                component={A}
                                to={PASSWORD_RESET}
                                variant='body2'
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={A} to={REGISTER} variant='body2'>
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
                        onClick={() => providerSignIn('google')}
                    >
                        {GoogleIcon}
                        Sign In with Google
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        className={classes.facebook}
                        onClick={() => providerSignIn('facebook')}
                    >
                        <FacebookIcon className='button-icon' />
                        Sign In with Facebook
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;
