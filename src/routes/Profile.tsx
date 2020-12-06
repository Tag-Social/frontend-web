import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux'
import { Grid, TextField, Typography, Avatar } from '@material-ui/core';


// TODO: Finish
const Profile = () => {
    const profile = useSelector((state: RootStateOrAny) => state.firebase.profile)
    const [formData, setFormData] = useState({
        avatar: '',
        name: '',
        email: '',
    })

    useEffect(() => {
        setFormData({
            avatar: profile.avatarUrl,
            name: profile.displayName,
            email: profile.email,
        })
    }, [profile])

    const { avatar, name, email } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Typography variant='h5' gutterBottom>
                Profile Info
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Avatar alt={name} src={avatar} style={{ width: '100px', height: '100px' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        variant='outlined'
                        value={name}
                        name='name'
                        label='Full Name'
                        fullWidth
                        autoComplete='name'
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        variant='outlined'
                        value={email}
                        name='email'
                        label='Email Address'
                        fullWidth
                        autoComplete='email'
                        onChange={onChange}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
