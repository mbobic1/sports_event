import React from "react";
import './Home.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

//potreban symlink kako bi spojio public folder sa component folderom
const Background = () =>{
    const navigate = useNavigate();
    const [user, setUSer] = useState(false);

    if(localStorage.getItem('username')){
        setUSer(true);
    }else{
        setUSer(false);
    }
 

    return (
        <div className="header">
            <div className="headerTitles">
               
            </div>
    </div>
    );
}

export default Background;