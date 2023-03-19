import React from "react";
import './Home.css'

//potreban symlink kako bi spojio public folder sa component folderom
const Background = () =>{

    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Povežite se sa prijateljima i drugim ljudima preko sport-event.</span>
                <span className="headerTitleLg">Sport-event</span>
            </div>
    </div>
    );
}

export default Background;