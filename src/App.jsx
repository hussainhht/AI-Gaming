import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameGrid from './components/GameGrid.jsx';
import Reskin from './components/Reskin.jsx';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={(
              <div>
                <h1 className="text-3xl font-bold mb-6 text-center">GameGen Templates</h1>
                <GameGrid />
              </div>
            )}
          />
          <Route path="/reskin/:template" element={<Reskin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
