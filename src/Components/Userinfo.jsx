import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const Userinfo = ({totalTestTaken}) => {
    const [user ]= useAuthState(auth);
    console.log(user);
    return (
        <div className="user-profile">
            <div className="user">
                <div className="picture">
                    <AccountCircleIcon style={{display: 'block', transform: 'scale(6)', margin: 'auto', marginTop: '3.5rem'}}/>
                </div>
                <div className="info">
                    <div className="email">
                        {user.email}
                    </div>
                    <div className="joined-at">
                        {user.metadata.creationTime}          
                    </div>
                </div>
            </div>
            <div className="total-tests">
<span>{totalTestTaken}</span>
            </div>
        </div>
    )
}

export default Userinfo;