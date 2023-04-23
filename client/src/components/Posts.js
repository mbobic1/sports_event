import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import {useHistor} from "react-router-dom"
import './css/Posts.css'



const Posts = () => {
    const [user, setUser] = useState('');    
    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate();
    
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

    const postData = (id) => {
        navigate({
            pathname: `/singlePost/${id}`,
            state: { postId: id }
          });
    }

    return ( 
        <div className="App1">  
        
            <div className="App-posts">
                {listOfPosts.map((value, key) => {
                    return(
                        <div className="post" onClick={ () => postData(value.id) }>
                            <div className="title" style={{backgroundColor: "#f0f2f5", color: "black"}}>{value.title}</div>
                            <div className="body">{value.postText}</div>
                            <div className="footer" style={{backgroundColor: "#f0f2f5", color: "black"}}>{value.username}</div>
                        </div>
                    );
                })}
            </div>
        </div>       
    );
}
 
export default observer(Posts);