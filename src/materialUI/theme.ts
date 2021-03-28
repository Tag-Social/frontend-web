import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';

export const theme = createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: {
            main: '#f0f0f0',
        },
    },
    overrides: {
        MuiCard: {
            root: {
                // Some CSS
                boxShadow: ' 0px 8px 20px rgb(0 0 0 / 6%)',
            },
        },
    },
});
