import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from './../components/FormContainer';
import Loading from '../components/Loading';
import Message from './../components/Message';
import { userLogin } from './../actions/userActions';

const LoginScreen = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect')

    const { error, loading, userInfo } = useSelector(state => state.userLogin)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(userInfo)
        if (userInfo?.name) {
            redirect ? navigate(`/${redirect}`) : navigate('/')
        }
    }, [userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()

        // dispatch login
        dispatch(userLogin({ email, password }))
    }

    return (
        <FormContainer>
            {error && <Message variant='danger'>
                {error}
            </Message>
            }
            <h3>Login Form</h3>
            <Form onSubmit={(e) => handleSubmit(e)}>
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
                    <Button className='mt-3 btn-block' variant="primary" type="submit" disabled={loading}>
                        {loading ? <Loading type='cylon' /> : 'Submit'}
                    </Button>
                </Form.Group>
            </Form>

            <p className='mt-3'>New Customer? <Link to='/register'>Register</Link></p>
        </FormContainer>
    )
}

export default LoginScreen