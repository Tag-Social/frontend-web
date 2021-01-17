import React, { useState, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import {
    TextField,
    CircularProgress
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Search } from '@material-ui/icons'

import { useStyles } from './styles';
import { UserProfile } from '../../firebase/utils/userProfile'
import { PROFILES } from '../../routes/routePaths';

const UserSearchBar = () => {
    const classes = useStyles()
    const firestore = useFirestore();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<UserProfile[]>([])
    const loading = open && options.length === 0;

    useEffect(() => {
        firestore
            .collection('users')
            .get()
            .then((snapshot) => {
                const data: React.SetStateAction<any[]> = [];
                snapshot.forEach((doc) =>
                    data.push({ ...doc.data(), id: doc.id } as unknown as UserProfile)
                );
                setOptions(data);
            });
    }, [firestore]);

    return (
        <div className={classes.search}>
            <Autocomplete
                fullWidth
                blurOnSelect
                clearOnBlur={false}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={(e) => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) => option.displayName === value.displayName}
                getOptionLabel={(option) => String(option.displayName)}
                onChange={(_, user) => {
                    if (user && user.id) {
                        history.push(`${PROFILES}/${user.id}`)
                    }
                }}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant='standard'
                        placeholder="Search…"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <Search className={classes.searchIcon} />
                            ),
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                            'aria-label': 'search'
                        }}
                    />
                )}
            />
        </div>
    )
}

export default UserSearchBar
