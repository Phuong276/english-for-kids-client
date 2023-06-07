export default function QuestionsPicturePickerGame(props) {
  const { question } = props;

  const handleGetAnswer = () => {
    props.callbackGetAnswer(true);
  };

  return (
    <div>
      {question ? (
        <div>
          <div className="text-center items-center justify-center flex animate-ping">
            <svg
              class="h-8 w-8 text-red-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="6"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
          <div className="flex items-center justify-center pt-10 hover:animate-pulse text-red-700">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FmonkeyHand%5C.png?alt=media&token=ef9751e6-4f39-440c-a4ca-bf7d5ce95354&_gl=1*16fpnsk*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NTY3NjIwNC4yMC4xLjE2ODU2NzYyMzAuMC4wLjA."
              className="w-[700px] h-[400px] cursor-pointer rounded-[10%]"
              alt="default"
              onClick={handleGetAnswer}
            />
            <div className="flex w-full lg:w-1/2 justify-center items-start tracking-wide absolute top-[800px] font-sans">
              <h1 className="text-black text-6xl my-4">
                {question.answerText}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div>No question</div>
      )}
    </div>
  );
}
