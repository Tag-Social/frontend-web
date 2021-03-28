import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    newMessage: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        '& .MuiTypography-colorTextSecondary ': {
            color: 'white',
        },
    },
}));
