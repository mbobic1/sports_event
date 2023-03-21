import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TopBar from './components/TopBar';
import Home from './components/Home';
import LoginForm from './components/Login';
import Posts from './components/Posts';
import Register from './components/Register'

function App() {

  

  return (
    <Router>
      <div className="App" style={{ backgroundImage: "url(http://localhost:3000/wallpaper.jpeg)",
                                  backgroundSize: "cover",
                                  width: '100%',
                                  height: '100%' }}>
      <TopBar moj={'sadas'} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />  
          <Route path='/register' element={<Register />} />  
          <Route path='/posts' element={<Posts />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
