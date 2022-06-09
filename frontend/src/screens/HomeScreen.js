import { Col, Row } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Loading from './../components/Loading';
import Message from '../components/Message';
import Product from '../components/Product'
import { listProducts } from './../actions/productActions';

const HomeScreen = () => {

    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.productList)

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <Row>

                {
                    loading ? <Loading color='#000' type='cylon' />
                        : error ? <Message variant='danger'>{error}</Message> :
                            products?.map(product => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                )
                            })
                }
            </Row>
        </>
    )
}

export default HomeScreen