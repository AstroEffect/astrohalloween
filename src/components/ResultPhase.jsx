// src/components/ResultPhase.jsx
import React, { useEffect } from "react";
import lose1 from "../assets/lose1.mp4";
import lose2 from "../assets/lose2.mp4";
import lose3 from "../assets/lose3.mp4";
import lose4 from "../assets/lose4.mp4";
import lose5 from "../assets/lose5.mp4";
import lose6 from "../assets/lose6.mp4";
import lose7 from "../assets/lose7.mp4";

export default function ResultPhase({ result, onNext }) {
  const loseVideos = [lose1, lose2, lose3, lose4, lose5, lose6, lose7];
  const randomLose = loseVideos[Math.floor(Math.random() * loseVideos.length)];

  useEffect(() => {
    if (result === "lose") {
      if ("vibrate" in navigator) {
        navigator.vibrate([80, 40, 120, 60, 200]);
      }
    }
  }, [result]);

  return (
    <div className="phase result-phase">
      {result === "win" ? (
        <>
          <h2>درست گفتی! 👏</h2>
          <button onClick={onNext}>شروع راند جدید</button>
        </>
      ) : (
        <>
          <h2>باختی 😢</h2>
          <video
            src={randomLose}
            autoPlay
            onEnded={onNext}
          />
        </>
      )}
    </div>
  );
}
