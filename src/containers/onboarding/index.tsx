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
import { UserProfile } from '../../firebase/utils/userProfile';

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
    const [activeStep, setActiveStep] = useState(-1);
    const [profileData, setProfileData] = useState(profile);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handlePrev = () => {
        setActiveStep(activeStep - 1);
    };

    const save = () => {
        firebase.updateProfile(profileData);
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

    const steps = ['General', 'Interests & Skills', 'Education'];

    const getStepForm = (step: Number) => {
        switch (step) {
            case 0:
                return (
                    <GeneralInfoForm
                        profileData={profileData}
                        setProfileData={setProfileData}
                    />
                );
            case 1:
                return (
                    <SkillsInterestsForm
                        profileData={profileData}
                        setProfileData={setProfileData}
                    />
                );
            case 2:
                return (
                    <EduExpForm
                        profileData={profileData}
                        setProfileData={setProfileData}
                    />
                );
            default:
                throw new Error('Unknown step');
        }
    };

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
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )}
                {activeStep === steps.length ? (
                    <Confirmation
                        profileData={profileData}
                        setProfileData={setProfileData}
                        saveProfile={save}
                        handlePrev={handlePrev}
                    />
                ) : activeStep >= 0 ? (
                    <>
                        {getStepForm(activeStep)}
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
