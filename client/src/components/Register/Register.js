import React, { useState} from "react";
import Axios from "axios";
import "./Register.css"
import { useNavigate } from "react-router-dom"; 


const SigninForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [popupStyle, showPopu] = useState("hide")
    const [popUpSameUser, showPopSameUser] = useState("hide");

    function provjeriStringove(x1, x2){
        return x1 === x2;
    }

    const postData = async () => {
        try {
            if(!username || !password || !name){
                showPopu("login-popup")
                popup();
            }
            else{
                const response = await Axios.post('https://sportevent-alom.onrender.com/api/insert', {
                    username: username,
                    password: password,
                    name: name
                }, {
                    withCredentials: true // include credentials in the request
                });
                if(provjeriStringove(response.data,true)){
                    navigate("https://sportevent-alom.onrender.com/posts");
                }
                else{
                    showPopSameUser("login-popup")
                    popupSameUser();
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

    const popupSameUser = () => {
        showPopSameUser("login-popup");
        setTimeout(() => showPopSameUser("hide"), 3000)
    }

    
    return ( 
        <div className="App1"> 
            <div className="cover1234">
                    <h1>Registruj se</h1>
                    <input type="text" placeholder="username" onChange={(e)=>{
                        setUsername(e.target.value)
                    }}/>
                    <input type="password" placeholder="password" onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    <input type="text" placeholder="nickname" onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                    <p>Već imate profil. <a href="/login">Prijavi se</a></p>
                    <button className="login-btn" onClick={postData}>Registruj se</button>
                                        
                    <div className={popupStyle}>
                        <h2>Niste popunili sve polja.</h2>
                    </div>
                    <div className={popUpSameUser}>
                        <h2>Korisnik već postoji.</h2>
                    </div>

            </div>
       </div>
       
    );
}
 
export default SigninForm;