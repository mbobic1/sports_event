import React from "react";
import { useState, useEffect } from 'react';
import './css/SinglePost.css'
import { useParams } from "react-router-dom";
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'

//unutar app.js koristimo hook za parametre koje saljemo
//pregledati kako radi autocomplete 
const SinglePost = () => {
    let { id } = useParams(); //ovako citamo sta smo poslali koa parametar kroz rutu
    const [Post , setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

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

    const addComment = () => {

    }
    
    return(
        <div className="App1">
          <div className="postPage">
            <div className="leftSide">
              {Post.map((value, key) => {
                      return(
                          <div className="post"  id="individual">
                              <div className="title" style={{backgroundColor: "#f0f2f5", color: "black"}}>{value.title}</div>
                              <div className="body">{value.postText}</div>
                              <div className="footer" style={{backgroundColor: "#f0f2f5", color: "black"}}>{value.username}</div>
                          </div>
                      );
                  })}
            </div>
            <div className="rightSide">
              <div class="row d-flex justify-content-center" style={{ marginTop: "150px"}}>
                <div class="col-md-8 col-lg-6">
                  <div class="card shadow-0 border" style={{backgroundColor: "#f0f2f5"}}>
                    <div class="card-body p-4">
                      <div class="form-outline mb-4">
                        <input type="text" id="addANote" class="form-control" placeholder="Type comment..." />
                        <label class="form-label" for="addANote" style={{color: "black"}}>+ Add a note</label>
                          <div class="card">
                            <div class="card-body">
                              <p style={{color: "black"}}>Type your note, and hit enter to add it</p>

                              <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="avatar" width="25"
                                    height="25" />
                                  <p class="small mb-0 ms-2" style={{color: "black"}}>Johny</p>
                                </div>
                                <div class="d-flex flex-row align-items-center">
                                  <p class="small text-muted mb-0">Upvote?</p>
                                  <i class="far fa-thumbs-up ms-2 fa-xs text-black" style={{marginTop: "-0.16rem"}}></i>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>    
            </div>
          </div>
        </div>
    );
}

export default SinglePost;