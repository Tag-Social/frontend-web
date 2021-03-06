import React, { useState, useEffect, useRef } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
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
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
    Typography,
} from '@material-ui/core';
import { Create, Close } from '@material-ui/icons';

import { UserProfile } from '../../firebase/utils/userProfile';
import { useStyles } from './styles';
import Message from './Message';
import userEvent from '@testing-library/user-event';

type UserData = {
    [key: string]: any;
    displayName: string;
    photoURL: string;
};

type Conversation = {
    [key: string]: any;
    id: string;
    initDate: string;
    messages: [];
    users: string[];
    usersData: UserData;
    lastSentAt: string;
    lastSeenBy: string;
};
type Message = {
    id: string;
    uid: string;
    text: string;
    date: string;
};

const Messenger = ({ convoId, setCurrentConvo, location }: any) => {
    const firestore = useFirestore();
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const endOfPage = useRef<HTMLDivElement>(null);
    const [
        conversations,
        auth,
        { mentors, mentees, following, followers },
    ] = useSelector(
        ({ firestore, firebase, relationships }: RootStateOrAny) => [
            firestore.ordered.conversations,
            firebase.auth,
            relationships,
        ]
    );
    const [connections, setConnections] = useState<UserProfile[]>();
    const [conversation, setConversation] = useState<Conversation>();
    const [open, setOpen] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [newConvoUser, setNewConvoUser] = useState('');

    const lastSeenBy = () => {
        if (conversation) {
            firestore.collection('conversations').doc(conversation.id).update({
                lastSeenBy: auth.uid,
            });
        }
    };

    useEffect(() => {
        // Set list of users who are connected but have no current conversation.
        if (convoId === 'new') {
            firestore
                .collection('users')
                .where('__name__', 'in', [
                    ...mentees.map((u: { uid2: string }) => u.uid2),
                    ...mentors.map((u: { uid1: string }) => u.uid1),
                    '1',
                ])
                .get()
                .then((snapshot) => {
                    const data: React.SetStateAction<any[]> = [];
                    snapshot.forEach((doc) =>
                        data.push({ ...doc.data(), id: doc.id })
                    );
                    setConnections(
                        data.filter(
                            (user) =>
                                !conversations.some((convo: Conversation) =>
                                    convo.users.includes(user.id)
                                )
                        )
                    );
                });
        }

        // Set conversation
        if (convoId) {
            setConversation(conversations.find((c: any) => c.id === convoId));
            setOpen(true);
        }
    }, [
        conversations,
        convoId,
        firestore,
        followers,
        following,
        mentees,
        mentors,
        setConnections,
    ]);

    useEffect(() => {
        // Focus on last message when component mounts or new message.
        // TODO: Less "hacky" way of doing it?
        if (endOfPage && endOfPage.current) {
            setTimeout(
                () =>
                    endOfPage?.current?.scrollIntoView({ behavior: 'smooth' }),
                1000
            );
        }
    }, [conversation]);

    const handleClose = () => {
        // Set last seen by
        lastSeenBy();
        setConversation(undefined);
        setOpen(false);
        setCurrentConvo('');
    };

    // Start a new conversation
    const newConvo = (user: any) => {
        const id = uuidv4();
        const date = new Date().toISOString();
        firestore
            .collection('conversations')
            .doc(id)
            .set({
                id,
                initDate: date,
                lastSentAt: date,
                lastSeenBy: auth.uid,
                messages: [
                    {
                        text: newMessage,
                        uid: auth.uid,
                        date: date,
                        id: uuidv4(),
                    },
                ],
                users: [auth.uid, user.id],
                usersData: {
                    [auth.uid]: {
                        displayName: auth.displayName,
                        photoURL: auth.photoURL || '',
                    },
                    [user.id]: {
                        displayName: user.displayName,
                        photoURL: user.photoURL || '',
                    },
                },
            })
            .then(() => {
                setCurrentConvo(id);
                setNewMessage('');
            });
    };

    // Send a message
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = uuidv4();
        const date = new Date().toISOString();
        if (conversation) {
            firestore
                .collection('conversations')
                .doc(conversation.id)
                .update({
                    lastSentAt: date,
                    lastSeenBy: auth.uid,
                    messages: [
                        ...conversation.messages,
                        {
                            text: newMessage,
                            uid: auth.uid,
                            date,
                            id,
                        },
                    ],
                })
                .then(() => {
                    conversation.users.forEach(userId => {
                        if (userId != auth.uid) {
                            firestore.collection('users').doc(userId).get().then((snapshot) => {
                                const data = snapshot.data();
                                sendEmailNotification(data?.email, `New Message from ${auth.displayName}`, newMessage, newMessage);
                                setNewMessage('');
                            });
                        }
                    });
                });
        } else if (convoId === 'new' && newConvoUser) {
            newConvo(connections?.find((c) => c.id === newConvoUser));
        }
    };

    function sendEmailNotification(to: String, subject: String, text: String, html: String) {
        firestore.collection("mail").add({
            to: to,
            message: {
                subject: subject,
                text: text,
                html: html,
            },
        });
    }

    const header = (
        <DialogTitle disableTypography className={classes.dialogTitle}>
            <Typography variant='h5' align='left'>
                {conversation?.usersData &&
                    conversation.usersData[
                        conversation.users.find(
                            (u: any) => u !== auth.uid
                        ) || ''
                    ].displayName}
            </Typography>
            <IconButton onClick={handleClose}>
                <Close />
            </IconButton>
            {convoId === 'new' && (
                <FormControl fullWidth>
                    <InputLabel>User</InputLabel>
                    <Select
                        fullWidth
                        value={newConvoUser}
                        onChange={(event) =>
                            setNewConvoUser(event.target.value as string)
                        }
                    >
                        {connections?.map((c) => (
                            <MenuItem value={c.id as string} key={c.id}>
                                {c.displayName}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>
            )}
        </DialogTitle>
    );

    return (
        <Dialog
            fullScreen={fullScreen}
            scroll='paper'
            open={open}
            onClose={handleClose}
        >
            {header}
            <DialogContent className={classes.messengerContainer}>
                <List className={classes.messageList}>
                    {conversation?.messages &&
                        conversation.messages.map((m: Message, i: number) => {
                            const msgData = {
                                ...m,
                                displayName: String(
                                    conversation.usersData[m.uid].displayName
                                ),
                                photoURL:
                                    conversation.usersData[m.uid].photoURL,
                            };
                            return (
                                <Message
                                    key={i}
                                    data={msgData}
                                    user={auth.uid}
                                />
                            );
                        })}
                    <div ref={endOfPage}></div>
                </List>
            </DialogContent>
            <form onSubmit={onSubmit}>
                <DialogActions>
                    <Grid container spacing={1} justify='center'>
                        <Grid item xs={10}>
                            <TextField
                                placeholder='Write a message'
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                variant='outlined'
                                size='small'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                color='primary'
                                type='submit'
                                disabled={newMessage.length < 1}
                            >
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
