import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    infoCard: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        padding: '10px',
    },
    title: {
        fontWeight: 600,
    },
    divider: {
        marginBottom: '16px',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));
