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
import { PROFILES } from '../../routes/routePaths';
import { RecommendedMentors } from '../../containers';

const Connections = () => {
    const firestore = useFirestore();
    const classes = useStyles();
    const [users, setUsers] = useState<UserProfile[]>([]);
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
        firestore
            .collection('users')
            .where('__name__', 'in', [
                ...mentees.map((u: { uid2: string }) => u.uid2),
                ...mentors.map((u: { uid1: string }) => u.uid1),
                ...following.map((u: { uid2: string }) => u.uid2),
                ...followers.map((u: { uid1: string }) => u.uid1),
                '1',
            ])
            .get()
            .then((snapshot) => {
                const data: React.SetStateAction<any[]> = [];
                snapshot.forEach((doc) =>
                    data.push({ ...doc.data(), id: doc.id })
                );
                setUsers(data);
            });
    }, [firestore, followers, following, mentees, mentors]);

    return (
        <Container maxWidth='md' className={classes.container}>
            <Typography
                variant='h6'
                color='primary'
                gutterBottom
                className={classes.title}
            >
                Connections
            </Typography>
            <Card className={classes.card} elevation={1}>
                <List>
                    {users.map((user: UserProfile, index: number) => (
                        <ListItem
                            button
                            key={`user-${index}`}
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
                                <Button
                                    size='small'
                                    color='primary'
                                    variant='outlined'
                                >
                                    <Chat
                                        fontSize='inherit'
                                        style={{ marginRight: 5 }}
                                    />{' '}
                                    Message
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Card>
            <RecommendedMentors profile={profile} auth={auth} />
        </Container>
    );
};

export default Connections;
