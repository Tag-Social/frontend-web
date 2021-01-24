import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
    Button,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { LocalOffer, PersonAdd, Remove } from '@material-ui/icons';

import { Relationship } from '../../firebase/utils/relationships';
import { useRelationships } from '../../hooks';
import { getRelationships } from '../../redux/actions/relationships';
import { useStyles } from './styles';

type Props = {
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

const RequestsButton = ({ mentor, uid, size }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const optionsRef = useRef<HTMLButtonElement>(null);
    const [showOptions, setShowOptions] = useState(false);
    const [
        auth,
        relationships,
    ] = useSelector(({ relationships, firebase }: RootStateOrAny) => [
        firebase.auth,
        relationships,
    ]);

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

    useEffect(() => {}, [relationships]);
    return mentor || pendingMenteeRel || pendingMentorRel ? (
        <>
            <Button
                ref={optionsRef}
                onClick={(e) => setShowOptions(true)}
                color='primary'
                variant='contained'
                size={size}
                disableElevation
            >
                <LocalOffer
                    fontSize={fontSize}
                    className={classes.buttonIcon}
                />
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
                        onClick={() => {
                            requestMentorship(uid);
                        }}
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
        </>
    ) : null;
};

export default RequestsButton;
