import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

import {
    Grid,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';

import { userProfile, UserProfile } from '../../firebase/utils/userProfile';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
//TODO : Finish
const EditEdu = ({ open, setOpen }: Props) => {
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
            education: {
                ...profile.education,
                [e.target.name]: e.target.value,
            }
        });
    };


    const save = () => {
        firebase.updateProfile(profileData);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    type Education = {
        fieldOfStudy: string;
        school: string;
        degree: string;
        endYear: number;
        startYear: number;
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
                {"Edit Info"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {profileData.education && profileData.education[0] && <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='text'
                                name='school'
                                label='School'
                                onChange={onChange}
                                value={profileData.education[0].school}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='text'
                                name='fieldOfStudy'
                                label='Field of Study'
                                onChange={onChange}
                                value={profileData.education[0].fieldOfStudy}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='text'
                                name='degree'
                                label='Degree'
                                onChange={onChange}
                                value={profileData.education[0].degree}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='text'
                                name='startYear'
                                label='Start Year'
                                value={profileData.education[0]?.startYear}
                                onChange={onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type='text'
                                name='endYear'
                                label='End Year'
                                value={profileData.education[0].endYear}
                                onChange={onChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>}
                </DialogContentText>
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

export default EditEdu;
