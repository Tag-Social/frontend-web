import { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useSelector, RootStateOrAny } from 'react-redux';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { Facebook, HighlightOff } from '@material-ui/icons';

import { useStyles } from './styles';
import GoogleIcon from '../../icons/GoogleIcon';
import firebase from '../../firebase/firebaseConfig';

const DeleteAccountButton = () => {
    const rrfirebase = useFirebase();
    const classes = useStyles();
    const auth = useSelector(({ firebase: { auth } }: RootStateOrAny) => auth);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(true);
    const [password, setPassword] = useState('');

    const deleteAccount = () => {
        rrfirebase
            .auth()
            .currentUser?.delete()
            .then(() => {
                console.log('Account Deleted');
            })
            .catch((err) => {
                if (err) {
                    setError('Please reauthenticate to delete account.');
                    setAuthenticated(false);
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
                if (err) {
                    setError(
                        'There has been an error with your provider. Please try again.'
                    );
                    setAuthenticated(false);
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
                if (err) {
                    setError('Invalid Credentials');
                    setAuthenticated(false);
                }
            });
    };

    return (
        <>
            <Button
                variant='contained'
                color='primary'
                className={classes.delete}
                onClick={() => setConfirmDelete(true)}
                disableElevation
                endIcon={<HighlightOff />}
            >
                Delete Account
            </Button>
            <Dialog
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    Delete Account
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Deleting your account cannot be undone.{' '}
                    </DialogContentText>
                </DialogContent>
                {error.length > 1 && <Alert severity='error'>{error}</Alert>}
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
                        onClick={() => setConfirmDelete(false)}
                        color='primary'
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.delete}
                        onClick={deleteAccount}
                        disableElevation
                    >
                        Delete Account
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteAccountButton;
