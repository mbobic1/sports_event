import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TopBar from './components/TopBar';
import Home from './components/Home';
import LoginForm from './components/Login';
import Posts from './components/Posts';
import Register from './components/Register'
import CreatePost from './components/CreatePost'
import SinglePost from './components/SinglePost'

function App() {

  

  return (
    <Router>
      <div className="App" >
      <TopBar moj={'sadas'} />
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
