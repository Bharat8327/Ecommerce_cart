import React from 'react'
import NavBar from './components/NavBar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import { Route, Routes } from 'react-router-dom'
import PageNotFount from './components/PageNotFount'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='*' element={<PageNotFount />} />
        <Route path='/' element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App