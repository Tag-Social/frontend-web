import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    input:{
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: -1,
    },
    action: {
        backgroundColor: '#663695',
        border: `2px solid ${theme.palette.background.paper}`,
        borderRadius:"50%",
        padding: '5px',
        cursor:'pointer',
        color: '#fff'
    },
    label:{
        marginRight: 0,
        marginLeft: 0,
    }
}));