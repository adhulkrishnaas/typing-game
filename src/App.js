import "./App.css";
import { useEffect, useState } from "react";
import party from "party-js";

let interval = null;

function App() {
  const [duration, setDuration] = useState(0);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [bestScore, setBestScore] = useState("0");
  const [alphabet, setAlphabet] = useState("");
  const [count, SetCount] = useState(1);

  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

  const handleStart = () => {
    setStarted(true);
    setEnded(false);
    makeCharacter();
    setTimer();
    setTime(0);
    setStart(true);
  };

  const handleEnd = () => {
    setEnded(true);
    setStarted(false);
    setStart(false);

    localStorage.setItem("duration", time.toString());
    const storedScore = parseInt(localStorage.getItem("duration"));
    if (storedScore > duration) {
      setBestScore(duration);
    } else {
      setBestScore(duration);
    }
    clearInterval(interval);
    SetCount(1);
    setDuration(0);
    setAlphabet("SUCCESS!");
  };

  const setTimer = () => {
    interval = setInterval(() => {
      setDuration((prev) => prev + 1);

      if (count > 20) {
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
    if (count < 20) {
      setAlphabet(text);
    }

    SetCount(count + 1);
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    const { key } = e;
    const characterText = alphabet;
    if (key == characterText) {
      makeCharacter();
    }

    if (count > 20) {
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
          <h1>{alphabet}</h1>
        </div>

        <div className="footer">
          {started ? "" : <button onClick={handleStart}>Start</button>}

          {started ? (
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          ) : null}
          {started ? (
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          ) : null}
          {started ? (
            <span>{("0" + ((time / 10) % 60)).slice(-2) + " s"}</span>
          ) : null}

          <h4>My best score is : {bestScore}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
