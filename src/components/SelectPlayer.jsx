import React, { useState } from "react";

import "../assets/styles/SelectPlayer.css";

export default function SelectPlayer({ onSelect }) {
    const [playerID, setPlayerID] = useState("");


    function handleSelect() {
        if (!playerID.trim()) return alert("یه شناسه وارد کن 😄");
        onSelect(playerID);
    }


    return (
        <div className="select__player__container">
            <h2>:نام خودت رو وارد کن</h2>
            <input className="player__input" placeholder="اسم بازیکن" value={playerID} onChange={(e) => setPlayerID(e.target.value)} />
            <button onClick={handleSelect}>تایید ✅</button>
        </div>
    );
}