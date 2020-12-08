import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        fontSize: 60,
    },
    nav: {
        boxShadow: 'none',
        backgroundColor: '#fafafa',
    },
}));