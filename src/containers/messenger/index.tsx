import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useMediaQuery,
    useTheme,
    IconButton,
    List,
    Typography,
} from '@material-ui/core';
import { Create, ArrowBack } from '@material-ui/icons';

import { useStyles } from './styles';
import Message from './Message';

const Messenger = () => {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(true);

    const user = {
        uid: 1,
    };

    const msg = {
        text: 'Hi',
        date: new Date().toISOString(),
        uid: 1,
        photoURL:
            'https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/SebOf75rMtTSraO9MPU3Eeh9c262%2Favatar%2F0B4AEE5C-118E-49A1-B889-CF996ADBF4E6.jpeg?alt=media&token=93efd023-07b5-40ca-9205-101a2eeae4dd',
        displayName: 'Bob',
    };
    const msg2 = {
        text: 'Hello',
        date: new Date().toISOString(),
        uid: 2,
        photoURL:
            'https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/SebOf75rMtTSraO9MPU3Eeh9c262%2Favatar%2F0B4AEE5C-118E-49A1-B889-CF996ADBF4E6.jpeg?alt=media&token=93efd023-07b5-40ca-9205-101a2eeae4dd',
        displayName: 'Phil',
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            scroll='paper'
            open={open}
            onClose={handleClose}
            aria-labelledby='responsive-dialog-title'
        >
            <DialogTitle>
                <IconButton onClick={handleClose}>
                    <ArrowBack />
                </IconButton>
                User
            </DialogTitle>
            <DialogContent className={classes.messengerContainer}>
                <List className={classes.messageList}>
                    <Message key={1} data={msg} user={user} />
                    <Message key={2} data={msg2} user={user} />
                    <Message key={3} data={msg} user={user} />
                    <Message key={4} data={msg2} user={user} />
                </List>
            </DialogContent>
            <form>
                <DialogActions>
                    <Grid container spacing={1} justify='center'>
                        <Grid item xs={10}>
                            <TextField
                                placeholder='Write a message'
                                variant='outlined'
                                size='small'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton color='primary' type='submit'>
                                <Create />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default Messenger;
