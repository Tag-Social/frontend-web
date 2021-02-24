import { useState, useEffect } from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
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

const Messaging = () => {
    const location = useLocation() as {state:{user:string}; }
    const [currentConvo, setCurrentConvo] = useState('');
    const [
        conversations,
        auth,
    ] = useSelector(({ firestore, firebase }: RootStateOrAny) => [
        firestore.ordered.conversations,
        firebase.auth,
    ]);
    useFirestoreConnect([
        {
            collection: 'conversations',
            where: [['users', 'array-contains', auth.uid]],
        },
    ]);

    useEffect(()=>{
        if(location && location.state && conversations) {
            setCurrentConvo(
                conversations.find((c:any) => c.users.includes(location.state.user))?.id || ''
            );
        }
    },[location, conversations])

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
                {conversations?.map((i: any) => {
                        const avatar = (
                            <Avatar
                                src={
                                    i.usersData[
                                        i.users.find((u: any) => u !== auth.uid)
                                    ].photoURL
                                }
                            />
                        );
                        const date = <Moment fromNow>{i.lastSentAt}</Moment>;
                        const title =
                            i.usersData[
                                i.users.find((u: any) => u !== auth.uid)
                            ].displayName;
                        const subHeader = `${
                            i.messages.slice(-1)[0].uid === auth.uid
                                ? 'You: '
                                : ''
                        } ${i.messages.slice(-1)[0].text}`;
                        return (
                            <Grid item xs={12} key={i.id}>
                                <Card>
                                    <CardActionArea
                                        onClick={() => setCurrentConvo(i.id)}
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
