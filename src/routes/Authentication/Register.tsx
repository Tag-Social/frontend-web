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

import { useAuth } from '../../hooks';
import { useStyles } from './styles';

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

    document.title = 'Tag | Register'
    return (
        <Container>
            <CssBaseline />
            <div className={classes.root}>
                <Typography
                    component='h1'
                    variant='h4'
                    className={classes.title}
                >
                    Find your mentor or become a mentor today!
                </Typography>
                {error && (
                    <Alert className='alert' severity='error'>
                        {error.message}
                    </Alert>
                )}
                <form onSubmit={handleRegister}>
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
                        disabled={!email || !name || !password}
                        type='submit'
                        disableElevation
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
