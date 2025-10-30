import { useState } from "react";

export default function QuestionCard({ question, onAnswer }) {
    const [input, setInput] = useState("");

    return (
        <div className="question-card">
            <h2>{question.text}</h2>
            <input
                type="text"
                placeholder="جوابت رو بنویس..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => onAnswer(input)}>ثبت جواب 🎃</button>
        </div>
    );
}
