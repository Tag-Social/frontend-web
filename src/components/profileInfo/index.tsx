import React, { useState } from 'react';
import moment from 'moment'
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Card,
    CardActions,
    CardContent,
    Divider,
    Chip,
    IconButton
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit'

import { useStyles } from './styles';
import { UserProfile, Education, Experience } from '../../firebase/utils/userProfile';
import EditEdu from './editEdu'
import EditExp from './editExp'
import EditInterests from './editInterests'
import EditSkills from './editSkills'

interface Props {
    profile: UserProfile
    owner: boolean
}


const ProfileInfo = ({ profile, owner }: Props) => {
    const [editEdu, setEditEdu] = useState(false)
    const [editExp, setEditExp] = useState(false)
    const [editSkills, setEditSkills] = useState(false)
    const [editInterests, setEditInterests] = useState(false)
    const classes = useStyles()
    const { education, experience, interests, skills } = profile

    const eduDisplay = education && (
        <>
            <CardActions className={classes.infoHeader}>
                <Typography variant='h6' component='h3' className={classes.title}>
                    Education
                        </Typography>
                {owner && <IconButton aria-label="edit" className={classes.editButton} onClick={() => setEditEdu(true)}>
                    <Edit color='primary' fontSize='small' />
                </IconButton>}
            </CardActions>
            <List>
                {education && education.map((edu: Education, index: number) => (
                    <ListItem key={`education-${index}`}>
                        <ListItemText>
                            <Typography variant='body1' component='h3' className={classes.itemTitle}>
                                {edu.school}
                            </Typography>
                            <Typography variant='body2' component='p'>
                                {edu.fieldOfStudy}
                            </Typography>
                            {edu.startYear && <Typography variant='body2' component='p' color='textSecondary'>
                                {edu.startYear}
                                {edu.endYear && '- ' + edu.endYear}
                            </Typography>}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Divider className={classes.divider} />
        </>
    )

    const expDisplay = experience && (
        <>
            <CardActions className={classes.infoHeader}>
                <Typography
                    variant='h6'
                    component='h3'
                    className={classes.title}
                >
                    Experience
                </Typography>
                {owner && (
                    <IconButton
                        aria-label='edit'
                        className={classes.editButton}
                        onClick={() => setEditExp(true)}
                    >
                        <Edit color='primary' fontSize='small' />
                    </IconButton>
                )}
            </CardActions>
            <List>
                {experience.map((exp: Experience, index: number) => (
                    <ListItem key={`experience-${index}`}>
                        <ListItemText>
                            <Typography
                                variant='body1'
                                component='h3'
                                className={classes.itemTitle}
                            >
                                {exp.title}
                            </Typography>
                            <Typography variant='body1' component='h3'>
                                {exp.organization}
                            </Typography>
                            {exp.startDate && (
                                <Typography
                                    variant='body2'
                                    component='p'
                                    color='textSecondary'
                                >
                                    {moment(exp.startDate).format("MMM, YYYY")}
                                    {exp.endDate && ' - ' + moment(exp.endDate).format("MMM, YYYY")}
                                    {exp.current && ' - Current'}
                                </Typography>
                            )}
                            <Typography variant='body2' gutterBottom component='p' color='textSecondary'>
                                {exp.location}
                            </Typography>
                            <Typography variant='body1' component='p'>
                                {exp.description}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Divider className={classes.divider} />
        </>
    );

    const interestsDisplay = interests && (
        <>
            <CardActions className={classes.infoHeader}>
                <Typography variant='h6' component='h3' className={classes.title}>
                    Interests
                        </Typography>
                {owner && <IconButton aria-label="edit" className={classes.editButton} onClick={() => setEditInterests(true)}>
                    <Edit color='primary' fontSize='small' />
                </IconButton>}
            </CardActions>
            <List className={classes.chips}>
                {interests && interests.map((item, index) => (
                    <Chip
                        key={`interests-${index}`}
                        size="small"
                        label={item}
                        clickable
                        color="primary"
                    />
                ))}
            </List>
            <Divider className={classes.divider} />
        </>
    )

    const skillsDisplay = skills && (
        <>
            <CardActions className={classes.infoHeader}>
                <Typography variant='h6' component='h3' className={classes.title}>
                    Skills
                        </Typography>
                {owner && <IconButton aria-label="edit" className={classes.editButton} onClick={() => setEditSkills(true)}>
                    <Edit color='primary' fontSize='small' />
                </IconButton>}
            </CardActions>
            <List className={classes.chips}>
                {skills && skills.map((item, index) => (
                    <Chip
                        key={`skills-${index}`}
                        size="small"
                        label={item}
                        clickable
                        color="primary"
                    />
                ))}
            </List>
            <Divider className={classes.divider} />
        </>
    )

    return (
        <>
            <Card className={classes.infoCard}>
                <CardContent>
                    {eduDisplay}
                    <EditEdu open={editEdu} setOpen={setEditEdu} />
                    {expDisplay}
                    <EditExp open={editExp} setOpen={setEditExp} />
                    {interestsDisplay}
                    <EditInterests open={editInterests} setOpen={setEditInterests} />
                    {skillsDisplay}
                    <EditSkills open={editSkills} setOpen={setEditSkills} />
                </CardContent>
            </Card>
        </>
    );
}

export default ProfileInfo
