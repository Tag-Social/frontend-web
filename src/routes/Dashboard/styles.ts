import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
}));
