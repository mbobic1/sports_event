import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TopBar from '../src/components/TopBar/TopBar';
import Home from '../src/components/Home/Home';
import LoginForm from '../src/components/Login/Login';
import Posts from '../src/components/Posts/Posts';
import Register from '../src/components/Register/Register'
import CreatePost from '../src/components/CreatePost/CreatePost'
import SinglePost from '../src/components/SinglePost/SinglePost'


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
