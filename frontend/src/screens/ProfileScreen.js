import { Button, Col, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
    const DEFAULT_MESSAGE = { type: 'danger', text: '' }

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState(DEFAULT_MESSAGE)
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector(state => state.userLogin)
    const { error, loading, user } = useSelector(state => state.userDetails)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [user])

    const handleUpdate = (e) => {
        e.preventDefault()

        if (password !== confirmpassword) {
            setMessage({ type: 'danger', text: 'Password in not matching' })
        } else {
            setMessage(DEFAULT_MESSAGE)
            // dispatch login
            dispatch(updateUserDetails('profile', { name, email, password }))
            setPassword('')
            setConfirmPassword('')
            setMessage({ type: 'success', text: 'Profile Updated Successfully' })
        }
    }

    return (
        <Row>
            <Col md={3}>
                {message.text && <Message variant={message.type}>{message.text}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <h3>User Profile</h3>
                <Form onSubmit={(e) => handleUpdate(e)}>
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
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button className='mt-3 btn-block' variant="primary" type="submit" disabled={loading}>
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