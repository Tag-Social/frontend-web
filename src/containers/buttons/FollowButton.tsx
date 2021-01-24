import { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Button } from '@material-ui/core';
import { GroupAdd, Remove } from '@material-ui/icons';

import { Relationship } from '../../firebase/utils/relationships';
import { useRelationships } from '../../hooks';
import { getRelationships } from '../../redux/actions/relationships';
import { useStyles } from './styles';

type Props = {
    uid: string;
    size?: 'small' | 'large' | 'medium';
};

const FollowButton = ({ uid, size }: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [
        auth,
        following,
    ] = useSelector(({ relationships, firebase }: RootStateOrAny) => [
        firebase.auth,
        relationships.following,
    ]);
    const relationship = following.find(
        (rel: Relationship) => rel.uid2 === uid
    );
    const { follow, unfollow } = useRelationships(auth.uid);
    const fontSize = size === 'medium' ? 'inherit' : size;

    useEffect(() => {}, [following]);

    return !relationship ? (
        <Button
            size={size}
            color='primary'
            variant='contained'
            disableElevation
            onClick={() => {
                follow(uid);
                dispatch(getRelationships(auth.uid));
            }}
        >
            <GroupAdd className={classes.buttonIcon} fontSize={fontSize} />{' '}
            Follow
        </Button>
    ) : (
        <Button
            size={size}
            color='primary'
            variant='outlined'
            disableElevation
            onClick={() => {
                unfollow(relationship.relId);
                dispatch(getRelationships(auth.uid));
            }}
        >
            <Remove className={classes.buttonIcon} fontSize={fontSize} />{' '}
            Unfollow
        </Button>
    );
};

export default FollowButton;
