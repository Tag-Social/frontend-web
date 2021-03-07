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
    Button,
    Link,
} from '@material-ui/core';
import {
    Edit,
    MoreHoriz,
    Share,
    LocationOn,
    Work,
    AssignmentInd,
    LocalOffer,
    LinkedIn,
    Facebook,
    Twitter,
    Instagram,
} from '@material-ui/icons';

import { ProfileAvatar, ShareDialog } from '..';
import EditHeader from './editHeader';
import { useStyles } from './styles';
import { UserProfile } from '../../firebase/utils/userProfile';
import RequestsButton from '../buttons/RequestsButton';

interface Props {
    profile: UserProfile;
    profileId: string;
    owner: boolean;
}

const ProfileHeader = ({ profile, profileId, owner }: Props) => {
    const classes = useStyles();
    const moreRef = useRef<HTMLButtonElement>(null);
    const [showMore, setShowMore] = useState(false);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [editInfo, setEditInfo] = useState(false);
    const {
        displayName,
        photoURL,
        occupation,
        location,
        organization,
        bio,
        pronouns,
        mentor,
        social,
    } = profile;
    const handleMoreClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setShowMore(true);
    };

    const handleMoreClose = () => {
        setShowMore(false);
    };

    const handleShare = () => {
        handleMoreClose();
        if (navigator.share) {
            navigator
                .share({
                    title: `Tag | ${displayName}`,
                    text: `Check out ${displayName}'s profile on Tag!`,
                    url: document.location.href,
                })
                .catch((error) => console.log('Error sharing', error));
        } else {
            setShowShareDialog(true);
        }
    };
    const headerActions = (
        <CardActions className={classes.cardActions}>
            {!owner && (
                <>
                    <RequestsButton
                        size='small'
                        user={profile}
                        uid={profileId}
                        mentor={mentor}
                    />
                </>
            )}
            <Button
                ref={moreRef}
                onClick={(e) => handleMoreClick(e)}
                color='primary'
                variant='outlined'
                size='small'
            >
                <MoreHoriz color='primary' fontSize='small' /> More
            </Button>
            <Menu
                anchorEl={moreRef.current}
                keepMounted
                open={showMore}
                onClose={handleMoreClose}
                elevation={1}
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
                            handleMoreClose();
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

    const socialLinks = social && Object.keys(social).length > 0 && (
        <CardActions className={classes.socialActions}>
            {social.facebook && (
                <Link
                    href={`http://facebook.com/${social.facebook}`}
                    target='_blank'
                >
                    <Facebook className={classes.facebook} fontSize='large' />
                </Link>
            )}
            {social.instagram && (
                <Link
                    href={`http://instagram.com/${social.instagram}`}
                    target='_blank'
                >
                    <Instagram className={classes.instagram} fontSize='large' />
                </Link>
            )}
            {social.linkedin && (
                <Link
                    href={`http://linkedin.com/in/${social.linkedin}`}
                    target='_blank'
                >
                    <LinkedIn className={classes.linkedin} fontSize='large' />
                </Link>
            )}
            {social.twitter && (
                <Link
                    href={`http://twitter.com/${social.twitter}`}
                    target='_blank'
                >
                    <Twitter className={classes.twitter} fontSize='large' />
                </Link>
            )}
        </CardActions>
    );

    const headerContent = (
        <CardContent className={classes.info}>
            <Typography gutterBottom variant='h4' component='h2'>
                {displayName && displayName}{' '}
                {mentor && <LocalOffer className={classes.status} />}
            </Typography>
            <Grid container>
                {owner &&
                    !bio &&
                    !organization &&
                    !occupation &&
                    !location.country && (
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
                        {occupation && (
                            <ListItem className={classes.listItem}>
                                <AssignmentInd
                                    className={classes.profileItemIcon}
                                />
                                <Typography variant='body1'>
                                    {occupation}
                                </Typography>
                            </ListItem>
                        )}
                        {organization && (
                            <ListItem className={classes.listItem}>
                                <Work className={classes.profileItemIcon} />
                                <Typography variant='body1'>
                                    {organization}
                                </Typography>
                            </ListItem>
                        )}
                    </Grid>
                )}
                {location && location.country && (
                    <Grid item xs={12} sm={6}>
                        <ListItem className={classes.listItem}>
                            <LocationOn className={classes.profileItemIcon} />
                            <Typography variant='body1'>
                                {`${location.state || location.province}${
                                    (location.state || location.province) && ','
                                } ${location.country}`}
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
            {headerActions}
            <div className={classes.avatarContainer}>
                <ProfileAvatar
                    alt={String(displayName)}
                    src={String(photoURL)}
                    editable={owner}
                    />
            </div>
            {headerContent}
            {socialLinks}
            <EditHeader open={editInfo} setOpen={setEditInfo} />
            <ShareDialog
                open={showShareDialog}
                setOpen={setShowShareDialog}
                url={document.location.href}
            />
        </Card>
    );
};

export default ProfileHeader;
