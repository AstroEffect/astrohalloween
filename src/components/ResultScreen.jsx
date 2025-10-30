import React, { useEffect, useRef, useState } from "react";
import lose1 from "../assets/lose1.mp4";
import lose2 from "../assets/lose2.mp4";
import lose3 from "../assets/lose3.mp4";
import lose4 from "../assets/lose4.mp4";
import lose5 from "../assets/lose5.mp4";
import lose6 from "../assets/lose6.mp4";
import lose7 from "../assets/lose7.mp4";

export default function ResultScreen({ result, onNext }) {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    if (result === "lose") {
      // آرایه ویدیوها
      const videos = [lose1, lose2, lose3, lose4, lose5, lose6, lose7];

      // انتخاب تصادفی
      const randomIndex = Math.floor(Math.random() * videos.length);
      setVideoSrc(videos[randomIndex]);

      // وقتی ویدیو تموم شد → رفتن به راند بعدی
      const video = videoRef.current;
      if (video) {
        const handleEnd = () => {
          onNext();
        };
        video.addEventListener("ended", handleEnd);

        return () => {
          video.removeEventListener("ended", handleEnd);
        };
      }
    }
  }, [result, onNext]);

  return (
    <div>
      {result === "win" ? (
        <h2>درست گفتی! 👏</h2>
      ) : (
        <div>
          <h2>!باختی</h2>
          <div className="video__overlay">
            {videoSrc && (
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                width={300}
                height={300}
                className="video"
              ></video>
            )}
          </div>
        </div>
      )}
      <button onClick={onNext}>شروع راند جدید</button>
    </div>
  );
}