import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Landing from './pages/Landing';
import Choose from './pages/Choose';
import Metadata from './pages/Metadata';
import { PhotoMetadata } from 'includes';
import './App.css';

export type PMContextContents = {
  pmlist: PhotoMetadata[];
  setPmlist: React.Dispatch<React.SetStateAction<PhotoMetadata[]>>;
};

export const PMContext = React.createContext({} as PMContextContents);

export default function App() {
  const [ pmlist, setPmlist ] = useState([] as PhotoMetadata[]);
  return (
    <PMContext.Provider value={{pmlist, setPmlist}}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/choose" element={<Choose />} />
          <Route path="/metadata" element={<Metadata />} />
        </Routes>
      </Router>
    </PMContext.Provider>
  );
}
