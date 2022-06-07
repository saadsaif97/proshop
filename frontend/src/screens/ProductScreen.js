import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Image, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import Rating from '../components/Rating';

const ProductScreen = () => {

    let params = useParams()

    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                let { data } = await axios.get(`/api/products/${params.id}`)
                setProduct(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProduct()
    }, [params])


    return (
        <>
            <Link to='/' className='btn btn-light'>Go Back</Link>
            <Row className='my-3'>
                <Col md={6}>
                    <Image src={product.image} fluid></Image>
                </Col>
                <Col md={3}>
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
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <button
                                    className='btn btn-primary w-100'
                                    disabled={product.countInStock === 0}>
                                    ADD TO CART
                                </button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen