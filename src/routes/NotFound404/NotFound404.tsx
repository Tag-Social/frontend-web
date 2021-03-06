import React from 'react'
import { Container } from '@material-ui/core';
import { Bug } from '../../containers'

const NotFound404 = () => {
    document.title = 'Tag | ' + 404;
    return (
        <Container maxWidth='lg'>
            <Bug
                message="Sorry this page couldn't be found..."
                errorType={404}
            />
        </Container>
    );
}

export default NotFound404