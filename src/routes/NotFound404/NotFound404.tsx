import React from 'react'
import { Container, CssBaseline } from '@material-ui/core';
import { Bug } from '../../components'

const NotFound404 = () => {
    return (
        <Container maxWidth='lg'>
            <CssBaseline />
            <Bug message="Sorry this page couldn't be found..." errorType={404} />
        </Container>
    )
}

export default NotFound404