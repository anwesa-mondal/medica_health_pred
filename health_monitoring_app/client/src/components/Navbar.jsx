import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { House, Sparkles } from 'lucide-react'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/users/status');
      const status = response?.data?.status;
      console.log(response);
      setIsLoggedIn(status);
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/logout');
      setIsLoggedIn(false);
    } catch (err) {
      console.error('Error:', err);
    }
    navigate('/login');
  };

  return (
    <nav className="bg-blue-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-3xl font-bold text-blue-600 ml-20 flex gap-4">
            <img src="/logo.jpg" alt="logo" className="h-8 w-8" />
            Medica
          </Link>
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                <House />
                </Link>
                <Link to="/diabetes" className="text-gray-600 hover:text-gray-800">
                  Diabetes Prediction
                </Link>
                <Link to="/cardio" className="text-gray-600 hover:text-gray-800">
                  Cardiovascular Prediction
                </Link>
                <Link to="/cancer" className="text-gray-600 hover:text-gray-800">
                  Cancer Detection
                </Link>
                <Link to="/chatbot" className="text-gray-600 hover:text-gray-800">
                  <Sparkles/>
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-600 hover:text-gray-800">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;