import React, { useState } from "react";

import "../assets/styles/PlayerInput.css";

const API = "https://fairaddition-us.backendless.app/api/data/truthOrLie";


export default function PlayerInput({ playerID, round, setPhase }) {
  const [sentence, setSentence] = useState("");
  const [isTruth, setIsTruth] = useState(false);


  async function handleSubmit() {
    if (!sentence.trim()) return alert("یه جمله بنویس 😄");


    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence, isTruth, playerID, round, guessed: false }),
    });


    setSentence("");
    setIsTruth(false);
    setPhase("guess");
  }


  return (
    <div className="player__input__container">
      <input
        className="player__input"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        placeholder="حقیقت یا دروغ این راند رو بنویس"
      />

      <div className="checkbox-wrapper-4">
        <input className="inp-cbx" id="morning" type="checkbox" />
        <label className="cbx" htmlFor="morning">
          <span>
            <svg width="12px" height="10px">
              <use xlinkHref="#check-4"></use>
            </svg>
          </span>
          <span>!این متن دروغه</span>
        </label>
        <svg className="inline-svg">
          <symbol id="check-4" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </symbol>
        </svg>
      </div>

      <button onClick={handleSubmit}>ارسال 🚀</button>
    </div>
  );
}