import Navigation from "../common/Navigation";
import React, {useState} from "react";

export default function ProfileView(props){
    const [user] = useState(props.user || '');
    return(
            <>
                <Navigation toggleable={0}/>
                <div className="profile-view">
                    Witaj { user.login || 'Niezalogowany' }!
                </div>
            </>
    );
}
