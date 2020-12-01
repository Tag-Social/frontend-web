import React, { FormEvent, useState } from 'react';
import { Link as A, Redirect, useHistory } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles'

import {auth} from '../firebase'

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
}));

const Register = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles()

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) =>{
                if(result.user){
                    result.user
                    .updateProfile({
                        displayName: name,
                    })
                    .then(() => {
                        history.push('/');
                    })
                }
            })
            .catch((error) => {
                setError(error.message);
                setTimeout(() => setError(''), 5000);
            });
    };

    if (auth.currentUser) {
        return <Redirect to='/' />;
    }
    return (
        <>
            <CssBaseline />
            <div className={classes.root}>
                <Typography component='h1' variant='h4' className={classes.title}>
                    Find your mentor today!
                </Typography>
                {error && (
                    <Alert className='alert' severity='error'>
                        {error}
                    </Alert>
                )}
                <form
                    noValidate
                    onSubmit={handleRegister}
                >
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Full Name'
                        autoComplete='name'
                        autoFocus
                        onChange={({ target }) => setName(target.value)}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Email Address'
                        autoComplete='email'
                        onChange={({ target }) =>
                            setEmail(target.value)
                        }
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Password'
                        type='password'
                        autoComplete='current-password'
                        onChange={({ target }) =>
                            setPassword(target.value)
                        }
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
        </>
    );
};

export default Register;
