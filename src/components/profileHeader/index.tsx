import React, { useState, useRef } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import {
    Grid,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import { ProfileAvatar } from '..';
import { useStyles } from './styles';

interface Props {
    headerItems: {
        displayName: string;
        photoURL: string;
        occupation: string;
        location: {
            state: string | null | undefined;
            province: string | null | undefined;
            country: string | null | undefined;
        };
        organization: string;
        mentor: boolean;
    }
}

const ProfileHeader = ({ headerItems }: Props) => {
    const classes = useStyles();
    const menuRef = useRef<HTMLButtonElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setShowMenu(true);
    };

    const handleClose = () => {
        setShowMenu(false);
    };

    const { displayName, photoURL, occupation, location, organization, mentor } = headerItems;

    const cardActions = (
        <CardActions className={classes.cardActions}>
            <Button ref={menuRef} onClick={(e) => handleClick(e)}>
                <MoreHorizIcon />
            </Button>
            <Menu
                id='simple-menu'
                anchorEl={menuRef.current}
                keepMounted
                open={showMenu}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <ShareIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Share' />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon className={classes.listItemIcon}>
                        <EditIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Edit' />
                </MenuItem>
            </Menu>
        </CardActions>
    );

    const cardContent = (
        <CardContent className={classes.info}>
            <Typography gutterBottom variant='h4' component='h2'>
                {displayName && displayName} {mentor && <LocalOfferIcon className={classes.status} />}
            </Typography>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <ListItem>
                        <AssignmentIndIcon className={classes.profileItemIcon} />
                        <Typography variant='body1'>
                            {occupation && occupation}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <WorkIcon className={classes.profileItemIcon} />
                        <Typography variant='body1'>
                            {organization && organization}
                        </Typography>
                    </ListItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List dense>
                        <ListItem>
                            <LocationOnIcon className={classes.profileItemIcon} />
                            <Typography variant='body1'>
                                {location && `${location.state || location.province}, ${location.country
                                    }`}
                            </Typography>
                        </ListItem>
                    </List>
                </Grid>
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
                <ProfileAvatar alt={displayName} src={photoURL} />
            </div>
            {cardContent}
        </Card>
    );
};

export default ProfileHeader;
