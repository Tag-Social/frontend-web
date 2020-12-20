import React from 'react'
import { Typography, Grid } from '@material-ui/core';

type Props = {
    message: string;
    errorType?: number
}

const Bug = ({ message, errorType }: Props) => {
    const bugImages = [
        'https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fassets%2Fbug.svg?alt=media&token=88f1f287-4e60-4a77-8690-dc0351c7b3bc',
        'https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fassets%2Fbug2.svg?alt=media&token=2f7e87fa-a246-42f9-81e4-72dd80dfe32c',
        'https://firebasestorage.googleapis.com/v0/b/tag-app-81b10.appspot.com/o/images%2Fassets%2Fbug3.svg?alt=media&token=d9f327e5-4ce9-4fad-ad48-d6b4c8bd5f9d'
    ]
    return (
        <Grid container>
            <Grid item lg={6} style={{ margin: 'auto' }}>
                {errorType && (
                    <Typography variant='h2' component='h1' style={{ color: '#663695' }}>
                        {errorType}
                    </Typography>
                )}
                <Typography variant='h3' component='h1'>
                    {message}
                </Typography>
            </Grid>
            <Grid item lg={6}>
                <img src={bugImages[Math.round(Math.random() * 2)]}
                    alt='Bug'
                    style={{ width: '100%', height: 'auto' }} />
            </Grid>
        </Grid>
    )
}

export default Bug
