import React from 'react'
import { Link } from "react-router-dom";
import { useRef ,useState, useEffect } from 'react';
import { observer } from "mobx-react";
import  Axios  from 'axios';
import './css/TopBar.css'
import { useNavigate } from 'react-router-dom';



const TopBar = (props) => {
    const navigate = useNavigate();
    console.log("konj" + props.moj);
    const [sessionUs, setSessionUs] = useState('');
    const userRef = useRef(false);
    const [user, setUSer] = useState(false);  

    
    useEffect( () => {
        Axios.get('http://localhost:3001/api/userSession1', {
        withCredentials: true
    })
        .then(response => {
            console.log("DATA je" + response.data);
            if(response.data!== false){
                setUSer(true);
            }else{
                setUSer(false);
            }
    })
        .catch(error => {
            console.log("Error se desio kod session user" + error);        
        });
    });

  
    const handleLogout = async () => {
        try {
        // perform logout logic here
            try {
                const response = await Axios.post('http://localhost:3001/logout', {
            
                }, {
                withCredentials: true // include credentials in the request
                });
                console.log(response);
            } catch (error) {
                console.error(error);
            }    
        navigate('/');
        } catch (error) {
        console.error(error);
        }
    }

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
                {user ? (
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
                    <li className="topListItem">
                        <Link className="link" to="/posts">DOGAĐAJI</Link>
                    </li>
                </ul>
                ) :(
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
                )}
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
                                <Link className="link" onClick={handleLogout} to="/login">ODJAVI SE</Link>            
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