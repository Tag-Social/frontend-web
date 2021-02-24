import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    messengerContainer: {
        [theme.breakpoints.up('sm')]: {
            width: 500,
            height: 300,
        },
        padding: 0,
    },
    messageList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        margin: '0 auto',
        overflow: 'scroll',
    },
}));
