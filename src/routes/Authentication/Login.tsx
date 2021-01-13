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

import { useStyles } from './styles';
import GoogleIcon from '../../icons/GoogleIcon'
import { useAuth } from '../../hooks';
import { PASSWORD_RESET, REGISTER } from '../routePaths';


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
                        className={classes.google}
                        onClick={() => providerSignIn('google')}
                    >
                        <i className={classes.icon}>
                            {GoogleIcon}
                        </i>
                        Sign In with Google
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        className={classes.facebook}
                        onClick={() => providerSignIn('facebook')}
                    >
                        <FacebookIcon className={classes.icon} />
                        Sign In with Facebook
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;
