import { Link } from 'react-router-dom';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';
import Moment from 'react-moment';
import { PROFILES } from '../../routes/routePaths';

type Props = {
    user: any;
    data: any;
};

const Message = ({
    user,
    data: { text, date, uid, photoURL, displayName },
}: Props) => {
    displayName = displayName && displayName.trim().split(' ')[0];
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
                <Avatar
                    alt={String(displayName)}
                    src={photoURL}
                    component={Link}
                    to={`${PROFILES}/${uid}`}
                />
            </ListItemAvatar>
            <ListItemText
                primary={text}
                secondary={<Moment fromNow>{date}</Moment>}
                style={
                    user === uid
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
