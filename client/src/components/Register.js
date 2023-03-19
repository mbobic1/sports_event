import React, { useState} from "react";
import "./Register.css"


const SigninForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [popupStyle, showPopu] = useState("hide")


    const submitData = () => {
        if(!username || !password || !name){
            showPopu("login-popup")
            popup();
        }else{
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {
                if(ajax.readyState == 4 && ajax.status==200) {
                    //var jsoneRez = JSON.parse(ajax.responseText);
                    console.log("vratio",ajax.responseText)
                }else if (ajax.readyState == 4 && ajax.status == 400) {
                    //var jsonRez = JSON.parse(ajax.responseText);
                    console.log("ERROR ",ajax.responseText)
                }
            }
            ajax.withCredentials=true
            ajax.open("POST", "http://localhost:3001/api/insert", true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify({username: username, password: password, name: name}));
            window.location.assign("http://localhost:3000/posts");
        }    
    }

    const popup = () => {
        showPopu("login-popup")
        setTimeout(() => showPopu("hide"), 3000)
    }

    
    return ( 
        <div className="App1"> 
            <div className="cover">
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
                    <p>Već imate profil. <a href="/">Prijavi se</a></p>
                    <button className="login-btn" onClick={submitData}>Registruj se</button>
                                        
                    <div className={popupStyle}>
                        <h2>Niste popunili sve polja.</h2>
                    </div>

            </div>
       </div>
       
    );
}
 
export default SigninForm;