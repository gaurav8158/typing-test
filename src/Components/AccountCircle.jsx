import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import LoginForm from "./Forms/LoginForm";
import SignupForm from "./Forms/SignupForm";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import {signInWithPopup,signInWithRedirect, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import { auth } from "../firebaseConfig";
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

const AccountCircle = ()=>{
    const [open, setOpen] = useState(false);
    const[value,setValue]=useState(0);
    const{theme} = useTheme();

    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    console.log(user);
    const handleModalOpen = ()=>{
            // navigate to the user page
        (user) ?  navigate('/user') :  setOpen(true);
    }
    const handleModalClose = ()=>{
        setOpen(false);
    }
    const handleValueChange = (e,v)=>{
        setValue(v);
    }
    const Logout=()=>{
        auth.signOut().then((res)=>{
            toast.success('Successfully Logout', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                }); 
        }).catch((err)=>{
            toast.error('Not able to Logout', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    }
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = ()=>{
signInWithPopup(auth, googleProvider).then((res)=>{
    toast.success('Logged in successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        handleModalClose();
}).catch((err)=>{
    toast.error(errorMapping[err.code] || 'Not able to use google authentication', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
})
    }
return(
    <div>
       < AccountCircleIcon onClick={handleModalOpen}/>
       {user && <LogoutIcon onClick={Logout}/>}
       <Modal
       open={open}
       onClose={handleModalClose}
       style={{
        display:"flex",
        alignItems:'center',
        justifyContent:'center',
        backdropFilter: 'blur(2px)'
       }}
       >
        <div className="box" style={{width:'400px',textAlign:'center'}}>
            <AppBar position="static" style={{background:"transparent"}}>
                <Tabs variant="fullWidth"
                value={value} onChange={handleValueChange}>
                    <Tab label='login' style={{color:theme.textColor}}></Tab>
                    <Tab label='signup' style={{color:theme.textColor}}></Tab>
                </Tabs>
            </AppBar>
            {value === 0 && <LoginForm handleModalClose={handleModalClose}/>}
            {value === 1 && <SignupForm handleModalClose={handleModalClose}/>}
        
        <Box>
            <span>OR</span>
            <GoogleButton
            style={{width:'100%',marginTop:'12px'}}
            onClick={handleGoogleSignIn}
            />
        </Box>
        </div>
       </Modal>
        </div>
)
}

export default AccountCircle;