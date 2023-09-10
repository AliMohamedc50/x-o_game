import React, { useRef, useState } from 'react'
import "./Xo.css"
import circle_icone from "../Assets/circle.png";
import cross_icone from "../Assets/cross.png";
import winSound from "../Assets/y2mate.com - Win sound effect no copyright.mp3"



let data = ["","","","","","","","",""];

const Xo = () => {
    let [count, setCount] = useState(0)
    let [lock, setLock] = useState(false)
    let titlerRef = useRef(null)
    let [x, setX] = useState(0)
    let [o, seto] = useState(0)
    let [xo, setxo] = useState("x")
    const audioRef = useRef(null);

    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const toggle = (e, num) => {
        if (xo === "x") {
            setxo("o")
        }else {
            setxo("x")
        }

        if (lock) {
            return 0;
        }
        if (count%2 === 0) {
            e.target.innerHTML = `<img src="${cross_icone}">`;
            data[num] = "x" ;
            setCount(++count);
        }else {
            e.target.innerHTML = `<img src="${circle_icone}">`;
            data[num] = "o";
            setCount(++count);
        }
        checkWin();
    }

    const checkWin = () => {
        if ((data[0] === data[1] && data[1] === data[2] && data[2] !== "")) {
            won(data[2]);
        }else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[5]);
        }else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
            won(data[8]);
        }else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            won(data[6]);
        }else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            won(data[7]);
        }else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            won(data[8]);
        }else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            won(data[8]);
        }else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[2]);
        }else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            won(data[6]);
        }
    }
    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titlerRef.current.innerHTML = `congratulations: <img src="${cross_icone}" > Wins`;
            playWinSound();
            setX(++x);
            time();
            trans();
        }else {
            titlerRef.current.innerHTML = `congratulations: <img src="${circle_icone}" > Wins`;
            playWinSound();
            seto(++o);
            time();
            trans();
        }
    };

    
    let tt = document.querySelector(".time");
    const trans = () => {
        tt.style.display = "block";
        tt.style.width = "100%";
        resetWidth();
    }

    const resetWidth = () => {
        setTimeout(() => {
            tt.style.width = "0";
        }, 2000);
    }

    let time = () => {
        setTimeout(() => {
            reset();
        }, 2500);
    }

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        titlerRef.current.innerHTML = `X O Game in <span>React</span>`;
        box_array.map((e) => {
            e.current.innerHTML = "";
        });
    } 

const playWinSound = () => {
    if (audioRef.current) {
        audioRef.current.play();
    }
};

    return (
        <div className="container">
  <div>
    <audio ref={audioRef} src={winSound} />
  </div>
            <h1 className="title" ref={titlerRef}>
            X O Game in <span>React</span>
            </h1>
            <h6>{ xo === "x" ? <img src={cross_icone} /> : <img src={circle_icone} />  } Will PLay</h6>
            <div className="border">
                <div className="time"></div>
            <div className="row1">
                <div
                className="boxes"
                ref={box1}
                onClick={(e) => {
                    toggle(e, 0);
                }}
                ></div>
                <div
                className="boxes"
                ref={box2}
                onClick={(e) => {
                    toggle(e, 1);
                }}
                ></div>
                <div
                className="boxes"
                ref={box3}
                onClick={(e) => {
                    toggle(e, 2);
                }}
                ></div>
            </div>
            <div className="row2">
                <div
                className="boxes"
                ref={box4}
                onClick={(e) => {
                    toggle(e, 3);
                }}
                ></div>
                <div
                className="boxes"
                ref={box5}
                onClick={(e) => {
                    toggle(e, 4);
                }}
                ></div>
                <div
                className="boxes"
                ref={box6}
                onClick={(e) => {
                    toggle(e, 5);
                }}
                ></div>
            </div>
            <div className="row3">
                <div
                className="boxes"
                ref={box7}
                onClick={(e) => {
                    toggle(e, 6);
                }}
                ></div>
                <div
                className="boxes"
                ref={box8}
                onClick={(e) => {
                    toggle(e, 7);
                }}
                ></div>
                <div
                className="boxes"
                ref={box9}
                onClick={(e) => {
                    toggle(e, 8);
                }}
                ></div>
            </div>
            </div>
            <button
            className="reset"
            onClick={() => {
                reset();
            }}
            >
            Reset
            <div className='x'>{x} : <img src={cross_icone}  /></div>
            <div className='o'> <img src={circle_icone}  /> : {o}</div>
            </button>
        </div>
    );
}
export default Xo;
