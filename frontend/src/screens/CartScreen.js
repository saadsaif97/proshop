import { Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from './../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from 'react-bootstrap';
import Message from '../components/Message';

const CartScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id: productID } = useParams()
    const [searchParams] = useSearchParams()
    const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1

    const { cartItems } = useSelector(state => state.cart)


    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty))
        }
    }, [dispatch, productID, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const proceedToCheckoutHandler = () => {
        navigate('/login?redirect=shipping')
        console.log('checkout')
    }

    return (
        <>
            <h1>SHOPPING CART</h1>
            {
                cartItems.length === 0 ? <Message>Your Shopping Cart is empty <Link to='/'>Continue Shopping</Link></Message> :
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                {cartItems.map(item => (
                                    <ListGroupItem key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid></Image>
                                            </Col>
                                            <Col xs={4} className='my-sm-2 my-md-0' md={4}>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col xs={2} className='my-sm-2 my-md-0' md={2}>
                                                <p className='fw-bold'>${item.price}</p>
                                            </Col>
                                            <Col xs={2} className='my-sm-2 my-md-0' md={2}>
                                                <Form.Control as='select'
                                                    className='w-100 form-control form-control-sm'
                                                    type="number"
                                                    value={item.qty}
                                                    onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                                                >
                                                    {[...Array(item.countInStock).keys()].map(x =>
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    )}
                                                </Form.Control>
                                            </Col>
                                            <Col xs={2} className='my-sm-2 my-md-0' md={2}>
                                                <button className='btn btn-light' onClick={() => removeFromCartHandler(item.product)}>
                                                    <i className='fas fa-trash text-secondary'></i>
                                                </button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h5>Subtotal ({cartItems.reduce((ac, item) => ac + Number(item.qty), 0)}) items</h5>
                                        <p>${cartItems.reduce((ac, item) => ac + (item.price * Number(item.qty)), 0).toFixed(2)}</p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <button className='btn btn-primary w-100' onClick={() => proceedToCheckoutHandler()}>PROCEED TO CHECKOUT</button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }
        </>
    )
}

export default CartScreen