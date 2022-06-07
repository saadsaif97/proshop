import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios';

const HomeScreen = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let { data } = await axios.get('/api/products')
                setProducts(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts()
    }, [])


    return (
        <>
            <Row>
                {
                    products.map(product => {
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