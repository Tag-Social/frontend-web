import React, { useEffect } from 'react';
import {
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import employmentTypes from '../../utils/employmentTypes.json';

import { UserProfile } from '../../firebase/utils/userProfile';

type Props = {
    profileData: UserProfile;
    setProfileData: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const EduExpForm = ({ profileData, setProfileData }: Props) => {
    const { education, experience } = profileData;

    useEffect(() => {
        if (!education[0]) {
            setProfileData({
                ...profileData,
                education: [
                    {
                        fieldOfStudy: '',
                        school: '',
                        degree: '',
                        endYear: '',
                        startYear: '',
                    },
                ],
            });
        }

        if (!experience[0]) {
            setProfileData({
                ...profileData,
                experience: [
                    {
                        title: '',
                        employmentType: '',
                        organization: '',
                        location: '',
                        description: '',
                        current: false,
                        startDate: '',
                        endDate: '',
                    },
                ],
            });
        }
    }, [experience, education]);

    const editEducation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({
            ...profileData,
            education: [
                ...education.map((edu, index) => {
                    if (index === 0) {
                        return {
                            ...edu,
                            [e.target.name]: e.target.value,
                        };
                    } else {
                        return edu;
                    }
                }),
            ],
        });
    };

    const editExperience = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData({
            ...profileData,
            experience: [
                ...experience.map((exp, index) => {
                    if (index === 0) {
                        return {
                            ...exp,
                            [e.target.name]: e.target.value,
                        };
                    } else {
                        return exp;
                    }
                }),
            ],
        });
    };

    const onChangeEmploymentType = (
        e: React.ChangeEvent<any>,
        newValue?: string | null
    ) => {
        setProfileData({
            ...profileData,
            experience: [
                ...experience.map((exp, index) => {
                    if (index === 0) {
                        return {
                            ...exp,
                            employmentType: e.target.value || newValue,
                        };
                    } else {
                        return exp;
                    }
                }),
            ],
        });
    };

    const toggleCurrentJob = () => {
        setProfileData({
            ...profileData,
            experience: [
                ...experience.map((exp, index) => {
                    if (index === 0) {
                        return {
                            ...exp,
                            current: !exp.current,
                            endDate: !exp.current ? '' : exp.endDate,
                        };
                    } else {
                        return exp;
                    }
                }),
            ],
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h6'> Recent Education </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='school'
                    label='School'
                    value={education[0]?.school || ''}
                    onChange={editEducation}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='fieldOfStudy'
                    label='Field of Study'
                    value={education[0]?.fieldOfStudy || ''}
                    onChange={editEducation}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='degree'
                    label='Degree'
                    value={education[0]?.degree || ''}
                    onChange={editEducation}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='startYear'
                    label='Start Year'
                    value={education[0]?.startYear}
                    onChange={editEducation}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='endYear'
                    label='End Year'
                    value={education[0]?.endYear}
                    onChange={editEducation}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' style={{ paddingTop: 16 }}>
                    Recent Experience
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='title'
                    label='Title'
                    onChange={editExperience}
                    value={experience[0]?.title || ''}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='organization'
                    label='Organization'
                    onChange={editExperience}
                    value={experience[0]?.organization || ''}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    freeSolo
                    options={employmentTypes}
                    value={experience[0]?.employmentType || ''}
                    onChange={onChangeEmploymentType}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name='employmentType'
                            label='Employment Type'
                            margin='normal'
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='location'
                    label='Location'
                    onChange={editExperience}
                    value={experience[0]?.location || ''}
                    fullWidth
                />
            </Grid>
            <Grid item sm={12}>
                <FormControlLabel
                    control={
                        <Switch
                            name='current'
                            checked={experience[0]?.current || false}
                            onChange={toggleCurrentJob}
                            color='primary'
                        />
                    }
                    label='Currently working in this role'
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    type='date'
                    name='startDate'
                    label='Start Date'
                    value={String(experience[0]?.startDate)}
                    onChange={editExperience}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            {!experience[0]?.current && (
                <Grid item xs={6}>
                    <TextField
                        type='date'
                        name='endDate'
                        label='End Date'
                        value={String(experience[0]?.endDate)}
                        onChange={editExperience}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <TextField
                    type='text'
                    name='description'
                    label='Job Description'
                    value={experience[0]?.description || ''}
                    onChange={editExperience}
                    fullWidth
                    multiline
                />
            </Grid>
        </Grid>
    );
};

export default EduExpForm;
