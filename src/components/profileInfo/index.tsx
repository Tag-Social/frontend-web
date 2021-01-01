import React, { useState } from 'react';
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
import { UserProfile, Education } from '../../firebase/utils/userProfile';
import EditEdu from './editEdu'
import EditInterests from './editInterests'
import EditSkills from './editSkills'

interface Props {
    profile: UserProfile
    owner: boolean
}


const ProfileInfo = ({ profile, owner }: Props) => {
    const [editEdu, setEditEdu] = useState(false)
    const [editSkills, setEditSkills] = useState(false)
    const [editInterests, setEditInterests] = useState(false)
    const classes = useStyles()
    const { education, interests, skills } = profile
    return (
        <Card className={classes.infoCard}>
            <CardContent>
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
                                <Typography variant='body1' component='h3' className={classes.title}>
                                    {edu.school}
                                </Typography>
                                <Typography variant='body1' component='p'>
                                    {edu.fieldOfStudy}
                                </Typography>
                                <Typography variant='caption' component='p'>
                                    {edu.startYear} - {edu.endYear}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
                <Divider className={classes.divider} />
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
            </CardContent>
            <EditEdu open={editEdu} setOpen={setEditEdu} />
            <EditSkills open={editSkills} setOpen={setEditSkills} />
            <EditInterests open={editInterests} setOpen={setEditInterests} />
        </Card>
    );
}

export default ProfileInfo
