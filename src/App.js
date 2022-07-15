import "./App.css";
import { useState, useEffect, useRef } from "react";

let interval = null;

function App() {
  const [duration, setDuration] = useState(0);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  const [bestScore, setBestScore] = useState("0");
  const [alphabet, setAlphabet] = useState("");
  const [count, SetCount] = useState(0);

  const handleStart = () => {
    setStarted(true);
    setEnded(false);
    makeCharacter();
    setTimer();
  };

  const handleEnd = () => {
    setEnded(true);
    setStarted(false);

    if (ended) localStorage.setItem("duration", duration);
    const storedScore = localStorage.getItem("duration");
    if (storedScore > duration) {
      setBestScore(duration);
    }

    clearInterval(interval);
    SetCount(0);
    setDuration(0);
  };

  const setTimer = () => {
    interval = setInterval(() => {
      setDuration((prev) => prev + 1);

      if (count >= 19) {
        setEnded(true);
        handleEnd();
      }
    }, 1000);
  };

  const makeCharacter = () => {
    let text = "";
    let possible =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    text = possible.charAt(Math.floor(Math.random() * possible.length));
    setAlphabet(text);
    SetCount(count + 1);
    console.log(count);
  };

  const handleKeyDown = (e) => {
    e.preventDefault();

    const { key } = e;
    const characterText = alphabet;

    if (key == characterText) {
      makeCharacter();
    }

    if (count >= 19) {
      handleEnd();
    }
  };

  return (
    <div className="App" onKeyDown={handleKeyDown} tabIndex={1}>
      <div className="container">
        <div className="header">
          <h2>Type The Alphabet</h2>
          <p>
            Typing Game to see how fast you type.Timer initiates when you start.
            🙂
          </p>
        </div>
        <div className="body">
          {count >= 19 ? <h1>"SUCCESS!"</h1> : <h1>{alphabet}</h1>}
        </div>

        <div className="footer">
          {started ? "" : <button onClick={handleStart}>Start</button>}
          {started ? <h3>{duration}</h3> : ""}
          <h4>My best score is : {bestScore}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
