import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromcart, addToCart } from '../ReduxStore/CartSlice';
import { CiHeart } from 'react-icons/ci';
import { addToWishlist, removeFromWishlist } from '../ReduxStore/wishListSlice';
import { FaHeart } from 'react-icons/fa'; // Filled heart icon
import { toast } from 'react-toastify';

function SingleProduce({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.items);

  const toastId = useRef(null);

  const cartItem = cart.find((item) => item.id === product.id);
  const currQuantity = cartItem ? cartItem.quantity : 0;

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.info('Item removed from wishlist.');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Item added to wishlist!');
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, item: product }));
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success('Item added to cart successfully!');
    }
  };

  const handleIncrement = () => {
    dispatch(addToCart({ id: product.id, item: product }));
    toast.success('Increased quantity in cart!');
  };

  const handleDecrement = () => {
    dispatch(removeFromcart(product.id));
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 m-4 max-w-xs w-full sm:max-w-sm md:max-w-md mx-auto group">
      <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow">
        In Stock
      </span>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-20 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform focus:outline-none"
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isInWishlist ? (
          <FaHeart size={22} className="text-red-500" />
        ) : (
          <CiHeart size={24} className="text-gray-500" />
        )}
      </button>

      {/* Product Image */}
      <div className="bg-gray-100 flex justify-center items-center h-40 sm:h-44 md:h-56 overflow-hidden">
        <img
          className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-105"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        <h2
          className="font-bold text-base sm:text-lg text-gray-800 truncate"
          title={product.title}
        >
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm truncate">{product.description}</p>
        <div className="text-blue-600 font-bold text-lg sm:text-xl">
          ₹{product.price}
        </div>
      </div>

      {/* Cart Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-3 sm:px-4 pb-3 sm:pb-4 gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            disabled={currQuantity === 0}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${
              currQuantity === 0
                ? 'bg-gray-100 text-gray-300'
                : 'bg-gray-200 hover:bg-red-400 text-gray-700 hover:text-white'
            }`}
          >
            -
          </button>
          <span className="font-semibold text-base">{currQuantity}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 hover:bg-green-500 text-gray-700 hover:text-white"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default SingleProduce;
