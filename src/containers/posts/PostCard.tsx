import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
    TextField,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Button,
} from '@material-ui/core';
import {
    Favorite,
    Share,
    ExpandMore,
    MoreVert,
    ThumbUp,
    Create,
} from '@material-ui/icons';

import { useStyles } from './styles';
import { PROFILES } from '../../routes/routePaths';

import { Reaction, Comment, Post } from '../../firebase/utils/posts';

type Props = {
    post: Post;
    auth: any;
};

const PostCard = ({ post, auth }: Props) => {
    const classes = useStyles();
    const firestore = useFirestore();
    const [expandedComments, setExpandedComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>(post.comments);
    const [reactions, setReactions] = useState<Reaction[]>(post.reactions);
    const [commentInput, setCommentInput] = useState('');

    useEffect(() => {
        setComments(comments.reverse());
        setReactions(post.reactions);
    }, [comments, post]);

    const handleExpandClick = () => {
        setExpandedComments(!expandedComments);
    };

    const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const comment = {
            id: uuidv4(),
            uid: auth.uid,
            username: auth.displayName,
            userAvatar: auth.photoURL,
            text: commentInput,
            date: new Date().toISOString(),
        };
        firestore
            .collection('posts')
            .doc(post.id)
            .update({
                comments: [...post.comments, comment],
            })
            .then(() => {
                setComments([...comments, comment]);
                setCommentInput('');
                setExpandedComments(true);
            });
    };

    const reactToPost = (type: 0 | 1) => {
        const exists = reactions.some(
            (r: Reaction) => r.type === type && r.uid === auth.uid
        );
        const reaction = {
            id: uuidv4(),
            uid: auth.uid,
            type,
            date: new Date().toISOString(),
        };
        let data = [] as Reaction[];
        if (exists) {
            data = reactions.filter(
                (r: Reaction) => r.type !== type && r.uid === auth.uid
            );
            setReactions(data);
        } else {
            data = [...reactions, reaction];
            setReactions(data);
        }
        firestore.collection('posts').doc(post.id).update({ reactions: data });
    };

    return (
        <Card className={classes.postCard}>
            <CardHeader
                avatar={
                    <Avatar
                        className={classes.postAvatar}
                        src={post.userAvatar}
                        component={Link}
                        to={`${PROFILES}/${post.uid}`}
                    />
                }
                title={post.userName}
                subheader={moment(post.date).fromNow()}
            />
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                    {post.text}
                </Typography>
            </CardContent>
            {post.media && (
                <CardMedia className={classes.media} image={post.media} />
            )}
            <Collapse in={expandedComments} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography variant='h6'>Comments</Typography>
                    <Divider />
                    <List>
                        {comments &&
                            comments.length > 0 &&
                            comments.map((comment) => (
                                <ListItem
                                    alignItems='flex-start'
                                    key={`comment-${comment.id}`}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={comment.username}
                                            src={comment.userAvatar}
                                            component={Link}
                                            to={`${PROFILES}/${comment.uid}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={comment.text}
                                        secondary={moment(
                                            comment.date
                                        ).fromNow()}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </CardContent>
            </Collapse>
            <CardActions disableSpacing>
                <Button
                    variant='outlined'
                    color='primary'
                    startIcon={<ThumbUp className={classes.like} />}
                    onClick={() => reactToPost(0)}
                    style={{ marginRight: 5 }}
                >
                    {reactions && reactions.filter((r) => r.type === 0).length}
                </Button>
                <Button
                    variant='outlined'
                    color='primary'
                    startIcon={<Favorite className={classes.love} />}
                    onClick={() => reactToPost(1)}
                >
                    {reactions && reactions.filter((r) => r.type === 1).length}
                </Button>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expandedComments,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expandedComments}
                    aria-label='show more'
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            <form onSubmit={submitComment}>
                <CardActions>
                    <Avatar
                        className={classes.commentAvatar}
                        src={auth.photoURL}
                    />
                    <TextField
                        color='primary'
                        size='small'
                        fullWidth
                        variant='outlined'
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <IconButton color='primary' type='submit'>
                        <Create />
                    </IconButton>
                </CardActions>
            </form>
        </Card>
    );
};

export default PostCard;
