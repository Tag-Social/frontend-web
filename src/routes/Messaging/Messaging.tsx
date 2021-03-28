import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirestoreConnect } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Moment from 'react-moment';
import {
    Container,
    Grid,
    Card,
    CardHeader,
    CardActionArea,
    Avatar,
    Typography,
    Button,
} from '@material-ui/core';
import { Create } from '@material-ui/icons';

import { Messenger } from '../../containers';
import { PROFILES } from '../../routes/routePaths';
import { useStyles } from './styles';

const Messaging = () => {
    const classes = useStyles();
    const location = useLocation() as { state: { user: string } };
    const [currentConvo, setCurrentConvo] = useState('');
    const [
        conversations,
        auth,
    ] = useSelector(({ firestore, firebase }: RootStateOrAny) => [
        firestore.ordered.conversations,
        firebase.auth,
    ]);

    useEffect(() => {
        if (location && location.state && conversations) {
            setCurrentConvo(
                conversations.find((c: any) =>
                    c.users.includes(location.state.user)
                )?.id || ''
            );
        }
    }, [location, conversations]);

    return (
        <Container maxWidth='sm'>
            <Messenger
                convoId={currentConvo}
                setCurrentConvo={setCurrentConvo}
                location={location}
            />
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <Typography variant='h5' color='primary'>
                        Messaging
                    </Typography>
                </Grid>
                <Grid item xs={4} container justify='flex-end'>
                    <Button
                        startIcon={<Create />}
                        color='primary'
                        variant='outlined'
                        disableElevation
                        size='small'
                        onClick={() => setCurrentConvo('new')}
                    >
                        New
                    </Button>
                </Grid>
                {conversations?.map((convo: any) => {
                    const user = convo.users.find((u: any) => u !== auth.uid);
                    const lastMessage = convo.messages.slice(-1)[0];
                    const avatar = (
                        <Avatar
                            src={convo.usersData[user].photoURL}
                            component={Link}
                            to={`${PROFILES}/${user}`}
                        />
                    );
                    const date =
                        lastMessage.uid === auth.uid ? (
                            <Moment fromNow>{convo.lastSentAt}</Moment>
                        ) : (
                            <b>
                                <Moment fromNow>{convo.lastSentAt}</Moment>
                            </b>
                        );
                    const title =
                        lastMessage.uid ===
                        auth.uid ? convo.usersData[user].displayName : (<b>{convo.usersData[user].displayName}</b>);
                    const subHeader =
                        lastMessage.uid === auth.uid ? (
                            `You: ${lastMessage.text}`
                        ) : (
                            <b>{lastMessage.text}</b>
                        );

                    return (
                        <Grid item xs={12} key={convo.id}>
                            <Card
                                className={
                                    lastMessage.uid !== auth.uid &&
                                    convo.lastSeenBy !== auth.uid
                                        ? classes.newMessage
                                        : ''
                                }
                            >
                                <CardActionArea
                                    onClick={() => setCurrentConvo(convo.id)}
                                >
                                    <CardHeader
                                        avatar={avatar}
                                        title={title}
                                        subheader={subHeader}
                                        action={date}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Messaging;
