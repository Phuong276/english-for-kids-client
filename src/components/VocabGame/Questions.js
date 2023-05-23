import React from "react";

export default function QuestionsVocabGame(props) {
  const { question, onChecked } = props;
  const onSelect = (i) => {
    onChecked(i);
  };

  return (
    <>
      {question ? (
        <div className="questions">
          <img
            src={question.questionImage}
            alt={question.id}
            className="questionImage"
          />
          <h2 className="text-light">{question?.questionText}</h2>
          <ul key={question?.id}>
            {question?.answers.map((item, i) => (
              <li key={i}>
                <input
                  type="radio"
                  value={false}
                  name="options"
                  id={`q${i}-options`}
                  onChange={() => onSelect(item.answerText)}
                />
                <label className="text-primary" htmlFor={`q${i}-options`}>
                  {item?.answerText}
                </label>
                <div className="check"></div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No Question</div>
      )}
    </>
  );
}
