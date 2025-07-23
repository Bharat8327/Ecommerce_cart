import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BsCart4 } from 'react-icons/bs';
import { CgLogOut } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  let count = 0;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const cartItem = useSelector((state) => state.cart.cart);
  cartItem.forEach((element) => (count += element.quantity));

  const Admin = [{ to: '/Admin', name: 'AdminDashBoard' }];

  const customer = [
    // { to: '/home', name: 'Home' },
    { to: '/about', name: 'About' },
    { to: '/admin', name: 'Admin' },

    { to: '/contact', name: 'Contact' },
    // { to: '/customer', name: 'Dashboard' },
    { to: '/wishlist', name: 'wishlist' },
  ];

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setIsLoggedOut(true);
  };

  useEffect(() => {
    if (isLoggedOut) {
      import('axios').then(({ default: axios }) => {
        axios
          .post('http://localhost:4000/auth/logout', { withCredentials: true })
          .finally(() => {
            navigate('/login');
          });
      });
    }
  }, [isLoggedOut, navigate]);

  return (
    <nav className="bg-gradient-to-b from-pink-500 to-blue-300 shadow-md fixed top-0 w-full z-50 mb-[100px] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-300 animate-bounce cursor-pointer">
            <Link to="/">
              {' '}
              <span className="text-black">E</span>commerce{' '}
            </Link>
          </h1>
          <div className="hidden md:flex items-center space-x-6">
            {customer.map((el, idx) => (
              <Link
                to={el.to}
                className="text-white hover:text-amber-200 font-medium transition"
                key={idx}
              >
                {el.name}
              </Link>
            ))}
            <span className="relative flex items-center">
              <BsCart4
                className="text-2xl cursor-pointer"
                onClick={() => navigate('/cart')}
              />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {count}
                </span>
              )}
            </span>
            {/* <div className="text-red-600 font-bold flex mt-1 items-center cursor-pointer text-2xl">
              <CgLogOut onClick={handleLogOut} />
            </div> */}
          </div>
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-white "
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden mt-2 bg-gradient-to-b from-pink-500 to-blue-300 rounded shadow-lg py-2 px-4">
            {customer.map((el, idx) => (
              <Link
                to={el.to}
                className="block text-white py-2 px-3 rounded hover:bg-amber-200 hover:text-black "
                onClick={() => setShowMenu(false)}
                key={idx}
              >
                {el.name}
              </Link>
            ))}
            <div className="flex items-center py-2 px-3">
              <BsCart4
                className="text-2xl cursor-pointer text-white"
                onClick={() => {
                  setShowMenu(false);
                  navigate('/cart');
                }}
              />
              {count > 0 && (
                <span className="-mt-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {count}
                </span>
              )}
            </div>
            {/* <div className="text-red-600 font-bold flex -mt-1 items-center cursor-pointer ">
              <CgLogOut onClick={handleLogOut} />
            </div> */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
