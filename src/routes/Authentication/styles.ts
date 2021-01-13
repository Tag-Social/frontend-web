import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        maxWidth: '400px',
    },
    title: {
        color: '#653695',
    },
    button: {
        margin: theme.spacing(1, 0),
        borderRadius: '50px',
        padding: '0.75rem 0',
        fontWeight: 600,
    },
    facebook: {
        margin: theme.spacing(1, 0),
        borderRadius: '50px',
        padding: '0.75rem 0',
        fontWeight: 600,
        backgroundColor: '#3b5998',
        color: '#ffffff',
    },
    google: {
        backgroundColor: '#de5246',
        margin: theme.spacing(1, 0),
        borderRadius: '50px',
        padding: '0.75rem 0',
        fontWeight: 600,
        color: '#ffffff',
    },
    icon: {
        marginRight: '16px',
        lineHeight: 0,
    },
}));
