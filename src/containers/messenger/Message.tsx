import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';
import moment from 'moment';

type Props = {
    user: any;
    data: any;
};

const Message = ({
    user,
    data: { text, date, uid, photoURL, displayName },
}: Props) => {
    displayName = displayName && displayName.trim().split(' ')[0];
    date = moment(date).fromNow();
    return (
        <ListItem
            alignItems='flex-start'
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 0,
            }}
        >
            <ListItemAvatar>
                <Avatar alt='Remy Sharp' src={photoURL} />
            </ListItemAvatar>
            <ListItemText
                primary={text}
                secondary={date}
                style={
                    user.uid === uid
                        ? {
                              position: 'absolute',
                              right: '75px',
                              textAlign: 'right',
                          }
                        : {}
                }
            />
        </ListItem>
    );
};

export default Message;
