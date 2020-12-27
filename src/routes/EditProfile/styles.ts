import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    saveButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex: 999,
    },
    saveIcon: {
        marginRight: '10px',
    },
}));
