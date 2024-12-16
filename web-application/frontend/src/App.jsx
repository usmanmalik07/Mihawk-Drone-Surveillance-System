import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import BookAppointment from './pages/BookAppointment/BookAppointment';
import Services from './pages/Services/Services';
import ContactUs from './pages/ContactUs/ContactUs';
import LoginPage from './pages/Login/LoginPage';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';
import GetAccessPage from './pages/GetAccess/GetAccessPage';
import AdminDashboardPage from './pages/AdminDashboard/AdminDashboard';
import OperatorDashboardPage from './pages/OperatorDashboard/OperatorDashboard';
import ObserverDashboardPage from './pages/ObserverDashboard/ObserverDashboard';
import UserInfo from './pages/UserInfo/UserInfo';
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
          <Route path="/get-access" element={<GetAccessPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/operator-dashboard" element={<OperatorDashboardPage />} />
          <Route path="/observer-dashboard" element={<ObserverDashboardPage />} />
          <Route path="/user-info" element={<UserInfo />} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
