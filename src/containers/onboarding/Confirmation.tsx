import React, { useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { UserProfile } from '../../firebase/utils/userProfile';

import { useStyles } from './styles';

type Props = {
    profileData: UserProfile;
    setProfileData: React.Dispatch<React.SetStateAction<UserProfile>>;
    saveProfile: () => void;
    handlePrev: () => void;
};

const Confirmation = ({
    profileData,
    setProfileData,
    saveProfile,
    handlePrev,
}: Props) => {
    const classes = useStyles();

    const finish = () => {
        setProfileData({ ...profileData, onboarded: true });
    };

    useEffect(() => {
        saveProfile();
    }, [profileData]);

    return (
        <>
            {profileData.accountType === 2 && (
                <>
                    <Typography variant='h6' gutterBottom>
                        Thank you for your interest in becoming a Mentor!
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        Our team will review your application and contact you
                        soon regarding the next steps to becoming a{' '}
                        <b>TAG Mentor</b>.
                    </Typography>
                    <Typography variant='caption'>
                        In the meantime you may browse the dashboard and
                        experience TAG from a mentees experience!
                    </Typography>
                </>
            )}
            {profileData.accountType === 0 && (
                <>
                    <Typography variant='h6' gutterBottom>
                        Yay! You are on your way to finding a mentor.
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        In the your Dashboard you will find the mentors
                        recommended to you based on your profile.
                    </Typography>
                    <Typography variant='body1'>
                        You may also view and update your profile by clicking on
                        your avatar on the navigation!
                    </Typography>
                </>
            )}

            <div className={classes.buttons}>
                <Button
                    onClick={handlePrev}
                    className={classes.button}
                    variant='outlined'
                >
                    Back
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={finish}
                    className={classes.button}
                >
                    Go to Dashboard
                </Button>
            </div>
        </>
    );
};

export default Confirmation;
