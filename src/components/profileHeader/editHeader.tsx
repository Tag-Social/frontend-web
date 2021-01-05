import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

import {
    Grid,
    Typography,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';

import { userProfile, UserProfile } from '../../firebase/utils/userProfile';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditHeader = ({ open, setOpen }: Props) => {
    const firebase = useFirebase();
    const { profile } = useSelector((state: RootStateOrAny) => state.firebase);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [profileData, setProfileData] = useState<UserProfile>(userProfile);

    useEffect(() => {
        setProfileData(profile);
    }, [profile]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProfileData({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };
    const changeLocation = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProfileData({
            ...profile,
            location: {
                ...profile.location,
                [e.target.name]: e.target.value,
            },
        });
    };

    const save = () => {
        firebase.updateProfile(profileData);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            scroll='paper'
            open={open}
            onClose={handleClose}
            aria-labelledby='responsive-dialog-title'
        >
            <DialogTitle id='responsive-dialog-title'>
                {'Edit Info'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
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
                        <Typography variant='body1'>Gender</Typography>
                        <RadioGroup
                            row
                            name='gender'
                            value={profileData.gender}
                            onChange={onChange}
                        >
                            <FormControlLabel
                                value='female'
                                control={<Radio color='primary' />}
                                label='Female'
                            />
                            <FormControlLabel
                                value='male'
                                control={<Radio color='primary' />}
                                label='Male'
                            />
                            <FormControlLabel
                                value='non-binary'
                                control={<Radio color='primary' />}
                                label='Non-Binary'
                            />
                            <FormControlLabel
                                value='other'
                                control={<Radio color='primary' />}
                                label='Other'
                            />
                            <FormControlLabel
                                value='N/A'
                                control={<Radio color='primary' />}
                                label='N/A'
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            name='state'
                            label='State'
                            onChange={changeLocation}
                            value={profileData.location?.state}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            name='province'
                            label='Province'
                            onChange={changeLocation}
                            value={profileData.location?.province}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='text'
                            name='country'
                            label='Country'
                            onChange={changeLocation}
                            value={profileData.location?.country}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type='number'
                            name='postalCode'
                            label='Postal Code'
                            onChange={changeLocation}
                            value={profileData.location?.postalCode}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color='primary'>
                    Cancel
                </Button>
                <Button onClick={save} color='primary' autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditHeader;
