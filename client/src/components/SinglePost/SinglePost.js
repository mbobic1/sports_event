import React from "react";
import { useState, useEffect } from 'react';
import './SinglePost.css'
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


    useEffect( () => {
        Axios.get("https://sportevent-alom.onrender.com/getPostbyId", {
            params: {
              postId: id
            },
            withCredentials: true
          })
          .then(response => {
            setPost(response.data)
          })
          .catch(error => {
            console.log(error);
          });
    }, []);

    useEffect( () => {
      Axios.get("https://sportevent-alom.onrender.com/getCommentsbyId", {
        params: {
          postId: id
        },
        withCredentials: true
      })
      .then(response => {
        const data = response.data      
        setComments(data);       
      })
      .catch(error => {
        console.log(error);
      });
    }, []);

    const addComment = async () => {
      const response = await Axios.post("https://sportevent-alom.onrender.com/insertComment", {
        comment: newComment,
        postId: id,
      },{
        withCredentials: true
      })
      .then((response) => {
        const commentToAdd = { commentBody: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
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
                <div className="addCommentContainer">
                  <input
                    type="text"
                    placeholder="Comment..."
                    autoComplete="off"
                    value={newComment}
                    onChange={(event) => {
                      setNewComment(event.target.value);
                    }}
                  />
                  <button variant="outlined" size="medium" onClick={addComment}> Add Comment</button>
               </div>
               <div className="listOfComments">
                {comments.map((comment, key) => {
                  return (
                    <div key={key} className="comment">
                      {comment.comment}
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