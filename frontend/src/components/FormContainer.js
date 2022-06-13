import { Col, Row } from 'react-bootstrap';

import React from 'react'

const FormContainer = ({ children }) => {
    return (
        <Row>
            <Col md={6} className='mx-auto'>
                {children}
            </Col>
        </Row>
    )
}

export default FormContainer