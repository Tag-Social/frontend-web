import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: '16px',
    },
    postCard: {
        maxWidth: 600,
        minWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    postAvatar: {
        backgroundColor: theme.palette.primary.light,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    commentAvatar: {
        backgroundColor: theme.palette.primary.light,
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    like: {
        color: theme.palette.primary.main,
    },
    love: {
        color: 'red',
    },
    chip: {
        marginRight: 5,
    },
    fabButton: {
        position: 'fixed',
        zIndex: 10,
        bottom: 75,
        right: 30,
        margin: '0 auto',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    postButton: {
        marginTop: 10,
        marginBottom: 10,
    },
}));
