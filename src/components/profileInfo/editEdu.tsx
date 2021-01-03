import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

import {
    Grid,
    TextField,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';

import { Education } from '../../firebase/utils/userProfile';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
//TODO : Finish
const EditEdu = ({ open, setOpen }: Props) => {
    const firebase = useFirebase();
    const { profile } = useSelector((state: RootStateOrAny) => state.firebase);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [eduData, setEduData] = useState<Education[]>();

    useEffect(() => {
        setEduData(profile.education);
    }, [profile]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        if (eduData) setEduData([...eduData.map((edu: any, i: number) => {
            if (index === i) {
                return {
                    ...edu,
                    [e.target.name]: e.target.value
                } 
            } else {
                return edu
            }

        })])
    };


    const save = () => {
        firebase.updateProfile({ ...profile, education: eduData });
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
        setEduData(profile.education)
    };

    const addEdu = () => {
        if (eduData) setEduData([
            ...eduData,
            {
                fieldOfStudy: '',
                school: '',
                degree: '',
                endYear: undefined,
                startYear: undefined,
            }
        ])
    }

    const deleteEdu = (index: number) => {
        if (eduData) setEduData([...eduData.filter((edu: any, i: number) =>
            index !== i
        )])
    }

    const eduView = eduData && eduData.map((edu: Education, index: number) => (
        <React.Fragment key={`edu-${index}`}>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='school'
                    label='School'
                    onChange={(e) => onChange(e, index)}
                    value={edu.school}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='fieldOfStudy'
                    label='Field of Study'
                    onChange={(e) => onChange(e, index)}
                    value={edu.fieldOfStudy}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='degree'
                    label='Degree'
                    onChange={(e) => onChange(e, index)}
                    value={edu.degree}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='startYear'
                    label='Start Year'
                    value={edu.startYear}
                    onChange={(e) => onChange(e, index)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='endYear'
                    label='End Year'
                    value={edu.endYear}
                    onChange={(e) => onChange(e, index)}
                    fullWidth
                />
            </Grid><Grid item xs={12}>
                <Button onClick={() => deleteEdu(index)} >
                    <Delete color='error' fontSize='small' />
                    <Typography variant='caption' color='error'>
                        Remove
                    </Typography>
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </React.Fragment>
    ))


    return (
        <Dialog
            fullScreen={fullScreen}
            scroll='paper'
            open={open}
            onClose={handleClose}
            aria-labelledby='responsive-dialog-title'
        >
            <DialogTitle id='responsive-dialog-title'>
                {"Edit Education"}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button onClick={addEdu} color='primary'>
                            <Add fontSize='small' />
                            Add Education
                    </Button>
                    </Grid>
                    {eduView}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color='primary'>
                    Cancel
                </Button>
                <Button onClick={save} color='primary' autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditEdu;
