import { Button, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Loading from '../components/Loading';
import Message from '../components/Message';
import { userRegister } from '../actions/userActions';

const ProfileScreen = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')


    const [searchParams] = useSearchParams()

    const { error, loading, userInfo } = useSelector(state => state.userRegister)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo?.name) {

        }
    }, [userInfo])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmpassword) {
            setMessage('Password in not matching')
        } else {
            setMessage('')
            // dispatch login
            dispatch(userRegister({ name, email, password }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <h3>User Profile</h3>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            value={name}
                            placeholder='Enter your name'
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            value={confirmpassword}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required={true}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button className='mt-3 btn-block' variant="primary" type="submit">
                            {loading ? <Loading type='cylon' /> : 'Update'}
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
            <Col md={9}></Col>
        </Row>
    )
}

export default ProfileScreen