import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../ReduxStore/ProductSlice';
import { Spin } from 'antd'
import SingleProduce from './SingleProduce';
import { LoadingOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';


function ProductList() {
    // https://fakestoreapi.com/products api
    const dispatch = useDispatch();
    const product = useSelector(state => state.Product.products);
    const status = useSelector(state => state.Product.status)
    useEffect(() => {
        dispatch(fetchData());
    }, [])

    if (status == 'loading') {
        return <Spin style={{ position: "absolute", top: "40%", left: "45%" }} indicator={<LoadingOutlined spin />} size="large" />
    }

    if (status == 'network issue') {
        return <h1 className='text-center font-semibold text-3xl'>Uh Oh! somehting went wrong</h1>
    }


    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-10  mt-[35px]'>
            {
                product.map((el, idx) => <SingleProduce product={el} key={idx} />)
            }
            <Outlet />
        </div>
    )
}

export default ProductList