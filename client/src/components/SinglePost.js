import React from "react";
import { useState, useEffect } from 'react';
import './css/SinglePost.css'
import { useParams } from "react-router-dom";
import Axios from 'axios'


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
                              <div className="title">{value.title}</div>
                              <div className="body">{value.postText}</div>
                              <div className="footer">{value.username}</div>
                          </div>
                      );
                  })}
            </div>
            <div className="rightSide">
              <div className="addCommentContainer">
                  <input
                    type="text"
                    placeholder="Comment..."
                    autoComplete="off"
                    value={newComment}
                    onChange={(event) => {
                      setNewComment(event.target.value);
                    }}
                  ></input>
                  <button onClick={addComment}> Add Comment</button>
                </div>
                <div className="listOfComments">
                  {comments.map((comment, key) => {
                    return (
                      <div key={key} className="comment">
                        {comment.commentBody}
                      </div>
                    );
                  })}
                </div>
              </div>
          </div>
        </div>
    );
}

export default SinglePost;