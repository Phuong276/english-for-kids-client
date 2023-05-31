import { useEffect, useState } from "react";

export default function QuestionsGrammarGame(props) {
  const { question, trace } = props;

  const listitems = question?.answers;
  listitems.map((item) => (item.id = String(item.id)));

  const [list, setList] = useState(listitems);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedList, setDraggedList] = useState([]);

  useEffect(() => {
    setList(listitems);
    setDraggedList([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trace]);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("id", event.currentTarget.id);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    const item = listitems.find((x) => x.id === id);
    if (item && draggedList.filter((x) => x.id === id).length < 1) {
      setDraggedList([...draggedList, item]);
      setIsDragging(false);
      const filterList = list.filter((x) => x.id !== id);
      setList(filterList);
    }
  };

  const handleDrop2 = (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    const item = listitems.find((x) => x.id === id);
    if (item && list.filter((x) => x.id === id).length < 1) {
      setList([...list, item]);
      setIsDragging(false);
      const filterList = draggedList.filter((x) => x.id !== id);
      setDraggedList(filterList);
    }
  };

  const arrayTextView = [];
  draggedList.map((item) => arrayTextView.push(item.answerText));
  props.callbackSetAnswerText(arrayTextView.join(" "));
  return (
    <div>
      <div className="border-[7px] border-green-600 bg-green-300 rounded-3xl">
        <div className="text-5xl font-thin pt-6 pb-6">
          <b>
            {arrayTextView.join(" ") === ""
              ? question?.questionText
              : arrayTextView.join(" ")}
          </b>
        </div>
        <img
          src={question.questionImage}
          alt={question.id}
          width={400}
          height={300}
          className="mx-auto rounded-[20%]"
        />
        <div className="grid grid-cols-2 gap-1 mb-10">
          <div
            className="p-4 mt-5 bg-white rounded-lg shadow-lg w-[700px]"
            onDragOver={handleDragOver}
            onDrop={handleDrop2}
          >
            <ul className="list-none p-0 m-0 bg-green-200 border border-green-300 min-h-40">
              {list.map((item) => (
                <li
                  key={item.id}
                  id={item.id}
                  className="bg-white border border-green-300 p-4 mb-2 cursor-move"
                  draggable={true}
                  onDragStart={handleDragStart}
                >
                  {item.answerText}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`p-4 mt-4 bg-white rounded-lg shadow-lg border-dashed border-2 min-h-60 ${
              isDragging ? "border-black" : "border-indigo-300"
            } `}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <p>Sort answers here</p>
            <ul className="list-none p-0 m-0 bg-green-200 border border-green-300 min-h-40">
              {draggedList.map((item) => (
                <li
                  key={item.id}
                  id={item.id}
                  className="bg-white border border-green-300 p-4 mb-2 cursor-move"
                  draggable={true}
                  onDragStart={handleDragStart}
                >
                  {item.answerText}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
