import React, { useState } from "react";
import "../../styles/VocabGame/Questions.css";

export default function QuestionsVocabGame(props) {
  const { question, onChecked } = props;

  const [checked, setChecked] = useState(undefined);

  const onSelect = (i) => {
    setChecked(i);
    onChecked(i);
  };

  return (
    <div className="questions">
      <img
        src={question.questionImage}
        alt={question.id}
        className="questionImage"
      />
      <h2 className="text-light">{question?.questionText}</h2>
      <ul key={question?.id}>
        {question?.answers.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-options`}
              onChange={() => onSelect(i)}
            />
            <label className="text-primary" htmlFor={`q${i}-options`}>
              {question?.answers[i].answerText}
            </label>
            <div className="check"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
