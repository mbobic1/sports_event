import React from 'react'
import { Link } from "react-router-dom";
import { useRef ,useState, useEffect } from 'react';
import { observer } from "mobx-react";
import  Axios  from 'axios';
import './css/TopBar.css'
//import ReactDOM from 'react-dom';


const TopBar = (props) => {

    console.log("konj" + props.moj);
    const [sessionUs, setSessionUs] = useState('');
    const userRef = useRef(false);
    const [user, setUSer] = useState(false);  

    console.log("sakdnsakfaskjfoasjf'as");
    useEffect( () => {
        console.log("USER2222 JE "+ user);

        Axios.get('http://localhost:3001/api/userSession1', {
        withCredentials: true
    })
        .then(response => {
            const data = response.data; // this line reads the data from the response object
            setSessionUs(data);
            console.log("DATA je" + sessionUs);
            if(sessionUs!== null){
                console.log("ULAZI AKO JE TAACNO")
                userRef.current = true;
                setUSer(true);
            }else{
                userRef.current = false;
            }
        console.log("USER11111 JE "+ user);


    })
        .catch(error => {
            console.log("Error se desio kod session user" + error);        
        });
    },[ ]);

    console.log("top bar je " + sessionUs);
    
    //setUser(userRef.current);
    console.log("USER JE "+ user);

    return(
        
        <div className="citav">
            <div className="top">
                <div className="topLeft">
                    <i className="topIcon fab fa-facebook-square"></i>
                    <i className="topIcon fab fa-instagram-square"></i>
                    <i className="topIcon fab fa-pinterest-square"></i>
                    <i className="topIcon fab fa-twitter-square"></i>
                </div>
                <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/about">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/contact">KONTAKT</Link>
                    </li>
                </ul>
                </div>
                <div className="topRight">          
                {user ? (
                    <div className="topList">
                        <img
                            className="topImg"
                            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                        />
                        <ul className="topList">
                            <li className="topListItem">                
                                <Link className="link" to="/createPost">KREIRAJ DOGAĐAJ</Link>            
                            </li>
                            <li className="topListItem">                
                                <Link className="link" to="/login">ODJAVI SE</Link>            
                            </li>
                            
                        </ul>                       
                    </div>                     
                ) : (            
                    <ul className="topList">
                        <li className="topListItem">                
                            <Link className="link" to="/login">PRIJAVI SE</Link>            
                        </li>
                        <li className="topListItem">            
                            <Link className="link" to="/register">REGISTRUJ SE</Link> 
                        </li>
                        </ul>
                )}
                    <i className="topSearchIcon fas fa-search"></i>
                </div>
        </div>
    </div>
    );

}
export default  observer(TopBar);