import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import NavBar from './Components/NavBar'
import RoomsPage from './Pages/RoomsPage'
import LoginPage from './Pages/LoginPage'
import AuthContext from './Contextes/AuthContext'
import { useState } from 'react'
import AuthService from './Services/AuthService'
import AdminRoomsPage from './Pages/AdminRoomsPage'
import AdminClientsPage from './Pages/AdminClientsPage'
import AdminReservationsPage from './Pages/AdminReservationsPage'
import AdminServicesPage from './Pages/AdminServicesPage'
import ServicesPage from './Pages/ServicesPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [isConnected, setIsConnected] = useState(AuthService.isConnected());
  const [role, setRole] = useState(AuthService.getRole());
  const [user, setUser] = useState(AuthService.getUser());

  return <>
    <AuthContext.Provider value={{ isConnected, setIsConnected, role, setRole, user, setUser }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={<LoginPage />} />
          {role == 'ADMIN' ? <>
            <Route path="/admin/rooms" element={<AdminRoomsPage />} />
            <Route path="/admin/clients" element={<AdminClientsPage />} />
            <Route path="/admin/reservations" element={<AdminReservationsPage />} />
            <Route path="/admin/services" element={<AdminServicesPage />} />
          </> : <>
            <Route path='*' element={<HomePage />} />
          </>}
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </AuthContext.Provider>
  </>
}

export default App
