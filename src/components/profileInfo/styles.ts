import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    infoCard: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        padding: '10px',
    },
    infoHeader: {
        marginBottom: 0,
        paddingBottom: 0,
    },
    title: {
        fontWeight: 600,
        lineHeight:  1,
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
    editButton: {
        marginLeft: 'auto !important',
    },
}));
