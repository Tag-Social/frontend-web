import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    input: {
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
        borderRadius: '50%',
        padding: '5px',
        cursor: 'pointer',
        color: '#fff',
        width: '35px',
        height: '35px'
    },
    label: {
        marginRight: 0,
        marginLeft: 0,
    },
    avatar: {
        backgroundColor: '#fff',
        boxSizing: 'content-box',
        border: '3px solid white',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,0.5)',
        width: '150px', 
        height: '150px'
    }
}));
