import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react'

import FormContainer from './../components/FormContainer';
import { saveShippingAddress } from './../actions/cartActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShippingScreen = () => {

    const { shippingAddress } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!address || !postalCode || !country || !city) {
            return alert('Please fill in all the fields')
        }
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }


    return (
        <FormContainer>
            <h3>Shipping Address</h3>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        value={address}
                        placeholder='Enter your address'
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        value={city}
                        placeholder='Enter your city'
                        onChange={(e) => setCity(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        value={postalCode}
                        placeholder='Enter your postal code'
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        value={country}
                        placeholder='Enter your country'
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Button className='mt-3' variant="primary" type="submit">
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen