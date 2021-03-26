import { useState, useEffect } from 'react';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Paper, Stepper, Step, StepLabel, Button } from '@material-ui/core';

import { useStyles } from './styles';

import AccountType from './AccountType';
import EduExpForm from './EduExpForm';
import GeneralInfoForm from './GeneralInfoForm';
import SkillsInterestsForm from './SkillsInterestsForm';
import Confirmation from './Confirmation';
import ProfileAvatar from './ProfileAvatar';

const Onboarding = () => {
    const firebase = useFirebase();
    const firestore = useFirestore();
    const [
        auth,
        profile,
    ] = useSelector(({ firebase: { auth, profile } }: RootStateOrAny) => [
        auth,
        profile,
    ]);
    const classes = useStyles();

    // Start at -1. Account type will be selected before starting.
    const [activeStep, setActiveStep] = useState(-1);
    const [profileData, setProfileData] = useState(profile);

    // Helpers for incrementing steps
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handlePrev = () => {
        setActiveStep(activeStep - 1);
    };

    // Save to firebase profile
    const save = () => {
        firebase.updateProfile(profileData);
        // Request to become a mentor
        if (profileData.accountType === 2) {
            firestore.collection('pendingMentors').add({
                uid: auth.uid,
                name: profileData.displayName,
                email: profileData.email,
                date: new Date().toISOString(),
                approved: false,
                dateApproved: '',
            });
        }
    };

    useEffect(() => {
        setProfileData(profile);
    }, [profile]);

    // Pages in Stepper
    const steps = new Map();
    steps.set(
        'General',
        <GeneralInfoForm
            profileData={profileData}
            setProfileData={setProfileData}
        />
    );
    steps.set(
        'Interests & Skills',
        <SkillsInterestsForm
            profileData={profileData}
            setProfileData={setProfileData}
        />
    );
    /* steps.set(
        'Education',
        <EduExpForm profileData={profileData} setProfileData={setProfileData} />
    ); */
    steps.set(
        'Profile Avatar',
        <ProfileAvatar
            profileData={profileData}
            setProfileData={setProfileData}
        />
    );

    return (
        <div className={classes.layout}>
            <Paper className={classes.paper}>
                {/* <Typography gutterBottom variant='h4' align='center'>
                    Account Setup
                </Typography>
                <Divider variant='middle' style={{ marginBottom: 16 }} /> */}
                {activeStep >= 0 && (
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {Array.from(steps.keys()).map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )}
                {activeStep === steps.size ? (
                    <Confirmation
                        profileData={profileData}
                        setProfileData={setProfileData}
                        saveProfile={save}
                        handlePrev={handlePrev}
                    />
                ) : activeStep >= 0 ? (
                    <>
                        {Array.from(steps.values())[activeStep]}
                        <div className={classes.buttons}>
                            {activeStep >= 0 && (
                                <Button
                                    onClick={handlePrev}
                                    className={classes.button}
                                    variant='outlined'
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleNext}
                                className={classes.button}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                ) : (
                    <AccountType
                        profileData={profileData}
                        setProfileData={setProfileData}
                        handleNext={handleNext}
                    />
                )}
            </Paper>
        </div>
    );
};

export default Onboarding;
