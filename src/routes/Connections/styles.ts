import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    card: {
        margin: '0 auto 16px auto',
        boxShadow: ' 0px 8px 20px rgb(0 0 0 / 6%)',
    },
    container: {},
    listItemText: {
        maxWidth: '50%',
    },
    title: {
        marginLeft: '16px',
    },
}));
