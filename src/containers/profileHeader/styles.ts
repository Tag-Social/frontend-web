import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    userCard: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        position: 'relative',
    },
    avatarContainer: {
        position: 'absolute',
        top: '125px',
        left: '20px',
        width: 'fit-content',
    },
    info: {
        paddingLeft: '20px',
    },
    cardActions: {
        justifyContent: 'flex-end',
    },
    listItemIcon: {
        minWidth: '30px',
    },
    profileItemIcon: {
        marginRight: '6px',
        color: 'rgba(0, 0, 0, 0.55)',
    },
    status: {
        color: '#663695',
    },
    listItem: {
        paddingLeft: 0,
    },
}));
