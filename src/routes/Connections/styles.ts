import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    card: {
        margin: '0 auto 16px auto',
        maxWidth: '850px',
    },
    container: {
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    listItemText: {
        maxWidth: '50%',
    },
    title: {
        marginLeft: '16px',
    },
}));
