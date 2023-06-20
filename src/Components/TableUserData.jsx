import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useTheme } from "../Context/ThemeContext";

// const TableUserData = ({data})=>{

//     const {theme }= useTheme();
//     const cellStyle = {color:theme.textColor,textAlign:'center'};
//     return(
//         <div className="table">
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell style={cellStyle}>WPM</TableCell>
//                             <TableCell style={cellStyle}>Accuracy</TableCell>
//                             <TableCell style={cellStyle}>Characters</TableCell>
//                             <TableCell style={cellStyle}>Date</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {
//                             data.map((i)=>(
//                                 <TableRow>
//                                     <TableCell style={cellStyle}>{i.wpm}</TableCell>
//                                     <TableCell style={cellStyle}>{i.accuracy}</TableCell>
//                                     <TableCell style={cellStyle}>{i.characters}</TableCell>
//                                     <TableCell style={cellStyle}>{i.timestamp.toDate().toLocaleString()}</TableCell>
//                                 </TableRow>
//                             ))
//                         }
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     )
// }
// export default TableUserData;





const TableUserData = ({data}) => {

    const {theme} = useTheme();

    const styleCell = {
        color: theme.titleColor,
        textAlign: 'center'
    }


  return (
    <div className="table">
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={styleCell}>
                            WPM
                        </TableCell>
                        <TableCell style={styleCell}>
                            Accuracy
                        </TableCell>
                        <TableCell style={styleCell}>
                            Characters
                        </TableCell>
                        <TableCell style={styleCell}>
                            Date
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map(i => (
                            <TableRow>
                                <TableCell style={styleCell}>
                                    {i.wpm}
                                </TableCell>
                                <TableCell style={styleCell}>
                                    {i.accuracy}
                                </TableCell>
                                <TableCell style={styleCell}>
                                    {i.characters}
                                </TableCell>
                                <TableCell style={styleCell}>
                                    {i.timeStamp.toDate().toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default TableUserData;