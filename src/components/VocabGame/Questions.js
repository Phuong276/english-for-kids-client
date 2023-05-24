import React from "react";

export default function QuestionsVocabGame(props) {
  const { question, onChecked } = props;
  const onSelect = (i) => {
    onChecked(i);
  };
  return (
    <>
      {question ? (
        <div
          className="container mx-auto p-8 rounded-[10%]"
          style={{
            maxWidth: "1500px",
            height: "53rem",
            backgroundImage:
              "url('https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FoagWjI.jpg?alt=media&token=8670ac79-2219-4827-a5f6-d86ea669c650')",
          }}
        >
          <div className="text-center">
            <div className="text-6xl font-serif">
              <b>{question?.questionText}</b>
            </div>
            <img
              src={question.questionImage}
              alt={question.id}
              width={600}
              height={600}
              className="mx-auto mt-10 mb-20 rounded-md"
            />
          </div>

          <ul
            class="m-8 p-8 grid  grid-rows-2 
                     grid-flow-col gap-4 auto-cols-fr"
            key={question?.id}
          >
            {question?.answers.map((item, i) => (
              <div>
                <li
                  key={i}
                  class="p-4 rounded-full"
                  style={{
                    maxWidth: "550px",
                    height: "5rem",
                    backgroundImage:
                      "url('https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Fxanhngon.jpg?alt=media&token=216ec3db-90af-4892-abd0-bdf6a5f0d414')",
                  }}
                >
                  <div class="flex items-center h-5">
                    <input
                      type="radio"
                      value={false}
                      name="options"
                      id={`q${i}-options`}
                      onChange={() => onSelect(item.answerText)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      className="text-5xl font-serif"
                      htmlFor={`q${i}-options`}
                    >
                      {item?.answerText}
                    </label>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <div>No Question</div>
      )}
    </>
  );
}
