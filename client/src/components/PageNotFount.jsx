import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const PageNotFount = (props) => {
  const userId = localStorage.getItem('userId');
  return (
    <div className="h-screen flex flex-col items-center justify-center relative">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-red-500 to-green-500 text-transparent bg-clip-text animate-pulse">
        Page Not Found 404!
      </h2>
      <Link
        to="/"
        className="mt-4 text-xl text-black hover:text-blue-700 transition duration-100 ease-in-out transform hover:scale-120 hover:underline"
      >
        Back To Home Page...?
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFount);
