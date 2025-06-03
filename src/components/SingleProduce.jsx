import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromcart, addToCart } from '../ReduxStore/CartSlice'

function SingleProduce({ product }) {
    // console.log(product.images[0]);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.cart)
    const cartItem = cart.find(item => item.id == product.id)
    const currQuantity = cartItem ? cartItem.quantity : 0;
    return (
        <div className='border-solid border-2 rounded-sm border-gray-300 text-center mt-4'>
            <div className='flex justify-center'>
                <img className='h-70 object-center' src={product.image} alt={product.title} />
            </div>
            <div className='p-6'>
                <h2 className='font-semibold text-sm'><span className='text-amber-500'>Name:- </span>{product.title}</h2>
                <p>Price: {product.price}</p>
            </div>
            <div className='flex justify-center gap-6 items-center'>
                <button className='text-2xl bg-teal-400 w-10 rounded-sm' onClick={() => dispatch(removeFromcart(product.id))}>-</button>
                <h4>{currQuantity}</h4>
                <button className='text-2xl bg-teal-400 w-10 rounded-sm' onClick={() => dispatch(addToCart({ id: product.id, item: product }))}>+</button>
            </div>
        </div>
    )
}

export default SingleProduce



