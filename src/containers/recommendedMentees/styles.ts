import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    gridList: {
        width: '100%',
        marginBottom: '10px',
        padding: '6px',
        paddingBottom: '30px',
        display: 'grid',
        gap: '10px',
        gridTemplateRows: 'minmax(500px, 1fr)',
        gridTemplateColumns: '10px',
        gridAutoFlow: 'column',
        overflowX: 'scroll',
        scrollSnapType: 'x proximity',
        scrollbarWidth: 'none',
        margin: 0,
        '&::webkit-scrollbar': {
            display: 'none',
        },
    },
    userCard: {
        scrollSnapAlign: 'center',
        borderRadius: '15px',
        width: '350px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        position: 'relative',
    },
    avatarContainer: {
        backgroundColor: '#F0F0F0',
        borderRadius: '15px',
        border: '5px solid white',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfoText: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 5,
    },
    actionArea: {
        height: '100%',
    },
    actions: {
        margin: '0 auto',
    },
    title: {
        fontWeight: 600,
    },
}));
