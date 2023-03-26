import React from "react";
import { useState, useEffect } from 'react';
import './css/SinglePost.css'
import { useParams } from "react-router-dom";
import Axios from 'axios'


//unutar app.js koristimo hook za parametre koje saljemo

const SinglePost = () => {
    let { id } = useParams(); //ovako citamo sta smo poslali koa parametar kroz rutu
    const [Post , setPost] = useState([]);
    console.log("Uslo je u SinglePost klasu");
    useEffect( () => {
        Axios.get("http://localhost:3001/getPostbyId", {
            params: {
              postId: id
            },
            withCredentials: true
          })
          .then(response => {
            console.log(response.data);
            setPost(response.data)
          })
          .catch(error => {
            console.log(error);
          });
    }, []);
    
    return(
        <div className="App1">
            {Post.map((value, key) => {
                    return(
                        <div className="post">
                            <div className="title">{value.title}</div>
                            <div className="body">{value.postText}</div>
                            <div className="footer">{value.username}</div>
                        </div>
                    );
                })}
        </div>
    );
}

export default SinglePost;