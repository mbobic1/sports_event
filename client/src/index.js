import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

//ovdje vdijeti da li je loginan user dane mora rerenderati uvjiek u topbaru
/*

const fetchData = () => {
  return fetch('http://localhost:3001/api/userSession1')
        .then((response) => response.json())
        .then((data) => setUser(data));
}


if(user!== null){
  root.render(
    <React.StrictMode>
      <App loginpotci />
    </React.StrictMode>
  );
}else*/
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
