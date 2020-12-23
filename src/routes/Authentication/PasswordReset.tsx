import React from 'react'
import { Link as A } from 'react-router-dom'
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Typography,
    Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { useAuth } from '../../hooks'
import { useStyles } from './styles';


// TODO: Refactor to get a password code to reset on page

const PasswordReset: React.FC = () => {
    const { email, setEmail, resetPassword, resetSuccess, resetError } = useAuth()
    const classes = useStyles()
    return (
        <Container maxWidth='xs'>
            <CssBaseline />
            <div className={classes.root}>
                <Typography component='h1' variant='h5'>
                    Reset Password
                </Typography>
                {resetError && (
                    <Alert className='alert' severity='error'>
                        {resetError.message}
                    </Alert>
                )}
                {!resetSuccess ? (
                    <form
                        className='auth-form'
                        noValidate
                        onSubmit={resetPassword}
                    >
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
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.button}
                        >
                            Reset
                        </Button>
                    </form>
                ) : (
                        <Typography component='h1' variant='h6'>
                            Email with instructions has been sent.
                        </Typography>
                    )}
                <Link component={A} to='/login' variant='body2'>
                    Go back to Login
                </Link>
            </div>
        </Container>
    );
}

export default PasswordReset
