import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { CircularProgress } from "@mui/material";
import TableUserData from '../../Components/TableUserData'
import Graph from "../Graph";
import Userinfo from "../Userinfo";
const UserPage = () => {

    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const fetchUserData = () => {
        const resultsRef = db.collection('Results');
        console.log(resultsRef);
        const { uid } = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        console.log(uid,resultsRef);
        resultsRef
            .where("userId", "==", uid)
            .orderBy('timeStamp', 'desc')
            .get()
            .then((snapshot) => {
                console.log(snapshot);
                snapshot.docs.forEach((doc) => {
                    tempData.push({ ...doc.data() });
                    tempGraphData.push([
                        doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
                        doc.data().wpm,
                    ]);
                });
                setData(tempData);
                setGraphData(tempGraphData.reverse());
            });
    };
    useEffect(() => {
        if (!loading) {
            fetchUserData();
        }
        if (!loading && !user) {
            navigate('/');
        }
    }, [loading]);
    if (loading || dataLoading)
        return (
            <div className="center-of-screen">
                <CircularProgress size={300} />
            </div>
        )
        console.log(data);
    return (
        <div className="canvas">
            <Userinfo totalTestTaken={data.length} />
            <div className="graph-user-page">
                <Graph graphData={graphData} />
            </div>
            <TableUserData data={data} />
        </div>
    );
};

export default UserPage;