import React, { useState, useEffect} from "react";
import Axios from "axios";
import "./CreatePost.css"
import { useNavigate } from "react-router-dom"; 


const CreatePost = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [popupStyle, showPopu] = useState("hide")

    const [user, setUSer] = useState(false); 

    if(localStorage.getItem('username')){
        setUSer(localStorage.getItem('username'));
    }else{
        setUSer(false);
    }


    const postData = async () => {
        try {
            if(!username || !password){
                showPopu("login-popup")
                popup();
            }
            else{
                const response = await Axios.post('https://sportevent-alom.onrender.com/posts/insert', {
                    title : username,
                    postText : password,
                    name: user
                }, {
                    withCredentials: true // include credentials in the request
                });
                if(response.data===true){
                    navigate("/posts");      
                }          
            }
        } catch (error) {
          console.error(error);
        }
    }


    const popup = () => {
        showPopu("login-popup")
        setTimeout(() => showPopu("hide"), 3000)
    }


    
    return ( 
        <div className="App1"> 
            <div className="cover">
                    <h1>Kreiraj post</h1>
                    <input type="text" placeholder="naziv aktivnosti" onChange={(e)=>{
                        setUsername(e.target.value)
                    }}/>
                    <input type="text" className="opis" placeholder="opis događaja" onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    <button className="login-btn" onClick={postData}>Kreiraj post</button>
                   
                    <div className={popupStyle}>
                        <h2>Niste popunili sve polja.</h2>
                    </div>

            </div>
       </div>
       
    );
}
 
export default CreatePost;