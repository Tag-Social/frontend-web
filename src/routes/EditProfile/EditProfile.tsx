import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase'

import {
    Container,
    CssBaseline,
    Grid,
    Typography,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Fab,
    Snackbar,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';

import SaveIcon from '@material-ui/icons/Save';


import { PROFILES } from '../routePaths';
import { userProfile, UserProfile } from '../../firebase/utils/userProfile';
import { useStyles } from './styles'

const options = [''];

// TODO: Finish
const EditProfile = () => {
    const firebase = useFirebase()
    const classes = useStyles()
    const { profile, auth } = useSelector(
        (state: RootStateOrAny) => state.firebase
    );
    const [profileData, setProfileData] = useState<UserProfile>(userProfile);
    const [alertOpen, setAlertOpen] = useState(false)

    useEffect(() => {
        setProfileData(profile);
    }, [profile]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        setProfileData({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const saveProfile = (e: React.FormEvent) => {
        e.preventDefault()
        firebase.updateProfile(profileData)
            .then(() => setAlertOpen(true)
            )
    }

    const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertOpen(false);
    };


    return (
        <Container maxWidth='md'>
            <CssBaseline />
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleAlertClose} severity="success">
                    Your profile has been saved.
                </MuiAlert>
            </Snackbar>
            <Link to={`${PROFILES}/${auth.uid}`}>View Profile</Link>
            <Typography variant='h4' gutterBottom color='primary'>
                Edit Profile
            </Typography>

            <form noValidate onSubmit={saveProfile}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            disabled
                            label='Name'
                            fullWidth
                            value={profileData.displayName}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='email'
                            name='email'
                            label='Email'
                            onChange={onChange}
                            value={profileData.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            name='pronouns'
                            label='Pronouns'
                            onChange={onChange}
                            value={profileData.pronouns}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            type='text'
                            name='bio'
                            label='Bio'
                            onChange={onChange}
                            value={profileData.bio}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            name='organization'
                            label='Organization'
                            onChange={onChange}
                            value={profileData.organization}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            name='occupation'
                            label='Occupation'
                            onChange={onChange}
                            value={profileData.occupation}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='body1'>
                            Gender
                        </Typography>
                        <RadioGroup row name="gender" value={profileData.gender} onChange={onChange}>
                            <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                            <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                            <FormControlLabel value="non-binary" control={<Radio color="primary" />} label="Non-Binary" />
                            <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
                            <FormControlLabel value='N/A' control={<Radio color="primary" />} label="N/A" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='body1'>
                            Education
                        </Typography>
                        <RadioGroup row name="gender" value={profileData.gender} onChange={onChange}>
                            <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                            <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                            <FormControlLabel value="non-binary" control={<Radio color="primary" />} label="Non-Binary" />
                            <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
                            <FormControlLabel value='N/A' control={<Radio color="primary" />} label="N/A" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {profileData.skills && <Autocomplete
                            multiple
                            freeSolo
                            options={options}
                            ChipProps={{ color: 'primary' }}
                            getOptionLabel={(option) => option}
                            value={profileData.skills}
                            onChange={(event, value) => setProfileData({
                                ...profile,
                                skills: value
                            })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Skills"
                                />
                            )}
                        />}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {profileData.interests && <Autocomplete
                            multiple
                            freeSolo
                            ChipProps={{ color: 'primary' }}
                            options={options}
                            getOptionLabel={(option) => option}
                            value={profileData.interests}
                            onChange={(event, value) => setProfileData({
                                ...profile,
                                interests: value
                            })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Interests"
                                />
                            )}
                        />}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {profileData.hobbies && <Autocomplete
                            multiple
                            freeSolo
                            ChipProps={{ color: 'primary' }}
                            options={options}
                            getOptionLabel={(option) => option}
                            value={profileData.hobbies}
                            onChange={(event, value) => setProfileData({
                                ...profile,
                                hobbies: value
                            })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Hobbies"
                                />
                            )}
                        />}
                    </Grid>
                </Grid>
                <Fab color="primary" aria-label="save" variant='extended' className={classes.saveButton} type='submit'>
                    <SaveIcon className={classes.saveIcon} /> Save
                </Fab>
            </form>
        </Container>
    );
};

export default EditProfile;
