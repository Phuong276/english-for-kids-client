import React from "react";

export default function QuestionsVocabGame(props) {
  const { question, onChecked } = props;
  const onSelect = (i) => {
    onChecked(i, true);
  };
  return (
    <>
      {question ? (
        <div className="w-[100%] h-[100%]">
          <div className="text-center">
            <div className="border-[7px] border-gray-600 bg-orange-300 rounded-3xl">
              <div className="text-6xl font-thin pt-6 pb-6">
                <b>{question?.questionText}</b>
              </div>
            </div>
            <img
              src={question.questionImage}
              alt={question.id}
              width={700}
              height={600}
              className="mx-auto mt-10 mb-20 rounded-[20%] w-[400px] h-[400px]"
            />
          </div>

          <ul
            class="grid  grid-rows-2 
                     grid-flow-col gap-20 auto-cols-fr"
            key={question?.id}
          >
            {question?.answers.map((item, i) => (
              <div
                className="border-[5px] border-gray-500 bg-orange-200 rounded-3xl hover:bg-orange-300"
                onClick={() => onSelect(item.answerText)}
              >
                <button
                  key={i}
                  className="rounded-full text-5xl font-serif pt-5 pb-5"
                >
                  {i === 0
                    ? `A.  ${item?.answerText}`
                    : i === 1
                    ? `B.  ${item?.answerText}`
                    : i === 2
                    ? `C.  ${item?.answerText}`
                    : `D.  ${item?.answerText}`}
                </button>
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
