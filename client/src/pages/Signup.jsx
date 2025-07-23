import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldUser } from 'lucide-react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    try {
      const res = await axios.post(
        'http://localhost:4000/auth/signup',
        formData,
      );
      setTimeout(() => {
        setLoading(!!loading);
        navigate('/login');
      }, 2000);
    } catch (e) {
      console.log('error', e.message);
    }
  };
  /* 
   e.preventDefault();
    setLoading(!loading);
    setTimeout(() => {
      setLoading(!!loading);
      navigate('/login');
    }, 8000);
  */

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (formData.password !== e.target.value) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-700 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 animate-fadeInUp border border-purple-500/30 relative">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                  Sign up
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <span className="text-[#C29970]">already have an account? </span>
            <Link
              to="/login"
              className="text-pink-400 hover:text-pink-300 font-medium transition-colors duration-200"
            >
              login
            </Link>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#C29970] mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/80 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-[#C29970] placeholder:text-[#a78b6c]"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#C29970] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/80 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-[#C29970] placeholder:text-[#a78b6c]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#C29970] mb-2"
              >
                Mobile No
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  minLength={10}
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-black/80 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-[#C29970] placeholder:text-[#a78b6c]"
                  placeholder="Enter mobile no"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-[#C29970] mb-2"
              >
                Select Role
              </label>
              <div className="relative">
                <ShieldUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  defaultValue={'customer'}
                  className="w-full pl-10 pr-4 py-3 bg-black/80 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-[#C29970] placeholder:text-[#a78b6c]"
                >
                  <option value="">Choose Role</option>
                  <option value="customer">customer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#C29970] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 bg-black/80 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-[#C29970] placeholder:text-[#a78b6c]"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300  cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 " />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#C29970] mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full pl-10 pr-10 py-3 bg-black/80 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-[#C29970] placeholder:text-[#a78b6c]"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300  cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-2">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg  cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
