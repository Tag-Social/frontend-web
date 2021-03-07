import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
    Button,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    IconButton,
    TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { LocalOffer, PersonAdd, Remove, LinkedIn, FileCopy } from '@material-ui/icons';

import { Relationship } from '../../firebase/utils/relationships';
import { useRelationships } from '../../hooks';
import { getRelationships } from '../../redux/actions/relationships';
import { useStyles } from './styles';
import { UserProfile } from '../../firebase/utils/userProfile';

type Props = {
    user: UserProfile;
    uid: string;
    size?: 'small' | 'large' | 'medium';
    mentor: boolean;
};

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const RequestsButton = ({ mentor, uid, size, user }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const optionsRef = useRef<HTMLButtonElement>(null);
    const [showOptions, setShowOptions] = useState(false);
    const [showDialog, setShowDialog] = useState(false)
    const [
        auth,
        relationships,
    ] = useSelector(({ relationships, firebase }: RootStateOrAny) => [
        firebase.auth,
        relationships,
    ]);
    const [message, setMessage] = useState(`Hi ${
        user.displayName?.split(' ')[0]
    }! I am currently looking for a mentor and I found you on TAG! Below is a link to my TAG profile. Hope to hear from you soon!
    http://gettagged.co/profiles/${auth.uid}`);

    const mentorRel = relationships.mentees.find(
        (rel: Relationship) => rel.uid2 === uid
    );
    const menteeRel = relationships.mentors.find(
        (rel: Relationship) => rel.uid1 === uid
    );
    const pendingMentorRel = relationships.pending.mentees.find(
        (rel: Relationship) => rel.uid2 === uid
    );
    const pendingMenteeRel = relationships.pending.mentors.find(
        (rel: Relationship) => rel.uid1 === uid
    );

    const noRel = Boolean(
        mentorRel || menteeRel || pendingMentorRel || pendingMenteeRel
    );

    const mentorshipId =
        (menteeRel && menteeRel.relId) || (mentorRel && mentorRel.relId);
    const {
        requestMentorship,
        acceptMentorship,
        terminateMentorship,
    } = useRelationships(auth.uid);
    const fontSize = size === 'medium' ? 'inherit' : size;

    const submitRequest = () => {
        requestMentorship(uid);
        if (user.social?.linkedin) {
            setShowDialog(true)
        }
    };
    const copyText = () => {
        if (navigator.clipboard) navigator.clipboard.writeText(message);
     };

    const dialog = (
        <Dialog
            open={showDialog}
            onClose={() => setShowDialog(false)}
            aria-labelledby='responsive-dialog-title'
        >
            <DialogTitle id='responsive-dialog-title'>
                {`Notify ${user.displayName} on LinkedIn!`}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {`Copy the message below and invite ${
                            user.displayName?.split(' ')[0]
                        } to connect with this message in the body.`}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='input-with-icon-textfield'
                            multiline
                            variant='outlined'
                            fullWidth
                            value={message}
                            onChange={(e)=> setMessage(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <IconButton onClick={copyText}>
                                        <FileCopy color='primary' />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    startIcon={<LinkedIn/> }
                    variant='contained'
                    disableElevation
                    href={`https://linkedin.com/in/${user.social?.linkedin}`}
                    color='primary'
                >{`${user.displayName}`}
                </Button>
                <Button
                    onClick={() => setShowDialog(false)}
                    color='primary'
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );

    useEffect(() => {}, [relationships]);
    return mentor || pendingMenteeRel || pendingMentorRel || mentorshipId ? (
        <>
            <Button
                startIcon={
                    <LocalOffer
                        fontSize={fontSize}
                    />
                }
                ref={optionsRef}
                onClick={(e) => setShowOptions(true)}
                color='primary'
                variant='contained'
                size={size}
                disableElevation
            >
                {pendingMenteeRel
                    ? 'Pending...'
                    : pendingMentorRel
                    ? 'Accept'
                    : 'Mentorship'}
            </Button>
            <StyledMenu
                anchorEl={optionsRef.current}
                keepMounted
                open={showOptions}
                onClose={() => setShowOptions(false)}
                elevation={1}
                onClick={() => {
                    dispatch(getRelationships(auth.uid));
                    setShowOptions(false);
                }}
            >
                {!noRel && mentor && (
                    <StyledMenuItem
                        onClick={submitRequest}
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <LocalOffer fontSize={fontSize} />
                        </ListItemIcon>
                        <ListItemText primary='Request Mentorship' />
                    </StyledMenuItem>
                )}
                {pendingMentorRel && (
                    <StyledMenuItem
                        onClick={() => {
                            acceptMentorship(pendingMentorRel.relId);
                        }}
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <PersonAdd fontSize={fontSize} />
                        </ListItemIcon>
                        <ListItemText primary='Accept Request' />
                    </StyledMenuItem>
                )}
                {pendingMenteeRel && (
                    <StyledMenuItem
                        onClick={() => {
                            terminateMentorship(pendingMenteeRel.relId);
                        }}
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <Remove fontSize={fontSize} />
                        </ListItemIcon>
                        <ListItemText primary='Cancel Request' />
                    </StyledMenuItem>
                )}
                {mentorshipId && (
                    <StyledMenuItem
                        onClick={() => {
                            terminateMentorship(mentorshipId);
                        }}
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <Remove fontSize={fontSize} />
                        </ListItemIcon>
                        <ListItemText primary='End Mentorship' />
                    </StyledMenuItem>
                )}
            </StyledMenu>
            {dialog}
        </>
    ) : null;
};

export default RequestsButton;
