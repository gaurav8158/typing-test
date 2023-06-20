import React from "react"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions";
import { useTheme } from "../Context/ThemeContext";
import { Link } from '@mui/material';

const Footer = () => {
    const { theme,setTheme, } = useTheme();
    const handleChange = (e) => {
        setTheme(e.value);
        localStorage.setItem("theme",JSON.stringify(e.value));
    }
    return (
        <div className="footer">
            <div className="links">
              <Link className='space' href="https://github.com/gaurav8158" underline="none" color="inherit">
             <div className='icons'>
             <GitHubIcon/>
              <span>Github</span>
             </div>
              </Link>
              <Link className='space' href="https://www.linkedin.com/in/gauravsonis/" underline="none" color="inherit">
             <div className='icons'>
             <LinkedInIcon/>
              <span>Linkdin</span>
             </div> 
              </Link>
          </div>
            <div className="themeButton" >
                <Select 
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement="top"
                defaultValue= {{label:theme.label, value:theme}}
                styles={{
                    control: (styles) => ({...styles,backgroundColor:theme.backgroundColor}),
                    menu: (styles) => ({...styles,backgroundColor:theme.backgroundColor}),
                   option : (styles,{isFocused})=>{
  return {
    ...styles,backgroundColor : (!isFocused) ? theme.background : theme.textColor,
    color : (!isFocused) ? theme.textColor : theme.background ,
    cursor: "pointer"
  }
                   }
                }}
                />
            </div>
        </div>
    )
  }
  
  export default Footer;












// const Footer = () => {
//     const { theme, setTheme, } = useTheme();
//     const handleChange = (e) => {
//         setTheme(e.value);
//         localStorage.setItem("theme", JSON.stringify(e.value));
//     }
//     return (
//         <div className="footer">
//             <div className="links">Links</div>
//             <div className="themeButton" >
//                 <Select
//                     onChange={handleChange}
//                     options={themeOptions}
//                     menuPlacement="top"
//                     defaultValue={{ label: theme.label, value: theme }}
//                     styles={{
//                         control: (styles) => ({ ...styles, backgroundColor: theme.backgroundColor }),
//                         menu: (styles) => ({ ...styles, backgroundColor: theme.backgroundColor }),
//                         option: (styles, { isFocused }) => {
//                             return {
//                                 ...styles, backgroundColor: (!isFocused) ? theme.background : theme.textColor,
//                                 color: (!isFocused) ? theme.textColor : theme.background,
//                                 cursor: "pointer"
//                             }
//                         }
//                     }}
//                 />
//             </div>
//         </div>
//     )
// }

// export default Footer;