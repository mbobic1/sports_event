import React from "react";
import './css/Home.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

//potreban symlink kako bi spojio public folder sa component folderom
const Background = () =>{
    const navigate = useNavigate();
    const [user, setUSer] = useState(false);

    useEffect( () => {
        Axios.get('http://localhost:3001/api/userSession1', {
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
    });

    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Povežite se sa prijateljima i drugim ljudima preko sport-event.</span>
                <span className="headerTitleLg">Sport-event</span>
                {user ? (
                    <button className="btn1" onClick={ () => {navigate('/posts')}}>NASTAVI DALJE</button>
                ) : (
                    <button className="btn1" onClick={ () => {navigate('/login')}}>NASTAVI DALJE</button>
                )}
            </div>
    </div>
    );
}

export default Background;