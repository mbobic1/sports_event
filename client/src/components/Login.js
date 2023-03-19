import React, { useState, useEffect } from "react";
import "./Login.css"
import Axios from 'axios'


const LoginForm = () => {
    
    function provjeriStringove(x1,x2){
        return x1===x2;
    }  

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [lista, setLista] = useState([]);
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
    
    useEffect( () => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setLista(response.data);
        })
    }, []);
    /*
    const provjeriImaLiKorisnika = () =>{
        lista.map((val) => {
            if(provjeriStringove(val.username,username)===true && provjeriStringove(val.password,password)===true){
                loginUser();
                window.location.assign("http://localhost:3000/afterLogin");
            }
            else if(provjeriStringove(val.username,username)===true && provjeriStringove(val.password,password)===false){
                showPopu("login-popup")
                console.log("ovdje ispisuje2")
                popup();
            }
            else if(provjeriStringove(val.username,username)===false && provjeriStringove(val.password,password)===true){
                showPopu("login-popup")
                console.log("ovdje ispisuje4")
                popup();
            }
            else if(!username || !password){
                setVrijednsotUnosa("login-unos")
                console.log("ovdje ispisuje3")
                vrijednostUnosaPopup();
            }
            else{
                showPopu("login-popup")
                console.log("ovdje ispisuje5")
                popup();
            }
        });
    }
    */
    const pozovi = () => {
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
    ajax.open("POST", "http://localhost:3001/api/login", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({username: username}));
    window.location.assign("http://localhost:3000/posts");
   }

    return ( 
        <div className="App1"> 
            <div className="cover">
                    <h1>Logiraj se</h1>
                    <input type="text" placeholder="username" onChange={(e)=>{
                        setUsername(e.target.value)
                    }}/>
                    <input type="password" placeholder="password" onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    <p>Nisi registrovan.<a href="/">  Registruj se</a></p>
                    <button className="login-btn" onClick={pozovi}> Logiraj se</button>
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