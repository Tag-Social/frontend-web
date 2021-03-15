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
import { Autocomplete } from '@material-ui/lab';

import { userProfile, UserProfile } from '../../firebase/utils/userProfile';
import interestsList from '../../utils/interestsList.json';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditInterests = ({ open, setOpen }: Props) => {
    const firebase = useFirebase();
    const { profile } = useSelector((state: RootStateOrAny) => state.firebase);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [profileData, setProfileData] = useState<UserProfile>(userProfile);

    useEffect(() => {
        setProfileData(profile);
    }, [profile]);

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
                {'Edit Interests'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {profileData.interests && (
                                <Autocomplete
                                    multiple
                                    freeSolo
                                    ChipProps={{ color: 'primary' }}
                                    options={interestsList}
                                    getOptionLabel={(option) => option}
                                    value={profileData.interests}
                                    onChange={(event, value) =>
                                        setProfileData({
                                            ...profile,
                                            interests: value,
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Interests'
                                        />
                                    )}
                                />
                            )}
                        </Grid>
                    </Grid>
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
};;

export default EditInterests;
