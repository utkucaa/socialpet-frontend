import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/Routes';
import './App.css';
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
