import React, { useState } from "react";
import "./css/Login.css"
import Axios from 'axios'


const LoginForm = () => {
    
    function provjeriStringove(x1,x2){
        if(x1 === x2){
            return true;
        }
        return false;;
    }  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [popupStyle, showPopu] = useState("hide")
    const [vrijednostUnosa, setVrijednsotUnosa] = useState("hide1")
    
    const popup = () => {
        showPopu("login-popup")
        setTimeout(() => showPopu("hide"), 3020)
    }
    
    const vrijednostUnosaPopup = () => {
        setVrijednsotUnosa("login-unos")
        setTimeout(() => setVrijednsotUnosa("hide1"), 3020)
    }

    const postData = async () => {
        try {
            if(!username || !password){
                setVrijednsotUnosa("login-unos")
                console.log("ovdje ispisuje3")
                vrijednostUnosaPopup();
            }
            else{
                const response = await Axios.post('http://localhost:3001/api/login', {
                    username: username,
                    password: password,
                }, {
                    withCredentials: true // include credentials in the request
                });
                if(provjeriStringove(response.data,true)){
                    window.location.assign("http://localhost:3000/posts");
                }
                else{
                    showPopu("login-popup")
                    popup();
                }
            }
        } catch (error) {
          console.error(error);
        }
    }
    

    return ( 
        <div className="App1"> 
            <div className="cover">
                    <h1>Prijavi se</h1>
                    <input type="text" placeholder="username" onChange={(e)=>{
                        setUsername(e.target.value)
                    }}/>
                    <input type="password" placeholder="password" onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    <p>Nisi registrovan.<a href="/">  Registruj se</a></p>
                    <button className="login-btn" onClick={postData}> Logiraj se</button>
                    <div className={vrijednostUnosa}>
                        <h2>Niste popunili sve polja.</h2>
                    </div>
                    <div className={popupStyle}>
                        <h2>Pogrešni podatci</h2> 
                        <p>Username ili lozinka nije tačna!</p>
                    </div>                    
            </div>
       </div>
       
    );
}
 
export default LoginForm;