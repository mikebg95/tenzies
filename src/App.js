import Game from "./components/Game";
import React, { useState, useEffect } from 'react'

const App = () => {
  const [rolls, setRolls] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [started, setStarted] = useState(false)
  const [intervalId, setIntervalId] = useState(null)

  function start() {
    const id = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1)
    }, 1000)
    setIntervalId(id)

    setStarted(true)
  }

  useEffect(() => {
    if (intervalId) {
      return () => clearInterval(intervalId)
    }
  }, [intervalId])

  return (
    <div className="App">
        <div className="rolls">Rolls: {rolls}</div>
        <div className="time">Time: {seconds}</div>
        <div className="game-container">
          <h1>Tenzies</h1>
          <p className="info">Roll until all dice are the same. Click each die to freeze at its current value between rolls.</p>
          {!started && <button className="start-button" onClick={start}>START</button>}
          {started && 
            <Game 
              setRolls={setRolls} 
              setSeconds={setSeconds} 
              intervalId={intervalId}
            />
          }
        </div>
    </div>
  );
}

export default App;
