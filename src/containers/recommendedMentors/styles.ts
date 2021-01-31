import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    gridList: {
        maxWidth: '100vw',
        marginBottom: '10px',
        padding: '6px',
        display: 'grid',
        gap: '10px',
        gridTemplateRows: 'minmax(150px, 1fr)',
        gridTemplateColumns: '10px',
        gridAutoFlow: 'column',
        overflowX: 'scroll',
        scrollSnapType: 'x proximity',
        scrollbarWidth: 'none',
        margin: 0,
        '&:webkit-scrollbar': {
            display: 'none',
        },
    },
    userCard: {
        scrollSnapAlign: 'center',
        width: '250px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        position: 'relative',
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
    title: {
        marginLeft: '16px',
    },
}));
