import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import Home       from './pages/Home';
import Tribes     from './pages/Tribes';
import Events     from './pages/Events';
import Experience from './pages/Experience';
import Gallery    from './pages/Gallery';
import Tickets    from './pages/Tickets';
import BookingSuccess from './pages/BookingSuccess';
import Location   from './pages/Location';
import NotFound   from './pages/NotFound';
import { useCursor } from './hooks/useCursor';
import './styles/globals.css';

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function AppInner() {
  useCursor();

  return (
    <>
      {/* Custom cursor DOM nodes */}
      <div id="cursor"      className="cursor" />
      <div id="cursor-ring" className="cursor-ring" />

      <Navbar />

      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/tribes"     element={<Tribes />} />
          <Route path="/events"     element={<Events />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/gallery"    element={<Gallery />} />
          <Route path="/tickets"    element={<Tickets />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/location"   element={<Location />} />
          {/* 404 fallback */}
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppInner />
    </BrowserRouter>
  );
}
