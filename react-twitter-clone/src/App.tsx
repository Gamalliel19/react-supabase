import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignUpPages } from './pages/SignUpPages';
import SignInPages from './pages/SignInPages';
import { SignOutPages } from './pages/SignOutPages';
import { supabaseClient } from './api/supabaseClient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUpPages />} />
        <Route path='/signin' element={<SignInPages />} />
        <Route path='/signout' element={<SignOutPages />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  );
}

const HomePage = () => {
  const session: any = supabaseClient.auth.session() || '';
  return <div>{session && `you are logged in as ${session.user.email}`}</div>;
};

export default App;
