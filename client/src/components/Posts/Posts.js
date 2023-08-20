import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import {useHistor} from "react-router-dom"
import './Posts.css'



const Posts = () => {
    const [user, setUser] = useState('');    
    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate();
    
    useEffect( () => {
        Axios.get('https://sportevent-alom.onrender.com/posts/get', {
            withCredentials: true
        }).then(response => {
            const data = response.data;
            setListOfPosts(data);
        }).catch(error => {
            console.log("Error se desio untuar posts/get " + error);
        })
    }, []);

    const checkUser () => {
        if(localStorage.getItem('username')){
            setUser(true);
        }else{
            setUser(false);
        }
    }
 

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
 
export default Posts;