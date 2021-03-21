import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    title: {
        color: '#653695',
        opacity: 0.7,
    },
    button: {
        margin: theme.spacing(1, 0),
        padding: '0.75rem 0',
        fontWeight: 600,
    },
    facebook: {
        margin: theme.spacing(1, 0),
        padding: '0.75rem 0',
        fontWeight: 600,
        backgroundColor: '#3b5998',
        color: '#ffffff',
    },
    google: {
        backgroundColor: '#de5246',
        margin: theme.spacing(1, 0),
        padding: '0.75rem 0',
        fontWeight: 600,
        color: '#ffffff',
    },
    icon: {
        marginRight: '16px',
        lineHeight: 0,
    },
    main: {
        paddingBottom: 22,
    },
    container: {
        padding: 32,
    },
    mainImage: {
        width: '100%',
        height: 'auto',
    },
    section2: {
        backgroundColor: '#ebeef1',
    },
    section3: {
        height: '300px',
        padding: '16px',
    },
    section4: {
        backgroundColor: '#663695',
        height: '300px',
        padding: '16px',
    },
    section5: {
        backgroundColor: '#ebeef1',
    },
}));
