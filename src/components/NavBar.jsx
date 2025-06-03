import React from 'react'
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const cartItem = useSelector(state => state.cartReducer.cart);
  let count = 0;
  cartItem.forEach(element => count += element.quantity);

  const navigate = useNavigate();

  return (
    <nav>
      <div className='bg-emerald-400 flex justify-between items-center fixed top-0 w-full'  style={{ background: "linear-gradient(to bottom, #e55d87, #5fc3e4)" }}>
        <h1 className='text-3xl font-semibold text-amber-300 py-1 pl-2 animate-bounce'>
          <span className='text-black'>B</span>Patel....
        </h1>
        <div>
          <div className='flex items-center gap-3  pr-1 text-white'>
            <div className='text-xl'>
              <Link to='/'>Add More</Link>
            </div>
            <span className='flex '>{count != 0 ? <h2><sup>{count}</sup></h2> : <p></p>}
              <BsCart4 className='text-2xl ' onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }} />
            </span>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar