import React, { useState } from "react";
import SelectPlayer from "./SelectPlayer";
import PlayerInput from "./PlayerInput";
import GuessPhase from "./GuessPhase";
import ResultScreen from "./ResultScreen";


export default function Game() {
  const [phase, setPhase] = useState("selectPlayer"); // selectPlayer | input | guess | result
  const [playerID, setPlayerID] = useState("");
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);


  function handleNextRound() {
    setRound(prev => prev + 1);
    setResult(null);
    setPhase("input");
  }


  if (phase === "selectPlayer") {
    return <SelectPlayer onSelect={(id) => { setPlayerID(id); setPhase("input"); }} />;
  }


  return (
    <div className="game__container">
      <h1>🎃 TRUTH OR <span style={{ fontFamily: "Creepster", color: '#63C328' }}>Scare</span> 👻</h1>
      <p>راند: {round} | امتیاز: {score}</p>


      {phase === "input" && <PlayerInput playerID={playerID} round={round} setPhase={setPhase} />}
      {phase === "guess" && <GuessPhase playerID={playerID} round={round} setPhase={setPhase} setScore={setScore} setResult={setResult} />}
      {phase === "result" && <ResultScreen result={result} score={score} round={round} onNext={handleNextRound} />}
    </div>
  );
}