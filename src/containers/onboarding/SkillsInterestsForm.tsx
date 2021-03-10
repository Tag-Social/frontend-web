import React from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { UserProfile } from '../../firebase/utils/userProfile';
import options from '../profileInfo/options';

type Props = {
    profileData: UserProfile;
    setProfileData: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const SkillsInterestsForm = ({ profileData, setProfileData }: Props) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {profileData.interests && (
                    <>
                        <Typography variant='h6'>Interests</Typography>
                        <Autocomplete
                            multiple
                            freeSolo
                            ChipProps={{ color: 'primary' }}
                            options={options}
                            getOptionLabel={(option) => option}
                            value={profileData.interests}
                            onChange={(event, value) =>
                                setProfileData({
                                    ...profileData,
                                    interests: value,
                                })
                            }
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </>
                )}
            </Grid>
            <Grid item xs={12}>
                {profileData.skills && (
                    <>
                        <Typography variant='h6'>Skills</Typography>
                        <Autocomplete
                            multiple
                            freeSolo
                            options={options}
                            ChipProps={{ color: 'primary' }}
                            getOptionLabel={(option) => option}
                            value={profileData.skills}
                            onChange={(_, value) =>
                                setProfileData({
                                    ...profileData,
                                    skills: value,
                                })
                            }
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default SkillsInterestsForm;
