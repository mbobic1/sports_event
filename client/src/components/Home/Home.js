import React from "react";
import './Home.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

//potreban symlink kako bi spojio public folder sa component folderom
const Background = () =>{
    const navigate = useNavigate();
    const [user, setUSer] = useState(false);

    useEffect( () => {
        Axios.get('https://sportevent-alom.onrender.com/api/userSession1', {
        withCredentials: true
    })
        .then(response => {
            if(response.data!== false){
                setUSer(true);
            }else{
                setUSer(false);
            }
    })
        .catch(error => {
            console.log("Error se desio kod session user" + error);        
        });
    }, []);

    return (
        <div className="header">
            <div className="headerTitles">
               
            </div>
    </div>
    );
}

export default Background;