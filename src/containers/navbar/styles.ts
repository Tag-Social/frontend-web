import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        padding: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        width: '75px',
        height: 'auto',
        paddingTop: '12px',
    },
    nav: {
        boxShadow: 'none',
        backgroundColor: '#fafafa',
    },
}));