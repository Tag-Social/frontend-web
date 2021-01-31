import { makeStyles } from '@material-ui/core/styles';

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
    topNav: {
        boxShadow: 'none',
        backgroundColor: '#fafafa',
    },
    bottomNav: {
        bottom: 0,
        top: 'auto',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    grow: {
        flexGrow: 1,
    },
    topNavUserActions: {
        marginLeft: '10px',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
}));
