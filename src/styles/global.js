import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`

*{
    box-sizing:border-box;
}
body {
    margin: 0;
    padding: 0;
    background: ${({theme})=>theme.background};
    color:${({theme})=>theme.textColor};
    transition:all 0.25s linear;
    }

    .canvas{
        display:grid;
        height:100vh;
        grid-auto-flow:row;
       grid-template-row: auto 1fr auto;
       gap:0.5rem;
       padding:2rem;
       width:100vw;
       align-item:center;
       text-align:center; 
    }
.type-box{
    display:block;
    max-width:1000px;
    height:140px;
margin-left:auto;
margin-right:auto;
}
.words{
    font-size:32px;
    display:flex;
    flex-wrap:wrap;
    color:${({theme})=>theme.typeBoxText};
}
.word{
    margin:5px;
    padding-right:5px;
}
.hidden-input{
    opacity:0;
}
.current{
    border-left:1px solid;
    animation : blinking 2s infinite;

    @keyframes blinking{
        0%{ border-left-color:${({theme})=>theme.textColor};}
        25%{border-left-color:${({theme})=>theme.background};}
        50%{border-left-color:${({theme})=>theme.textColor};}
        75%{border-left-color:${({theme})=>theme.background};}
        100%{border-left-color:${({theme})=>theme.textColor};}
    }
}
.current-right{
    border-right:1px solid;
    animation : blinkingRight 2s infinite;

    @keyframes blinkingRight{
        0%{ border-right-color:${({theme})=>theme.textColor};}
        25%{border-right-color:${({theme})=>theme.background};}
        50%{border-right-color:${({theme})=>theme.textColor};}
        75%{border-right-color:${({theme})=>theme.background};}
        100%{border-right-color:${({theme})=>theme.textColor};}
    }
}
.correct{
    color:${({theme})=>theme.textColor};
}
.incorrect{
    color:red;
}
.Upper-menu{
    display:flex;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    font-size:1.35rem;
    justify-content:space-between;
    padding:0.5rem;
}
.modes{
    display:flex;
    gap:0.4rem;
}
.time-mode:hover{
    color:green;
    cursor:pointer;
}
.footer{
    width:1000px;
    display:flex;
    justify-content:space-between;
    margin-left:auto;
    margin-right:auto;
}

.stat-box{
    display:flex;
    width:1000px;
    height:auto;
    margin-left:auto;
    margin-right:auto;
}
.left-stats{
    width:30%;
    padding:30px;
}
.right-stats{
    width:70%;
}
.title{
    font-size:20px;
    color:${({theme})=>theme.typeBoxText};
}
.subtitle{
    font-size:30px;
}
.header{
    width:1000px;
    display:flex;
    justify-content:space-between;
    margin-left:auto;
    margin-right:auto;
    font-size:50px;
}
.user-info{
    width: 1000px;
    margin: auto;
    display: flex;
    height:15rem;
    background: ${({ theme }) => theme.titleColor};
    color: ${({ theme }) => theme.background};
    border-radius: 20px;
    padding:1rem;
    justify-content:center;
    align-text: center;
}
.user{
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5rem;
    padding:1rem;
    border-right: 2px solid;
}

.user-profile{
    width: 1000px;
    margin: auto;
    display: flex;
    height: 15 rem;
    background: ${({theme})=>(theme.typeBoxText)};
    border-radius: 20px;
    padding: 1rem;
    justify-content: center;
    align-text: center;
    }
    .user{
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5 rem;
    padding: 1rem;
    border-right:2px solid;
    }
    .info{
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
    }
.picture{
    width:40%;
}
.total-tests{
    width:50%;
    font-size:3rem;
    display:flex;
    align-item:center;
    justify-content:center;
}
.table, .graph-user-page{
    margin: auto;
    width: 1000px;
    }
    .center-of-screen{
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    }
    .total-tests{
        width: 50%;
        font-size: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;  
    }

    .links{
        display:flex;
        gap:10px;
    }
    .icons{
        display:flex;
        gap:5px;
        justify-content: center;
        align-items:center;
    }
    `;
    export default GlobalStyle;