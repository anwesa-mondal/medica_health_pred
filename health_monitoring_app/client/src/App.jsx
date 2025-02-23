import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Diabetes from './pages/Diabetes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Cardio from './pages/Cardio';
import CancerDetection from './pages/Cancer';
import Home from './pages/Home';
import GenAi from './pages/GenAi';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container min-h-screen mx-auto px-4 py-8 flex justify-center items-center" style={{
          "background": "url('/bg.jpg') no-repeat center center fixed",
          "backgroundSize": "cover"
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diabetes" element={<Diabetes />} />
            <Route path="/cardio" element={<Cardio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cancer" element={<CancerDetection />} />
            <Route path="/chatbot" element={<GenAi />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;