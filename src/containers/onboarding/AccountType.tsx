import React from 'react';
import { Button, Grid, Switch, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { UserProfile } from '../../firebase/utils/userProfile';

type Props = {
    profileData: UserProfile;
    setProfileData: React.Dispatch<React.SetStateAction<UserProfile>>;
    handleNext: () => void;
};

const AccountType = ({ profileData, setProfileData, handleNext }: Props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography
                    gutterBottom
                    variant='h5'
                    align='center'
                    color='primary'
                >
                    I am looking for a...
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    disableElevation
                    onClick={() => {
                        handleNext();
                        setProfileData({ ...profileData, accountType: 0 });
                    }}
                >
                    Mentor
                </Button>
            </Grid>
            <Grid item xs={12} md={6}>
                <Button
                    fullWidth
                    variant='outlined'
                    color='primary'
                    onClick={() => {
                        handleNext();
                        setProfileData({ ...profileData, accountType: 2 });
                    }}
                >
                    Mentee
                </Button>
            </Grid>
        </Grid>
    );
};

export default AccountType;
