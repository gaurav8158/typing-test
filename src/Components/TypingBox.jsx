import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

const randomwords = require('random-words');
const TypingBox = () => {
    const inputRef = useRef(null);
    const { testTime } = useTestMode();
    const [CountDown, setCountDown] = useState(testTime);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const[correctChars,setCorrectChars] = useState(0);
    const[incorrectChars,setinCorrectChars] = useState(0);
    const[missedChars,setMissedChars] = useState(0);
    const[extraChars,setExtraChars] = useState(0);
    const[correctWord,setCorrectWord] = useState(0);
    const [wordsArray, setWordsArray] = useState(() => {
        return randomwords(50);
    });

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const[graphData,setGraphData] = useState([]);

    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i => createRef(null));
    }, [wordsArray]);

    const startTimer = () => {

        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);
        function timer() {
            setCountDown((updateValue) => {
                setCorrectChars((correctChars)=>{
                    setGraphData((graphData)=>{
                        return [...graphData,[testTime-updateValue+1,
                    (correctChars/5)/((testTime-updateValue+1)/60)
                        ]];
                    })
                    return correctChars;
                })
                if (updateValue === 1) {
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }
                return (updateValue - 1);
            });
        }
    }

    const resetTest = () => {
        clearInterval(intervalId);
        setTestStart(false);
        setTestEnd(false);
        setCountDown(testTime);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setWordsArray(randomwords(50));
        focusInput();
        resetSpanRefClassname();
    }
   
    const resetSpanRefClassname = () => {
          wordsSpanRef.map(i => {
            Array.from(i.current.childNodes).map((j) => {
                j.className = '';
            })
        });
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }
    const handleUserInput = (e) => {
        if (!testStart) {
            startTimer();
            setTestStart(true);
        }
        let allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
        if (e.keyCode === 32) {
            //Logic for space

            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');

            if(correctCharsInWord.length === allCurrChars.length){
                setCorrectWord(correctWord+1);
            }
            if (allCurrChars.length <= currCharIndex) {
                // remove cursor from last place in a word
                allCurrChars[currCharIndex - 1].classList.remove('current-right');
            }
            else {
                // remove cursor from in between of word
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
                allCurrChars[currCharIndex].classList.remove('current');
            }
            wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';
            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0);
            return;
        }
        if (e.keyCode === 8) {
            if (currCharIndex !== 0) {
                if (allCurrChars.length === currCharIndex) {
                    if (allCurrChars[currCharIndex - 1].className.includes('extra')) {
                        allCurrChars[currCharIndex - 1].remove();
                        allCurrChars[currCharIndex - 2].className += ' current-right';
                    }
                    else {
                        allCurrChars[currCharIndex - 1].className = 'current';
                    }
                    setCurrCharIndex(currCharIndex - 1);
                    return;
                }
                allCurrChars[currCharIndex].className = '';
                allCurrChars[currCharIndex - 1].className = 'current';
                setCurrCharIndex(currCharIndex - 1);
            }

            return;
        }
        if (currCharIndex === allCurrChars.length) {
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;

            newSpan.className = 'incorrect extra current-right';
            allCurrChars[currCharIndex - 1].classList.remove('current-right');
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex + 1);
            setExtraChars(extraChars+1);
            return;
        }

        if (e.key === allCurrChars[currCharIndex].innerText) {
            allCurrChars[currCharIndex].className = 'correct'
            setCorrectChars(correctChars+1);
        }
        else {
            allCurrChars[currCharIndex].className = 'incorrect'
          setinCorrectChars(incorrectChars+1);
        }
        if (currCharIndex + 1 === allCurrChars.length) {
            allCurrChars[currCharIndex].className += ' current-right';
        }
        else allCurrChars[currCharIndex + 1].className = 'current';
        setCurrCharIndex(currCharIndex + 1);
    }
    const calculateWPM = ()=>{
        console.log(correctChars,testTime);
        return Math.round(correctChars/5/testTime*60);
    }
    const calculateAcc = ()=>{
        return Math.round(correctWord*100/currWordIndex);
    }
    const focusInput = () => {
        inputRef.current.focus();
    }
    useEffect(() => {
        resetTest();
    }, [testTime]);
    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = "current";
    }, []);
    return (
        <div>
            <UpperMenu CountDown={CountDown} />
            {(testEnd) 
            ?  <Stats
                    wpm={calculateWPM()}
                    accuracy={calculateAcc()}
                    correctChars={correctChars}
                    incorrectChars={incorrectChars}
                    missedChars={missedChars}
                    extraChars={extraChars}
                    graphData={graphData}
                />
            : <div className="type-box" onClick={focusInput}>
                    <div className="words">
                        {wordsArray.map((word, index) =>{
                            return (
                                <span className="word" key={`word${index}`} ref={wordsSpanRef[index]}>
                                {word.split('').map((char,index) => {
                                    return (
                                        <span key={`char${index}`}>{char}</span>
                                    )
                                })}
                            </span>
                            )
                        })}

                        
                    </div>
                </div>
            }
            <input
                type="text"
                className="hidden-input"
                ref={inputRef}
                onKeyDown={handleUserInput}
            />
        </div>

    )
}

export default TypingBox;