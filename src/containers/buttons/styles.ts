import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';


export const useStyles = makeStyles((theme) => ({
    buttonIcon: {
        marginRight: '4px',
    },
    listItemIcon: {
        minWidth: '30px',
    },
    delete: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[800],
        },
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
}));
