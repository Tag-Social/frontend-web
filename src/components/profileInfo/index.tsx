import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Card,
    CardContent,
    Divider,
    Chip
} from '@material-ui/core';

import { useStyles } from './styles';
import { UserProfile, Education } from '../../firebase/utils/userProfile';

interface Props {
    profile: UserProfile
}


const ProfileInfo = ({ profile }: Props) => {
    const classes = useStyles()
    const { education, interests, skills } = profile
    return (
        <Card className={classes.infoCard}>
            <CardContent>
                <Typography variant='h6' component='h3' className={classes.title}>
                    About
                </Typography>
                <Typography variant='body1' component='h3'>
                    <List>
                        <ListItem>
                            {profile.bio}
                        </ListItem>
                    </List>
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant='h6' component='h3' className={classes.title}>
                    Education
                </Typography>
                <List>
                    {education && education.map((edu: Education, index: number) => (
                        <ListItem key={index}>
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
                <Typography variant='h6' component='h3' className={classes.title}>
                    Interests
                </Typography>
                <List className={classes.chips}>
                    {interests && interests.map((item) => (
                        <Chip
                            size="small"
                            label={item}
                            clickable
                            color="primary"
                        />
                    ))}
                </List>
                <Divider className={classes.divider} />
                <Typography variant='h6' component='h3' className={classes.title}>
                    Skills
                </Typography>
                <List className={classes.chips}>
                    {skills && skills.map((item) => (
                        <Chip
                            size="small"
                            label={item}
                            clickable
                            color="primary"
                        />
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

export default ProfileInfo
