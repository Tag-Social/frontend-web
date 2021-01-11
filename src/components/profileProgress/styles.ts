import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: `0px 2px 10px -1px rgba(102, 54, 149,0.2), 
                    0px 1px 1px 0px rgba(102, 54, 149,0.14), 
                    0px 1px 3px 0px rgba(102, 54, 149,0.12)`,
    },
}));
