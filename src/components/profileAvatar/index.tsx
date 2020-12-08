import React, { useState, useEffect } from 'react';
import { Avatar, Badge, FormControlLabel } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import { useStyles } from './styles';
import { useImageUpload } from '../../hooks';

type Props = {
    alt: string;
    src: string;
};

const ProfileAvatar: React.FC<Props> = ({ alt, src }) => {
    const classes = useStyles();
    const [avatar, setAvatar] = useState<string | ArrayBuffer>();
    const {
        handleImageInput,
        saveImageToFirebase,
        previewImage,
    } = useImageUpload();

    useEffect(() => {
        setAvatar(previewImage || src);
    }, [src, previewImage]);

    const badgeContent = previewImage ? (
        <FormControlLabel
            control={<></>}
            label={<SaveIcon
                onClick={() => saveImageToFirebase('avatar')}
                color='primary'
                className={classes.action} />}
            className={classes.label}
        />
    ) : (
            <FormControlLabel
                control={
                    <input
                        type='file'
                        onChange={handleImageInput}
                        className={classes.input}
                        id='avatar'
                        name='avatar'
                    />
                }
                label={<EditIcon color='primary' className={classes.action} />}
                className={classes.label}
            />
        )

    return (
        <>
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={badgeContent}
            >
                <Avatar
                    alt={alt}
                    src={avatar?.toString()}
                    style={{ width: '100px', height: '100px' }}
                />
            </Badge>
        </>
    );
};

export default ProfileAvatar;
