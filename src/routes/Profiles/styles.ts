import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    gridItem: {
        [theme.breakpoints.down('xs')]: {
            paddingRight: '0 !important',
            paddingLeft: '0 !important',
        },
    },
}));
