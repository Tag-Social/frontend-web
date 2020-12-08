import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useFirebase } from 'react-redux-firebase'

import { ProfileAvatar } from "../components";

// TODO: Finish
const Profile = () => {
    const firebase = useFirebase()
    const { auth, profile } = useSelector(
        (state: RootStateOrAny) => state.firebase
    );
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        setFormData({
            name: profile.displayName,
            email: profile.email,
        });
    }, [profile, auth]);

    const { name, email } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Typography variant='h5' gutterBottom>
                Profile
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <ProfileAvatar alt={name} src={auth.photoURL} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant='outlined'
                        value={name}
                        name='name'
                        label='Full Name'
                        fullWidth
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant='outlined'
                        value={email}
                        name='email'
                        label='Email Address'
                        fullWidth
                        onChange={onChange}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
