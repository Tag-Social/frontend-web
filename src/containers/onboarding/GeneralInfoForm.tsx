import React from 'react';
import {
    Grid,
    Typography,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    InputAdornment,
} from '@material-ui/core';
import { LinkedIn } from '@material-ui/icons';
import { useStyles } from './styles';
import { UserProfile } from '../../firebase/utils/userProfile';

type Props = {
    profileData: UserProfile;
    setProfileData: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const GeneralInfoForm = ({ profileData, setProfileData }: Props) => {
    const classes = useStyles();

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const changeLocation = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProfileData({
            ...profileData,
            location: {
                ...profileData.location,
                [e.target.name]: e.target.value,
            },
        });
    };
    const changeSocial = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProfileData({
            ...profileData,
            social: {
                ...profileData.social,
                [e.target.name]: e.target.value,
            },
        });
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    label='Name'
                    fullWidth
                    value={profileData.displayName}
                    onChange={onChange}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='email'
                    name='email'
                    label='Email'
                    onChange={onChange}
                    value={profileData.email}
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>Social</Typography>
            </Grid>
            <Grid item sm={6}>
                <TextField
                    type='text'
                    name='linkedin'
                    label='LinkedIn'
                    onChange={changeSocial}
                    value={profileData.social?.linkedin}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <LinkedIn className={classes.linkedin} />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
};

export default GeneralInfoForm;
