import { Link } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Discard, removeFromcart, addToCart } from '../ReduxStore/CartSlice';
import { toast } from 'react-toastify';

function Cart() {
  const inpRef = useRef(null);
  const dispatch = useDispatch();
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const tax = useSelector((state) => state.cart.tax);
  const coupon = useSelector((state) => state.cart.code);
  const cartItem = useSelector((state) => state.cart.cart);

  let count = 0;
  let subtotal = 0;

  const itemsWithQuantities = cartItem
    .filter((el) => el.quantity > 0)
    .map((el) => ({
      itemList: el.itemList,
      quantity: el.quantity,
      Id: el.itemList.id,
    }));

  itemsWithQuantities.forEach((el) => {
    count += el.quantity;
    subtotal += el.quantity * el.itemList.price;
  });

  const handleCoupon = () => {
    if (inpRef.current.value === coupon && !isCouponApplied) {
      setIsCouponApplied(true);
      setDiscountAmount(20);
      inpRef.current.value = '';
      toast.success('Coupon applied! ₹20 discount added.');
    } else {
      toast.error('Invalid or already used coupon.');
    }
  };

  const handleCheckout = () => {
    if (count === 0) return toast.info('No items to purchase');
    toast.success('🎉 Purchase successful! Thank you for shopping.');
  };

  const total = subtotal - discountAmount + subtotal * (tax / 100);

  return (
    <div className="px-4 sm:px-6 md:px-10 mt-10 min-h-screen py-10 bg-gradient-to-l from-[#aa076b] to-[#61045f] text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-6">
        <h1 className="text-3xl font-semibold mb-4 sm:mb-0">
          <span className="text-cyan-400">Shopping</span> Cart
        </h1>
        <p>{count} item(s) in the bag</p>
      </div>

      {itemsWithQuantities.length ? (
        itemsWithQuantities.map((el, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row justify-between items-center border-y border-gray-300 my-4 py-4 gap-6"
          >
            <div className="flex justify-center">
              <img
                className="rounded shadow-lg"
                width={200}
                src={el.itemList.image}
                alt={el.itemList.category}
              />
            </div>

            <div className="sm:w-[40%] flex flex-col justify-center gap-3">
              <h2 className="text-xl font-bold">{el.itemList.title}</h2>
              <p className="text-sm text-gray-200">
                {el.itemList.description.split(' ').slice(0, 10).join(' ')}...
              </p>
              <h3 className="text-lg font-medium text-green-300">
                ₹{el.itemList.price}
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(removeFromcart(el.Id))}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                >
                  -
                </button>
                <span className="bg-lime-600 px-4 py-1 rounded text-center">
                  {el.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(addToCart({ id: el.Id, item: el.itemList }))
                  }
                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  dispatch(Discard(el.Id));
                  toast.info('Item removed from cart');
                }}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Discard
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-teal-200 mt-10">
          <h2 className="text-2xl">No items in cart</h2>
          <Link
            className="mt-4 inline-block bg-cyan-600 px-4 py-2 rounded text-white hover:bg-cyan-700"
            to="/"
          >
            Add Items
          </Link>
        </div>
      )}

      {itemsWithQuantities.length > 0 && (
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-start gap-8">
          {/* Coupon Area */}
          <div className="sm:w-[55%]">
            <h2 className="mb-3 font-semibold text-lg">Have a Promo Code?</h2>
            <div className="flex">
              <input
                ref={inpRef}
                className="w-[60%] py-1 px-4 border rounded-l bg-white text-black outline-none"
                placeholder="Enter Coupon Code"
                maxLength={10}
                type="text"
              />
              <button
                onClick={handleCoupon}
                className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r"
              >
                Apply
              </button>
            </div>
            {isCouponApplied && (
              <p className="text-green-300 mt-2">₹20 Discount Applied</p>
            )}
          </div>

          {/* Summary */}
          <div className="text-right sm:w-[40%] bg-black/20 p-4 rounded shadow-lg">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Discount: -₹{discountAmount.toFixed(2)}</p>
            <p>
              Tax ({tax}%): ₹{(subtotal * (tax / 100)).toFixed(2)}
            </p>
            <p className="text-lg font-bold mt-2">Total: ₹{total.toFixed(2)}</p>

            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-white"
            >
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
