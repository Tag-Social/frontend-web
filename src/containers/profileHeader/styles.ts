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
        top: '50px',
        left: '20px',
        width: 'fit-content',
    },
    info: {
        paddingLeft: '20px',
    },
    cardActions: {
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: 4,
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
    socialActions: {
        paddingLeft: '18px',
    },
    facebook: {
        color: '#3b5998',
    },
    instagram: {
        color: '#8a3ab9',
    },
    twitter: {
        color: '#00acee',
    },
    linkedin: {
        color: '#0072b1',
    },
}));
