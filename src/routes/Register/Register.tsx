import React from 'react';
import { Link as A } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Typography,
    Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../hooks';

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
}));

const Register: React.FC = () => {
    const classes = useStyles();
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        handleRegister,
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
                    Find your mentor today!
                </Typography>
                {error && (
                    <Alert className='alert' severity='error'>
                        {error}
                    </Alert>
                )}
                <form noValidate onSubmit={handleRegister}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Full Name'
                        autoComplete='name'
                        value={name}
                        autoFocus
                        onChange={({ target }) => setName(target.value)}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Email Address'
                        value={email}
                        autoComplete='email'
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
                    <Link component={A} to='/login' variant='body2'>
                        Already have an account? Sign in
                    </Link>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.button}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Register;
