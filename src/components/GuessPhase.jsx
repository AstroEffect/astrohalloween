import React, { useEffect, useState } from "react";

const API = "https://fairaddition-us.backendless.app/api/data/truthOrLie";


export default function GuessPhase({ playerID, round, setPhase, setScore, setResult }) {
  const [opponentData, setOpponentData] = useState(null);


  // Polling برای دریافت جمله بازیکن دیگر
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${API}?pageSize=2&sortBy=created%20desc`);
      const data = await res.json();
      // پیدا کردن جمله بازیکن دیگر که هنوز حدس زده نشده
      const other = data.find(d => d.round === round && d.playerID !== playerID && !d.guessed);
      if (other) setOpponentData(other);
    }, 1000);


    return () => clearInterval(interval);
  }, [playerID, round]);


  async function handleGuess(guessTruth) {
    const correct = guessTruth === opponentData.isTruth;
    setResult(correct ? "win" : "lose");
    if (correct) setScore(prev => prev + 1);


    await fetch(`${API}/${opponentData.objectId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessed: true, correct, guessedBy: playerID }),
    });


    setPhase("result");
  }


  if (!opponentData) return <p>در انتظار جمله بازیکن دیگر...</p>;


  return (
    <div className="guess__container">
      <h3 dir="rtl">حدس بزن جمله بازیکن دیگر واقعیه یا دروغ:</h3>
      <h3>{opponentData.sentence}</h3>
      <div className="guess__container__btns">
        <button onClick={() => handleGuess(true)}>واقعیت 😇</button>
        <button onClick={() => handleGuess(false)}>دروغ 😈</button>
      </div>
    </div>
  );
}