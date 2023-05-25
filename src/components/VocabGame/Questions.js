import React from "react";

export default function QuestionsVocabGame(props) {
  const { question, onChecked } = props;
  const onSelect = (i) => {
    onChecked(i, true);
  };
  return (
    <>
      {question ? (
        <div
          className="container mx-auto p-8 rounded-[10%]"
          style={{
            maxWidth: "1500px",
            height: "60rem",
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
              className="mx-auto mt-5 mb-5 rounded-md"
            />
          </div>

          <ul
            class="m-8 p-8 grid  grid-rows-2 
                     grid-flow-col gap-4 auto-cols-fr"
            key={question?.id}
          >
            {question?.answers.map((item, i) => (
              <div>
                <button
                  key={i}
                  class="rounded-full text-5xl font-serif pl-10"
                  style={{
                    maxWidth: "550px",
                    width: "100rem",
                    height: "7rem",
                    backgroundImage:
                      "url('https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Fxanhngon.jpg?alt=media&token=216ec3db-90af-4892-abd0-bdf6a5f0d414')",
                  }}
                  onClick={() => onSelect(item.answerText)}
                >
                  {item?.answerText}
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
