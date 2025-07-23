import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import WishList from './components/WishList';
import PageNotFount from './components/PageNotFount';
import ProtectRoutes from './routes/ProtectRoutes';
import AdminDashboard from './pages/AdminDashboard';
import About from './components/About';
import Contact from './components/Contact';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
      <Routes>
        <Route path="*" element={<PageNotFount />} />

        <Route element={<ProtectRoutes role={'customer'} />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
