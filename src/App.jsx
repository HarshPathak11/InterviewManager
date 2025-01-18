// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CreateInterviewPage from './pages/CreateInterviewPage';
import EditInterviewPage from './pages/EditInterviewPage';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/create" element={<CreateInterviewPage />} />
        <Route path="/edit/:id" element={<EditInterviewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
