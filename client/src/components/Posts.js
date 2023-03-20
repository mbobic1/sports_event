import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { observer } from "mobx-react";
import './css/Posts.css'



const Posts = () => {
    const [user, setUser] = useState('');    
    const [listOfPosts, setListOfPosts] = useState([]);
    
    useEffect( () => {
        Axios.get('http://localhost:3001/api/userSession1', {
        withCredentials: true
    })
        .then(response => {
            const data = response.data; // this line reads the data from the response object
            setUser(data);
            
    })
        .catch(error => {
            console.log("Error se desio kod session user" + error);        
        });
    }, []);

    useEffect( () => {
        Axios.get('http://localhost:3001/posts/get', {
            withCredentials: true
        }).then(response => {
            const data = response.data;
            setListOfPosts(data);
        }).catch(error => {
            console.log("Error se desio untuar posts/get " + error);
        })
    });

    return ( 
        <div className="App1">  
        
            <div className="App">
                {listOfPosts.map((value, key) => {
                    return(
                        <div className="post">
                            <div className="title">{value.title}</div>
                            <div className="body">{value.postText}</div>
                            <div className="footer">{value.username}</div>
                        </div>
                    );
                })}
            </div>
        </div>       
    );
}
 
export default observer(Posts);