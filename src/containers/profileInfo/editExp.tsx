import React, { useState, useEffect, useRef } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import {
    Grid,
    TextField,
    Button,
    Typography,
    Switch,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { Experience } from '../../firebase/utils/userProfile';
import { Autocomplete } from '@material-ui/lab';

import employmentTypes from '../../utils/employmentTypes.json';


type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const EditExp = ({ open, setOpen }: Props) => {
    const firebase = useFirebase();
    const { profile } = useSelector((state: RootStateOrAny) => state.firebase);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [expData, setExpData] = useState<Experience[]>();
    const endOfPage = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setExpData(profile.experience);
    }, [profile]);

    useEffect(() => {
        if (endOfPage && endOfPage.current)
            endOfPage.current.scrollIntoView({ behavior: 'smooth' })
    }, [expData]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        if (expData) setExpData([...expData.map((exp: Experience, i: number) => {
            if (index === i) {
                return {
                    ...exp,
                    [e.target.name]: e.target.value
                }
            } else {
                return exp
            }

        })])
    };

    const onChangeEmploymentType = (
        e: React.ChangeEvent<any>,
        index: number,
        newValue?: string | null
    ) => {
        if (expData) setExpData([...expData.map((exp: Experience, i: number) => {
            if (index === i) {
                return {
                    ...exp,
                    employmentType: e.target.value || newValue
                }
            } else {
                return exp
            }

        })])
    };

    const toggleCurrent = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if (expData) setExpData([...expData.map((exp: Experience, i: number) => {
            if (index === i) {
                return {
                    ...exp,
                    current: !exp.current,
                    endDate: !exp.current ? '' : exp.endDate
                }
            } else {
                return exp
            }

        })])
    };


    const save = () => {
        firebase.updateProfile({ ...profile, experience: expData });
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
        setExpData(profile.experience)
    };

    const addExp = () => {
        if (expData && endOfPage && endOfPage.current) {
            setExpData([
                ...expData,
                {
                    title: '',
                    employmentType: '',
                    organization: '',
                    location: '',
                    description: '',
                    current: false,
                    startDate: '',
                    endDate: '',
                }
            ])
        }
    }

    const deleteExp = (index: number) => {
        if (expData) setExpData([...expData.filter((exp: any, i: number) =>
            index !== i
        )])
    }

    const expForm = expData && expData.map((exp: Experience, index: number) => (
        <React.Fragment key={`exp-${index}`}>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='title'
                    label='Title'
                    onChange={(e) => onChange(e, index)}
                    value={exp.title}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='organization'
                    label='Organization'
                    onChange={(e) => onChange(e, index)}
                    value={exp.organization}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    freeSolo
                    options={employmentTypes}
                    value={exp.employmentType}
                    onChange={(e, newValue) => onChangeEmploymentType(e, index, newValue)}
                    renderInput={(params) => <TextField {...params} name='employmentType' label="Employment Type" margin="normal" />}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type='text'
                    name='location'
                    label='Location'
                    onChange={(e) => onChange(e, index)}
                    value={exp.location}
                    fullWidth
                />
            </Grid>
            <Grid item sm={12}>
                <FormControlLabel
                    control={
                        <Switch
                            name='current'
                            checked={exp.current}
                            onChange={(e) => toggleCurrent(e, index)}
                            color="primary"
                        />
                    }
                    label="Currently working in this role"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    type='date'
                    name='startDate'
                    label='Start Date'
                    value={exp.startDate}
                    onChange={(e) => onChange(e, index)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            {!exp.current && <Grid item xs={6}>
                <TextField
                    type='date'
                    name='endDate'
                    label='End Date'
                    value={exp.endDate}
                    onChange={(e) => onChange(e, index)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>}
            <Grid item xs={12}>
                <TextField
                    type='text'
                    name='description'
                    label='Job Description'
                    value={exp.description}
                    onChange={(e) => onChange(e, index)}
                    fullWidth
                    multiline
                />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={() => deleteExp(index)} >
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
                {"Edit Experience"}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button onClick={addExp} color='primary'>
                            <Add fontSize='small' />
                            Add Experience
                    </Button>
                    </Grid>
                    {expForm}
                </Grid>
                <div ref={endOfPage}></div>
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

export default EditExp;
