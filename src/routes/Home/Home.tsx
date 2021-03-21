import React from 'react';
import { Link as A } from 'react-router-dom';
import {
    Button,
    IconButton,
    TextField,
    Divider,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Facebook, Instagram, Twitter, YouTube } from '@material-ui/icons';

import { useStyles } from './styles';
import { useAuth, useEmailCapture } from '../../hooks';
import GoogleIcon from '../../icons/GoogleIcon';
import { PASSWORD_RESET } from '../routePaths';

const Home: React.FC = () => {
    const classes = useStyles();
    const {
        signIn,
        providerSignIn,
        setEmail,
        email,
        setPassword,
        password,
        error,
    } = useAuth();
    const {
        emailInput,
        setEmailInput,
        addEmail,
        emailMessage,
        validEmail,
    } = useEmailCapture();

    document.title = 'Tag | Mentorship Community';
    return (
        <div>
            <Container maxWidth='lg' className={classes.main}>
                <Grid container spacing={3} justify='center'>
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography
                            component='h1'
                            variant='h3'
                            className={classes.title}
                        >
                            Welcome to your mentorship community.
                        </Typography>
                        {error && (
                            <Alert className='alert' severity='error'>
                                {error.message}
                            </Alert>
                        )}
                        <form noValidate onSubmit={signIn}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                            />
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                            />
                            <Grid container>
                                <Grid item xs>
                                    <Link
                                        component={A}
                                        to={PASSWORD_RESET}
                                        variant='body2'
                                    >
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Button
                                type='submit'
                                disableElevation
                                disabled={!email || !password}
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.button}
                            >
                                Sign In
                            </Button>
                            <Divider />
                            <Button
                                disableElevation
                                fullWidth
                                variant='contained'
                                color='secondary'
                                onClick={() => providerSignIn('google')}
                                className={classes.google}
                            >
                                <i className={classes.icon}>{GoogleIcon}</i>
                                Sign In with Google
                            </Button>
                            <Button
                                disableElevation
                                fullWidth
                                variant='contained'
                                className={classes.facebook}
                                onClick={() => providerSignIn('facebook')}
                            >
                                <Facebook className={classes.icon} />
                                Sign In with Facebook
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fassets%2FMentor%20(1).svg?alt=media&token=6029350c-1d79-481d-aedb-3e291d95f82b'
                            alt='Welcome'
                            className={classes.mainImage}
                        />
                    </Grid>
                </Grid>
            </Container>
            {/* <section
                className={classes.section2}
            >
                <Container maxWidth='md' className={classes.container}>
                    <Typography variant='h4' gutterBottom>
                        <b>Problem</b>
                    </Typography>
                    <Typography variant='body1'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Expedita, accusamus? Voluptates nam dolore
                        nesciunt quia libero, omnis est quae aliquam molestiae
                        hic incidunt eaque velit suscipit nostrum asperiores
                        esse neque aspernatur, consectetur error alias ex
                        maiores cupiditate fuga nisi. Animi eaque, quod eveniet
                        nesciunt molestias cumque architecto soluta ab sit
                        mollitia iste necessitatibus facilis fugiat est labore
                        itaque nisi in hic perspiciatis quo ipsa velit ad
                        voluptas? Est veniam assumenda cumque sapiente, nobis
                        impedit voluptates verita. libero tenetur quas. Soluta
                        blanditiis vitae saepe.
                    </Typography>
                </Container>
            </section>
            <section
                className={classes.section3}
            >
                <Container maxWidth='md' className={classes.container}>
                    <Typography variant='h4'>
                        <b>Mission</b>
                    </Typography>
                </Container>
            </section>
            <section
                className={classes.section4}
            >
                <Container maxWidth='md' className={classes.container}>
                    <Typography
                        variant='h4'
                        style={{ color: '#fff' }}
                        gutterBottom
                    >
                        <b>About</b>
                    </Typography>
                </Container>
            </section> */}

        {/* NEWSLETTER */}
            <Container maxWidth='md' className={classes.container}>
                <Grid container justify='center'>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={8}
                        justify='center'
                        alignContent='center'
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant='h6'
                                color='primary'
                                align='center'
                                gutterBottom
                            >
                                <b>
                                    Stay up to date with our email
                                    newsletter!
                                </b>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            justify='center'
                            spacing={1}
                        >
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    type='email'
                                    variant='outlined'
                                    value={emailInput}
                                    onChange={(e) =>
                                        setEmailInput(e.target.value)
                                    }
                                    fullWidth
                                    placeholder='Email'
                                    size='small'
                                />
                            </Grid>
                            <Grid item xs={8} sm={4}>
                                <Button
                                    disabled={!validEmail}
                                    variant='contained'
                                    disableElevation
                                    color='primary'
                                    fullWidth
                                    onClick={addEmail}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {emailMessage && (
                        <Grid item xs={12} sm={12}>
                            <Typography align='center'>
                                {emailMessage}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12} sm={4}>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fassets%2FReading%20Newspaper.svg?alt=media&token=6a2d4645-bcb3-4777-9f50-c5c73a6463b4'
                            style={{ width: '100%' }}
                        />
                    </Grid>
                </Grid>
            </Container>
            <section
                className={classes.section5}
            >
                <Container maxWidth='md' className={classes.container}>
                    <Grid container spacing={3} justify='center'>
                        <Grid container item xs={12} justify='center'>
                            <img
                                src='https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fassets%2Flogo.svg?alt=media&token=16b8288b-042e-4e68-8dda-5de15c3c7d1f'
                                alt='Welcome'
                                style={{ width: '100px', height: 'auto' }}
                            />
                        </Grid>
                        <Grid container item xs={12} justify='center'>
                            <IconButton
                                href='https://youtube.com'
                                target='_blank'
                            >
                                <YouTube color='primary' />
                            </IconButton>
                            <IconButton
                                href='https://facebook.com'
                                target='_blank'
                            >
                                <Facebook color='primary' />
                            </IconButton>
                            <IconButton
                                href='https://instagram.com'
                                target='_blank'
                            >
                                <Instagram color='primary' />
                            </IconButton>
                            <IconButton
                                href='https://twitter.com'
                                target='_blank'
                            >
                                <Twitter color='primary' />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography align='center' color='primary'>
                                &#169; 2021 by TAG
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </div>
    );
};

export default Home;
