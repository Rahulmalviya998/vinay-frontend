import './Appp.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import React, { useState } from 'react';
import Home from './Component/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './Component/UserContext';
import UserProfile from './Component/Profile.js';
import AddProject from './Component/AddProject.js';
import ShowProject from './Component/ShowProject.js';
import TaskList from './Component/TaskList.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <UserProvider>
      <div className="App">
        {!isLoggedIn ? (
          <Home onLogin={handleLogin} />
        ) : (
          <>
            <Header onLogout={handleLogout} />
            <Routes>
              <Route path='/' element={<ShowProject />} />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/tasklist' element={<TaskList />} />
              <Route path='/addproject' element={<AddProject />} />
              <Route path='/logout' element={<Home onLogin={handleLogin} />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </UserProvider>
  );
}

export default App;
