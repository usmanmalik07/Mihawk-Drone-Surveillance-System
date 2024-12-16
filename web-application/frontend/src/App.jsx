import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import BookAppointment from './pages/BookAppointment/BookAppointment';
import Services from './pages/Services/Services';
import ContactUs from './pages/ContactUs/ContactUs';
import LoginPage from './pages/Login/LoginPage';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book-an-appointment" element={<BookAppointment />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
