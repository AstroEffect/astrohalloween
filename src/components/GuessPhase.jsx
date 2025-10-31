// src/components/GuessPhase.jsx
import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../firebase";

export default function GuessPhase({ playerID, round, setPhase, setScore, setResult }) {
  const [opponentData, setOpponentData] = useState(null);

  useEffect(() => {
    const dataRef = ref(db, "truthOrLie");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const list = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      const opponentSentence = list.find(
        (d) => d.round === round && d.playerID !== playerID && !d.guessed
      );

      setOpponentData(opponentSentence || null);
    });

    return () => unsubscribe();
  }, [playerID, round]);

  const handleGuess = async (guessTruth) => {
    if (!opponentData) return;
    const correct = guessTruth === opponentData.isTruth;

    setResult(correct ? "win" : "lose");
    if (correct) setScore((prev) => prev + 1);

    await update(ref(db, `truthOrLie/${opponentData.id}`), {
      guessed: true,
      correct,
      guessedBy: playerID,
    });

    setPhase("result");
  };

  if (!opponentData) return <p>در انتظار جمله بازیکن دیگر...</p>;

  return (
    <div className="phase guess-phase">
      <h2 dir="rtl">حدس بزن جمله‌ی زیر دروغه یا واقعیت:</h2>
      <p className="sentence">{opponentData.sentence}</p>
      <div className="buttons">
        <button onClick={() => handleGuess(true)}>😇 واقعیت</button>
        <button onClick={() => handleGuess(false)}>😈 دروغ</button>
      </div>
    </div>
  );
}
