import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useFirestore } from 'react-redux-firebase';
import {
    Typography,
    Fab,
    Card,
    CardActions,
    Avatar,
    Button,
    Grid,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    useTheme,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import { Edit, Close } from '@material-ui/icons';

import { useStyles } from './styles';
import { Post } from '../../firebase/utils/posts';
import { firestore } from '../../firebase/firebaseConfig';

const CreatePost = ({ auth }: any) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [postData, setPostData] = useState<Post>({
        id: uuidv4(),
        uid: auth.uid,
        userName: auth.displayName,
        userAvatar: auth.photoURL,
        text: '',
        media: '',
        date: '',
        reactions: [],
        comments: [],
    });

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPostData({
            ...postData,
            text: e.target.value,
            date: new Date().toISOString(),
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const savePost = () => {
        firestore.collection('posts').doc(postData.id).set(postData);
        setOpen(false);
    };

    return (
        <div className={classes.postCard}>
            <Card>
                <CardActions onClick={() => setOpen(true)}>
                    <Avatar
                        className={classes.postAvatar}
                        src={auth.photoURL}
                    />
                    <Button
                        color='primary'
                        size='small'
                        fullWidth
                        variant='outlined'
                        onClick={() => setOpen(true)}
                    >
                        Whats on your mind?
                    </Button>
                    <Edit color='primary' />
                </CardActions>
            </Card>
            <Fab
                className={classes.fabButton}
                color='primary'
                aria-label='post'
            >
                <Edit onClick={() => setOpen(true)} />
            </Fab>
            <Dialog
                fullScreen={fullScreen}
                scroll='paper'
                open={open}
                onClose={handleClose}
                aria-labelledby='responsive-dialog-title'
            >
                <DialogActions id='responsive-dialog-title'>
                    <Typography variant='h5'>Create Post</Typography>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogActions>
                <Divider variant='middle' />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar
                                        className={classes.postAvatar}
                                        src={auth.photoURL}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant='h6'
                                            style={{ marginLeft: 5 }}
                                        >
                                            {auth.displayName}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                placeholder="What's on your mind?"
                                multiline
                                name='text'
                                fullWidth
                                value={postData.text}
                                onChange={onChange}
                                variant='outlined'
                            />
                            <Button
                                fullWidth
                                color='primary'
                                variant='contained'
                                disableElevation
                                className={classes.postButton}
                                onClick={savePost}
                            >
                                Post
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreatePost;
