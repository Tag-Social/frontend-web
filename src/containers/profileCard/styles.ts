import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    cardContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    avatarContainer: {
        position: 'absolute',
        top: 0,
        left: 10,
        width: '85px',
        height: '85px',
        backgroundColor: '#c3c3c3',
        border: '3px solid white',
    },
    actionArea: {
        height: '100%',
    },
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));
