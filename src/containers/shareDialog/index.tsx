import React from 'react';
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    IconButton,
    TextField,
} from '@material-ui/core';
import { FileCopy, Facebook, Twitter, LinkedIn } from '@material-ui/icons';

import { useStyles } from './styles'

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    url: string;
};

const ShareDialog = ({ open, setOpen, url }: Props) => {
    const classes = useStyles()
    const copyLink = () => {
        navigator.clipboard.writeText(url);
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='responsive-dialog-title'
        >
            <DialogTitle id='responsive-dialog-title'>
                {'Share this profile!'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className={classes.socialLinks}>
                            <IconButton
                                href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                                target='_blank'
                            >
                                <Facebook fontSize='large' className={classes.faceBook} />
                            </IconButton>
                            <IconButton
                                href={`https://twitter.com/intent/tweet?url=${url}`}
                                target='_blank'
                            >
                                <Twitter fontSize='large' className={classes.twitter} />
                            </IconButton>
                            <IconButton
                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
                                target='_blank'
                            >
                                <LinkedIn fontSize='large' className={classes.linkedIn} />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='input-with-icon-textfield'
                                label='Copy Link'
                                fullWidth
                                value={url}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton onClick={copyLink}>
                                            <FileCopy color='primary' />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={() => setOpen(false)}
                    color='primary'
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShareDialog;
