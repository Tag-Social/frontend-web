import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    Container,
    Card,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Button,
} from '@material-ui/core';
import { Chat } from '@material-ui/icons';

import { useStyles } from './styles';
import { UserProfile } from '../../firebase/utils/userProfile';
import { PROFILES, MESSAGING } from '../../routes/routePaths';
import { Skeleton } from '@material-ui/lab';
import { RequestsButton } from '../../containers';

const Connections = () => {
    const firestore = useFirestore();
    const classes = useStyles();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(false);
    const [
        profile,
        auth,
        { mentors, mentees, pending },
    ] = useSelector(({ relationships, firebase }: RootStateOrAny) => [
        firebase.profile,
        firebase.auth,
        relationships,
    ]);

    useEffect(() => {
        setLoading(true);
        firestore
            .collection('users')
            .where('__name__', 'in', [
                ...mentees.map((u: { uid2: string }) => u.uid2),
                ...mentors.map((u: { uid1: string }) => u.uid1),
                ...pending.mentees.map((u: { uid2: string }) => u.uid2),
                ...pending.mentors.map((u: { uid1: string }) => u.uid1),
                '1',
            ])
            .get()
            .then((snapshot) => {
                const data: React.SetStateAction<any[]> = [];
                snapshot.forEach((doc) =>
                    data.push({ ...doc.data(), id: doc.id })
                );
                setUsers(data);
                setLoading(false);
            });
    }, [firestore]);

    return (
        <Container maxWidth='sm' className={classes.container}>
            <Typography
                variant='h5'
                color='primary'
                gutterBottom
            >
                Connections
            </Typography>
            {!loading ? (
                <List>
                    {users.length > 0 ? (
                        users.map((user: UserProfile, index: number) => (
                            <Card
                                className={classes.card}
                                elevation={0}
                                key={`user-${index}`}
                            >
                                <ListItem
                                    button
                                    component={Link}
                                    to={`${PROFILES}/${user.id}`}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={user.photoURL} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.displayName}
                                        secondary={user.occupation}
                                        className={classes.listItemText}
                                    />
                                    <ListItemSecondaryAction>
                                        <RequestsButton
                                            user={user}
                                            uid={String(user.id)}
                                            mentor={user.mentor}
                                            size='small'
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Card>
                        ))
                    ) : (
                        <Typography variant='body1'>
                            No connections yet. When you make connections, they
                            will appear hear!
                        </Typography>
                    )}
                </List>
            ) : (
                <Skeleton
                    animation='wave'
                    className={classes.card}
                    height={200}
                />
            )}
        </Container>
    );
};

export default Connections;
