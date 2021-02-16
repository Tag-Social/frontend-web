import {
    Container,
    Grid,
    Card,
    CardHeader,
    CardActionArea,
    Avatar,
    Typography,
} from '@material-ui/core';

import { Messenger } from '../../containers';

const Messaging = () => {
    return (
        <Container maxWidth='sm'>
            <Messenger />
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant='h5' color='primary'>
                        Messaging
                    </Typography>
                </Grid>
                {['Rafi', 'You', 'Will'].map((i) => (
                    <Grid item xs={12}>
                        <Card>
                            <CardActionArea>
                                <CardHeader
                                    avatar={<Avatar>U</Avatar>}
                                    title='User'
                                    subheader={`${i}: Said something`}
                                    action='Jan 2'
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Messaging;
