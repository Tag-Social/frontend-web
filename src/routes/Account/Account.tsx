import { useState, useEffect } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { Check, Facebook } from '@material-ui/icons';

import { useStyles } from './styles';
import GoogleIcon from '../../icons/GoogleIcon';
import DeleteAccountButton from '../../containers/buttons/DeleteAccountButton';
import firebase from '../../firebase/firebaseConfig';

const Account = () => {
    const classes = useStyles();
    const rrfirebase = useFirebase();
    const [
        auth,
        profile,
    ] = useSelector(({ firebase: { auth, profile } }: RootStateOrAny) => [
        auth,
        profile,
    ]);
    const [authenticated, setAuthenticated] = useState(true);
    const [error, setError] = useState({
        type: '',
        message: '',
    });
    const [success, setSuccess] = useState('');
    const [previousEmail, setPreviousEmail] = useState(auth.email);
    const [email, setEmail] = useState(auth.email);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    useEffect(() => {
        if (error) {
            setTimeout(
                () =>
                    setError({
                        type: '',
                        message: '',
                    }),
                10000
            );
        }
        if (success) {
            setTimeout(() => setSuccess(''), 10000);
        }
    }, [success, error]);

    const saveEmail = () => {
        rrfirebase
            .updateEmail(email)
            .then(() => {
                setSuccess('Your account email has been updated!');
                setPreviousEmail(email);
            })
            .catch((err) => {
                console.error(err.message);
                if (err.code === 'auth/requires-recent-login')
                    setAuthenticated(false);
                if (
                    err.code ===
                    ('auth/invalid-email' || 'auth/email-already-in-use')
                ) {
                    setError({
                        type: 'email',
                        message: err.message,
                    });
                }
            });
    };

    const updatePassword = () => {
        firebase
            .auth()
            .currentUser?.updatePassword(newPassword)
            .then(() => {
                setSuccess('Your Password has been updated');
                setNewPassword('');
            })
            .catch((err) => {
                console.error(err.message);
                if (err.code === 'auth/requires-recent-login') {
                    setAuthenticated(false);
                }
                if (err.code === 'auth/weak-password') {
                    setError({
                        type: 'password',
                        message: err.message,
                    });
                }
            });
    };

    const reAuthenticateWithProvider = (provider: 'facebook' | 'google') => {
        rrfirebase
            .reauthenticate({
                provider,
                type: 'popup',
            })
            .then(() => setAuthenticated(true))
            .catch((err) => {
                if (err.code === 'auth/requires-recent-login') {
                    setError({
                        type: 'auth',
                        message: err.message,
                    });
                }
            });
    };

    const reAuthenticateWithPassword = (password: string) => {
        rrfirebase
            .reauthenticate({
                credential: firebase.auth.EmailAuthProvider.credential(
                    auth.email,
                    password
                ),
            })
            .then(() => setAuthenticated(true))
            .catch((err) => {
                if (err.code === 'auth/requires-recent-login') {
                    setError({
                        type: 'auth',
                        message: err.message,
                    });
                }
            });
    };

    return (
        <Container maxWidth='md'>
            <Typography variant='h5' color='primary' gutterBottom>
                My Account
            </Typography>
            <Card className={classes.card}>
                {error.type === 'auth' && (
                    <Alert severity='error'>{error.message}</Alert>
                )}
                {success && <Alert severity='success'>{success}</Alert>}
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid container item xs={12} md={6} spacing={3}>
                            <Grid item container xs={12}>
                                <TextField
                                    fullWidth
                                    value={auth?.displayName}
                                    disabled
                                    label='Name'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={error.type === 'email'}
                                    helperText={
                                        error.type === 'email'
                                            ? error.message
                                            : ''
                                    }
                                    fullWidth
                                    value={email}
                                    label='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {email !== previousEmail && (
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        disableElevation
                                        endIcon={<Check />}
                                        size='small'
                                        onClick={saveEmail}
                                        style={{ marginTop: 16 }}
                                    >
                                        Save
                                    </Button>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={error.type === 'password'}
                                    helperText={
                                        error.type === 'password'
                                            ? error.message
                                            : ''
                                    }
                                    fullWidth
                                    value={newPassword}
                                    label='New Password'
                                    type='password'
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                                {newPassword && (
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        disableElevation
                                        endIcon={<Check />}
                                        size='small'
                                        onClick={updatePassword}
                                        style={{ marginTop: 16 }}
                                    >
                                        Update Password
                                    </Button>
                                )}
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <DeleteAccountButton />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Dialog
                open={!authenticated}
                onClose={() => setAuthenticated(true)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    Reauthenticate Account
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        You must reauthenticate your account to make this
                        change.
                    </DialogContentText>
                </DialogContent>
                <DialogContent>
                    {!authenticated && (
                        <form
                            noValidate
                            onSubmit={(e) => {
                                e.preventDefault();
                                reAuthenticateWithPassword(password);
                            }}
                        >
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                value={password}
                                label='Password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                Reauthenticate
                            </Button>
                            {auth.providerData.some(
                                (i: any) => i.providerId === 'google.com'
                            ) && (
                                <Button
                                    startIcon={GoogleIcon}
                                    fullWidth
                                    variant='contained'
                                    color='secondary'
                                    size='small'
                                    onClick={() =>
                                        reAuthenticateWithProvider('google')
                                    }
                                    className={classes.google}
                                >
                                    Google
                                </Button>
                            )}
                            {auth.providerData.some(
                                (i: any) => i.providerId === 'facebook.com'
                            ) && (
                                <Button
                                    startIcon={<Facebook />}
                                    fullWidth
                                    variant='contained'
                                    className={classes.facebook}
                                    size='small'
                                    onClick={() =>
                                        reAuthenticateWithProvider('facebook')
                                    }
                                >
                                    Facebook
                                </Button>
                            )}
                        </form>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setAuthenticated(true)}
                        color='primary'
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Account;
