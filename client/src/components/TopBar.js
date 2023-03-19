import React from 'react'
import { Link } from "react-router-dom";
import './TopBar.css'


const TopBar = () => {
    const user = false;
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

export default TopBar;