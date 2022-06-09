import React from 'react'
import ReactLoading from "react-loading"

const Loading = ({ type, color }) => {
    return (
        <div className='w-100 d-flex justify-content-center'>
            <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
        </div>
    )
}

export default Loading