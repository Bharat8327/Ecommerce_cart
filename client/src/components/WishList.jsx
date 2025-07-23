import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../ReduxStore/wishListSlice';
import { addToCart } from '../ReduxStore/CartSlice';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function WishList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.cart);

  const isInCart = (id) => cart.some((item) => item.id === id);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6 text-center">
          💔 Your wishlist is empty
        </h2>
        <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4 sm:px-10">
      <div className="text-2xl text-center font-bold underline mb-8">
        <span className="text-red-500">💖</span> WishList / Home
      </div>

      {/* Header Row */}
      <div className="hidden sm:flex justify-between items-center font-semibold border-b-2 pb-3 text-gray-800 text-lg">
        <div className="w-2/5 flex items-center gap-5">Product</div>
        <div className="w-1/5 text-center">Price</div>
        <div className="w-1/5 text-center">Stock</div>
        <div className="w-1/5 text-center">Action</div>
      </div>

      {/* Wishlist Items */}
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row justify-between items-center border-b py-4 bg-white rounded-lg shadow-sm my-2 px-4"
        >
          {/* Product */}
          <div className="w-full sm:w-2/5 flex gap-4 items-center mb-4 sm:mb-0">
            <MdDelete
              size={22}
              className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => dispatch(removeFromWishlist(item.id))}
              title="Remove from wishlist"
            />
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-contain"
            />
            <div className="text-sm sm:text-base text-gray-700">
              {item.title}
            </div>
          </div>

          {/* Price */}
          <div className="w-full sm:w-1/5 text-center text-sm sm:text-base mb-2 sm:mb-0 text-blue-600 font-medium">
            ₹{item.price}
          </div>

          {/* Stock Status */}
          <div className="w-full sm:w-1/5 text-center text-green-600 font-medium text-sm sm:text-base mb-2 sm:mb-0">
            In Stock
          </div>

          {/* Add to Cart Button */}
          <div className="w-full sm:w-1/5 text-center">
            {isInCart(item.id) ? (
              <span className="text-sm text-gray-500 italic">
                Already in Cart
              </span>
            ) : (
              <button
                onClick={() => dispatch(addToCart({ id: item.id, item }))}
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 text-sm transition-transform duration-200 hover:scale-105"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WishList;
