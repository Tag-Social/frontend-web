import React, { useState, useRef } from 'react';
import {
    Grid,
    Menu,
    MenuItem,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Button
} from '@material-ui/core';
import {
    Edit,
    MoreHoriz,
    Share,
    LocationOn,
    Work,
    AssignmentInd,
    LocalOffer,
} from '@material-ui/icons';

import { ProfileAvatar, ShareDialog } from '..';
import EditHeader from './editHeader'
import { useStyles } from './styles';

interface Props {
    headerItems: {
        owner: boolean;
        displayName: string;
        photoURL: string;
        occupation: string;
        bio: string;
        pronouns: string;
        location: {
            state: string | null | undefined;
            province: string | null | undefined;
            country: string | null | undefined;
        };
        organization: string;
        mentor: boolean;
    };
}

const ProfileHeader = ({ headerItems }: Props) => {
    const classes = useStyles();
    const menuRef = useRef<HTMLButtonElement>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [editInfo, setEditInfo] = useState(false);

    const handleMenuClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setShowMenu(true);
    };

    const handleClose = () => {
        setShowMenu(false);
    };

    const handleShare = () => {
        handleClose()
        if (navigator.share) {
            navigator.share({
                title: `Tag | ${displayName}`,
                text: `Check out ${displayName}'s profile on Tag!`,
                url: document.location.href,
            })
                .catch((error) => console.log('Error sharing', error));
        } else {
            setShowShareDialog(true)
        }

    }

    const {
        owner,
        displayName,
        photoURL,
        occupation,
        location,
        organization,
        bio,
        pronouns,
        mentor,
    } = headerItems;

    const cardActions = (
        <CardActions className={classes.cardActions}>
            <IconButton ref={menuRef} onClick={(e) => handleMenuClick(e)}>
                <MoreHoriz color='primary' fontSize='large' />
            </IconButton>
            <Menu
                id='simple-menu'
                anchorEl={menuRef.current}
                keepMounted
                open={showMenu}
                onClose={handleClose}
            >
                <MenuItem onClick={handleShare}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <Share fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Share' />
                </MenuItem>
                {owner && (
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            setEditInfo(true);
                        }}
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <Edit fontSize='small' />
                        </ListItemIcon>
                        <ListItemText primary='Edit' />
                    </MenuItem>
                )}
            </Menu>
        </CardActions>
    );

    const cardContent = (
        <CardContent className={classes.info}>
            <Typography gutterBottom variant='h4' component='h2'>
                {displayName && displayName}{' '}
                {mentor && <LocalOffer className={classes.status} />}
            </Typography>
            <Grid container>
                {owner && (!bio && !organization && !occupation && !location.country) && (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => setEditInfo(true)}

                    >
                        <Edit style={{ marginRight: 6 }} /> Edit Profile
                    </Button>
                )}
                {(bio || pronouns) && (
                    <Grid item xs={12} sm={12}>
                        {pronouns && (
                            <Typography variant='body1' gutterBottom>
                                {pronouns}
                            </Typography>
                        )}
                        {bio && (
                            <Typography variant='body1' gutterBottom>
                                {bio}
                            </Typography>
                        )}
                    </Grid>
                )}
                {(occupation || organization) && (
                    <Grid item xs={12} sm={6}>
                        {occupation && <ListItem className={classes.listItem}>
                            <AssignmentInd
                                className={classes.profileItemIcon}
                            />
                            <Typography variant='body1'>
                                {occupation}
                            </Typography>
                        </ListItem>}
                        {organization && <ListItem className={classes.listItem}>
                            <Work className={classes.profileItemIcon} />
                            <Typography variant='body1'>
                                {organization}
                            </Typography>
                        </ListItem>}
                    </Grid>
                )}
                {location && location.country && (
                    <Grid item xs={12} sm={6}>
                        <ListItem className={classes.listItem}>
                            <LocationOn
                                className={classes.profileItemIcon}
                            />
                            <Typography variant='body1'>
                                {`${(location.state || location.province)}${(location.state || location.province) && ','} ${location.country}`}
                            </Typography>
                        </ListItem>
                    </Grid>
                )}
            </Grid>
        </CardContent>
    );

    return (
        <Card className={classes.userCard}>
            <CardMedia
                component='img'
                alt='Banner'
                height='200'
                image='https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fdefault-banner.jpg?alt=media&token=425fde9f-6ae8-447b-8684-bf458e9a8255'
                title='Banner'
            />
            {cardActions}
            <div className={classes.avatarContainer}>
                <ProfileAvatar
                    alt={displayName}
                    src={photoURL}
                    editable={owner}
                />
            </div>
            {cardContent}
            <EditHeader open={editInfo} setOpen={setEditInfo} />
            <ShareDialog open={showShareDialog} setOpen={setShowShareDialog} url={document.location.href} />
        </Card>
    );
};

export default ProfileHeader;
