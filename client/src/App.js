import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TopBar from './components/TopBar/TopBar';
import Home from './components/Home/Home';
import LoginForm from './components/Login/Login';
import Posts from './components/Posts/Posts';
import Register from './components/Register/Register'
import CreatePost from './components/CreatePost/CreatePost'
import SinglePost from './components/SinglePost/SinglePost'

function App() {

  

  return (
    <Router>
      <div className="App" >
      <TopBar moj={'user'} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />  
          <Route path='/register' element={<Register />} />  
          <Route path='/posts' element={<Posts />} />  
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/singlePost/:id' element={<SinglePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
