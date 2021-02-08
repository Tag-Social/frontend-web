import React, { useEffect, useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import { useStyles } from './styles';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

const Posts = () => {
    const classes = useStyles();
    const firestore = useFirestore();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<any[]>();
    const [
        profile,
        auth,
        { mentors, mentees, following, followers },
    ] = useSelector(({ relationships, firebase }: RootStateOrAny) => [
        firebase.profile,
        firebase.auth,
        relationships,
    ]);

    useEffect(() => {
        setLoading(true);
        firestore
            .collection('posts')
            .where('uid', 'in', [
                ...mentees.map((u: { uid2: string }) => u.uid2),
                ...mentors.map((u: { uid1: string }) => u.uid1),
                ...following.map((u: { uid2: string }) => u.uid2),
                ...followers.map((u: { uid1: string }) => u.uid1),
                auth.uid,
            ])
            .get()
            .then((snapshot) => {
                const data: React.SetStateAction<any[]> = [];
                snapshot.forEach((doc) =>
                    data.push({ ...doc.data(), id: doc.id })
                );
                setPosts(data);
                setLoading(false);
            });
    }, [firestore, followers, following, mentees, mentors, auth.uid]);
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography
                    variant='h6'
                    component='h1'
                    gutterBottom
                    color='primary'
                    className={classes.title}
                >
                    Posts
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CreatePost auth={auth} xs={12} />
            </Grid>
            {!loading &&
                posts?.map((post) => (
                    <Grid item xs={12} key={`post-${post.id}`}>
                        <PostCard post={post} auth={auth} />
                    </Grid>
                ))}
        </Grid>
    );
};

export default Posts;
