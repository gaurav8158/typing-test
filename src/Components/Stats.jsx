import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { toast } from "react-toastify";

const Stats = (
   { wpm,
    accuracy,
    correctChars,
    incorrectChars,
    missedChars,
    extraChars,
    graphData}
)=>{
    const timeset = new Set();
    const newGraph = graphData.filter(i=>{
        if(!timeset.has(i[0])){
            timeset.add(i[0])
            return i;
        }
    });
    const pushDataToDb = ()=>{
        if (isNaN(accuracy)){
            toast.error('invalid test', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return; 
        }
        const resultsRef = db.collection('Results');
        const {uid} = auth.currentUser;
        resultsRef.add({
        wpm: wpm,
        accuracy: accuracy,
        timestamp: new Date(),
        characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        userId: uid
        }).then ((res) =>{
        toast.success ('Data saved to db', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        }).catch((err) =>{
            toast.error ('Not able to save', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            });
        }

        useEffect (()=>{
            if(auth.currentUser) {
            pushDataToDb();
            }
            else{
            toast.warning ('login to save results', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            }
        },[]);
    return(
       <div className="stat-box">
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}</div>
            <div className="title">Characters</div>
            <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
        </div>
        <div className="right-stats">
<Graph 
graphData={newGraph}
/>
        </div>
       </div>
    )
} 


export default Stats;