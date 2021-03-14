import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: ' 0px 8px 20px rgb(0 0 0 / 6%)',
    },
    facebook: {
        margin: theme.spacing(1, 0),
        padding: '0.75rem 0',
        fontWeight: 600,
        backgroundColor: '#3b5998',
        color: '#ffffff',
    },
    google: {
        backgroundColor: '#de5246',
        margin: theme.spacing(1, 0),
        padding: '0.75rem 0',
        fontWeight: 600,
        color: '#ffffff',
    },
}));
