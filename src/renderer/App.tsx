import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Choose from './pages/Choose';
import Metadata from './pages/Metadata';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/metadata" element={<Metadata />} />
      </Routes>
    </Router>
  );
}
