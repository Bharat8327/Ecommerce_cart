import { Link } from 'react-router-dom';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Discard } from '../ReduxStore/CartSlice';

function Cart() {
    let count = 0;
    let total = 0;
    const inpRef = useRef(null);
    const dispatch = useDispatch();

    const tax = useSelector(state => state.cartReducer.tax)
    const coupon = useSelector(state => state.cartReducer.code);
    const cartItem = useSelector(state => state.cartReducer.cart);
    const itemsOfCart = useSelector(state => state.cartReducer.cart);

    cartItem.forEach(element => count += element.quantity);
    const itemsWithQuantities = itemsOfCart.filter(el => el.quantity > 0).map(el => ({
        itemList: el.itemList,
        quantity: el.quantity,
        Id: el.itemList.id,
    }));

    itemsWithQuantities.map(el => total += el.quantity * el.itemList.price);

    let first = 0;
    const handleSubmit = () => {
        if (inpRef.current.value == coupon && count && first++ === 0) {
            inpRef.current.value = null
            total -= 10
        }
    }

    return (
        <div className='px-5 h-full min-h-screen mt-10' style={{ background: "linear-gradient(to left, #aa076b, #61045f)" }} >
            <div className='flex justify-between items-end '>
                <h1 className='text-2xl font-semibold'><span className='text-cyan-500'>Shopping</span> Cart</h1>
                <div>
                    <p>{count} items in The bag</p>
                </div>
            </div>

            {(itemsWithQuantities.length !== 0 ? (
                itemsWithQuantities.map((el, idx) =>

                    <div key={idx} className='flex justify-between border-t border-b border-gray-700-900 pr-4 mt-3'>
                        <div className=' m-2'>
                            <img width={200} src={`${el.itemList.image}`} alt={el.itemList.category} />
                        </div>

                        <div className='w-[50%] flex flex-col gap-5 justify-center'  >
                            <h1 className='font-semibold text-2xl'>{el.itemList.title}</h1>
                            <p>{el.itemList.description}</p>
                            <h3 className='text-xl font-medium text-red-400'>Price: {el.itemList.price}</h3>
                        </div>

                        <div className='flex flex-col justify-center gap-[30%] px-2'>
                            <p className='bg-lime-600 rounded-sm text-center'>{el.quantity}</p>
                            <button className='bg-green-700 px-1 py-1 rounded-sm' onClick={() => dispatch(Discard(el.Id))}>Discard</button>
                        </div>
                    </div>


                )) : (<div className='text-center  text-teal-300'><h2 className='text-2xl'>No items... </h2><Link className='text-white underline' to='/'>Add Items?</Link> </div>))
            }

            <div className='mt-3 flex  '>
                <div className='w-[90%]'>
                    <h2 className='text-white'>Have a Promo Code?</h2>
                    <div>
                        <input ref={inpRef} className='border-2 w-[30%] py-1 border-emerald-500 outline-none pl-4 placeholder-emerald-500' placeholder='Enter Coupon Code' maxLength={5} minLength={5} type="text" />
                        <button onClick={handleSubmit} className='bg-emerald-500 text-white rounded-r-full px-4 py-1.5'>Apply</button>
                    </div>
                </div>

                <div>
                    <div className='flex gap-4 items-end mt-3'>
                        <div>
                            <p>SubTotal</p>
                            <p>Tax</p>
                            <p>Total</p>
                        </div>
                        <div>
                            {/* Original Price×(1+Tax Rate) */}
                            <p>{total.toFixed(2)}</p>
                            <p>{total ? tax : 0} %</p>
                            <p>{total = (total * (1 + (tax / 100))).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className='text-center mt-3 bg-emerald-600 px-3 py-2 rounded-sm text-white'>
                        <button>Check out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart