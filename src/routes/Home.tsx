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

import { useAuth } from '../hooks';
import image from '../images/asset1.svg';
import googleIcon from '../images/googleIcon';
import { PASSWORD_RESET } from './routePaths';

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#653695',
        opacity: 0.7,
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

const Home: React.FC = () => {
    const classes = useStyles();
    const { signIn, providerSignIn, setEmail, setPassword, error } = useAuth();

    return (
        <>
            <CssBaseline />
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography
                            component='h1'
                            variant='h3'
                            className={classes.title}
                        >
                            Welcome to your mentorship community
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
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                            />
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
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
                                onClick={() => providerSignIn('google')}
                                className={classes.button}
                            >
                                {googleIcon}
                                Sign In with Google
                            </Button>
                            <Button
                                fullWidth
                                variant='contained'
                                className={classes.facebook}
                                onClick={() => providerSignIn('facebook')}
                            >
                                <FacebookIcon />
                                Sign In with Facebook
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <img
                            src={image}
                            alt=''
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;
