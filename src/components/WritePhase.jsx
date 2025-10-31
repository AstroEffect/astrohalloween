// src/components/WritePhase.jsx
import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export default function WritePhase({ playerID, round, setPhase }) {
  const [sentence, setSentence] = useState("");
  const [isTruth, setIsTruth] = useState(true);

  const handleSubmit = async () => {
    if (!sentence.trim()) return;

    await push(ref(db, "truthOrLie"), {
      playerID,
      round,
      sentence,
      isTruth,
      guessed: false,
    });

    setPhase("guess");
  };

  return (
    <div className="phase write-phase">
      <textarea
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        placeholder="جمله حقیقت یا دروغت رو بنویس"
      />
      <div className="options">
        <label>
          <input
            type="radio"
            checked={isTruth}
            onChange={() => setIsTruth(true)}
          />
          واقعیت 😇
        </label>
        <label>
          <input
            type="radio"
            checked={!isTruth}
            onChange={() => setIsTruth(false)}
          />
          دروغ 😈
        </label>
      </div>
      <button onClick={handleSubmit}>ارسال</button>
    </div>
  );
}
