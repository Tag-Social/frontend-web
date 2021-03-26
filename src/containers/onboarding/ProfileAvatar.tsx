import React, { useEffect, useState, useRef } from 'react';
import { Grid, Button, Avatar } from '@material-ui/core';
import { Edit, Save } from '@material-ui/icons';

import { useStyles } from './styles';
import { useImageUpload } from '../../hooks';
import { UserProfile } from '../../firebase/utils/userProfile';

type Props = {
    profileData: UserProfile;
    setProfileData: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const ProfileAvatar = ({ profileData }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const classes = useStyles();
    const [avatar, setAvatar] = useState<string | ArrayBuffer>();
    const {
        handleImageInput,
        saveImageToFirebase,
        previewImage,
    } = useImageUpload();

    useEffect(() => {
        setAvatar(previewImage || profileData.photoURL);
    }, [profileData.photoURL, previewImage]);

    // Use button to control hidden input
    const inputFocus = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.click();
        }
    };

    // Show different button depending on preview avatar state.
    const actionButton = previewImage ? (
        <Button
            startIcon={<Save />}
            variant='contained'
            disableElevation
            color='primary'
            onClick={() => saveImageToFirebase('avatar')}
        >
            Save
        </Button>
    ) : (
        <Button
            startIcon={<Edit />}
            variant='contained'
            disableElevation
            color='primary'
            onClick={inputFocus}
        >
            Upload photo
        </Button>
    );
    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} justify='center'>
                <Avatar
                    alt='Set your profile avatar'
                    src={avatar?.toString()}
                    className={classes.avatar}
                />
            </Grid>
            <Grid container item xs={12} justify='center'>
                {actionButton}
                <input
                    ref={inputRef}
                    type='file'
                    onChange={handleImageInput}
                    className={classes.avatarInput}
                    id='avatar'
                    name='avatar'
                />
            </Grid>
        </Grid>
    );
};

export default ProfileAvatar;
