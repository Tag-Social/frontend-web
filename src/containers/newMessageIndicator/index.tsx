import React, { useState, useEffect } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import Badge from '@material-ui/core/Badge';

import { useStyles } from './styles';

const NewMessageIndicator: React.FC = ({ children }) => {
    const classes = useStyles();
    const [
        conversations,
        uid,
    ] = useSelector(({ firestore, firebase }: RootStateOrAny) => [
        firestore.ordered.conversations,
        firebase.auth.uid,
    ]);
    const [newMessagesCount, setNewMessagesCount] = useState<number | null>(
        null
    );

    useEffect(() => {
        let count = 0;
        conversations.forEach((convo: any) => {
            const lastMessage = convo.messages.slice(-1)[0];
            if (lastMessage.uid !== uid && convo.lastSeenBy !== uid) {
                count++;
            }
        });
        setNewMessagesCount(count);
    }, [conversations, uid]);
    return (
        <Badge
            className={classes.root}
            badgeContent={newMessagesCount}
            color='error'
        >
            {children}
        </Badge>
    );
};

export default NewMessageIndicator;
