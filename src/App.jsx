import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import EventsPage from './pages/EventsPage'
import TouristInfoPage from './pages/TouristInfoPage'
import ContactPage from './pages/ContactPage'

function AppInner() {
  const location = useLocation()

  // Derive active nav label from pathname
  const pathToLabel = {
    '/about': 'About',
    '/events': 'Events',
    '/tourist': 'Tourist Info',
    '/contact': 'Contact',
  }
  const active = pathToLabel[location.pathname] || ''

  return (
    <>
      <Navbar active={active} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/tourist" element={<TouristInfoPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
