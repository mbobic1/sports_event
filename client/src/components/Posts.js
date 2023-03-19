import React, { useState, useEffect } from "react";
import Axios from 'axios'



const Posts = () => {
    const [user, setUser] = useState('');    
    useEffect( () => {
        Axios.get('http://localhost:3001/api/userSession1', {
        withCredentials: true
    })
        .then(response => {
        const data = response.data; // this line reads the data from the response object
        setUser(data); // this will output the data received from the server
    })
        .catch(error => {
        // handle error
        });
    }, []);

    return ( 
        <div className="App1"> 
            <h1>User nakon logina je {user}</h1>    
        </div>
       
    );
}
 
export default Posts;