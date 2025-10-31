// src/components/Game.jsx
import React, { useState } from "react";
import WritePhase from "./WritePhase";
import GuessPhase from "./GuessPhase";
import ResultPhase from "./ResultPhase";

export default function Game() {
  const [phase, setPhase] = useState("write");
  const [round, setRound] = useState(1);
  const [playerID] = useState(() => Math.random().toString(36).slice(2, 7));
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);

  const handleNext = () => {
    setPhase("write");
    setRound((r) => r + 1);
    setResult(null);
  };

  return (
    <div className="game">
      <h1>Truth or Lie 🔥</h1>
      <p>Player ID: {playerID}</p>
      <p>Round: {round} | Score: {score}</p>

      {phase === "write" && (
        <WritePhase playerID={playerID} round={round} setPhase={setPhase} />
      )}
      {phase === "guess" && (
        <GuessPhase
          playerID={playerID}
          round={round}
          setPhase={setPhase}
          setScore={setScore}
          setResult={setResult}
        />
      )}
      {phase === "result" && (
        <ResultPhase result={result} onNext={handleNext} />
      )}
    </div>
  );
}
