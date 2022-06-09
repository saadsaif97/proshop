import { Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Form } from "react-bootstrap"
import Loading from '../components/Loading';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { fetchProduct } from '../actions/productActions';

const ProductScreen = () => {

    const navigate = useNavigate()
    const params = useParams()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(
            fetchProduct(params.id)
        )
    }, [dispatch, params.id])


    return (
        <>
            <Link to='/' className='btn btn-light'>Go Back</Link>
            {
                loading ? <Loading type="cylon" color='#000' /> :
                    error ? <Message variant='danger'>{error}</Message> :
                        <Row className='my-3'>
                            <Col lg={6}>
                                <Image src={product.image} fluid></Image>
                            </Col>
                            <Col lg={3}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h3>{product.name}</h3>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <p>{product.description}</p>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                            <Col lg={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>${product.price}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        {product.countInStock > 0 && (
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Qty:</Col>
                                                    <Col>
                                                        <Form.Control as='select'
                                                            className='w-100 form-control form-control-sm'
                                                            type="number"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map(x =>
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            )}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )}
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <button
                                                className='btn btn-primary w-100'
                                                onClick={() => navigate(`/cart/${params.id}?qty=${qty}`)}
                                                disabled={product.countInStock === 0}>
                                                ADD TO CART
                                            </button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
            }
        </>
    )
}

export default ProductScreen