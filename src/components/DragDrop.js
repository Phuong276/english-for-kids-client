import { useState } from "react";

export default function DragDrop() {
  const listitems = [
    { id: "item1", label: "item 1" },
    { id: "item2", label: "item 2" },
    { id: "item3", label: "item 3" },
    { id: "item4", label: "item 4" },
  ];

  const [list, setList] = useState(listitems);

  const [isDragging, setIsDragging] = useState(false);
  const [draggedList, setDraggedList] = useState([]);

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
    if (item) {
      setDraggedList([...draggedList, item]);
      setIsDragging(false);
      const filterList = list.filter((x) => x.id !== id);
      setList(filterList);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-1">
      <div className="p-4 mt-5 bg-white rounded-lg shadow-lg">
        <ul className="list-none p-0 m-0 bg-indigo-200 border border-indigo-300 min-h-40">
          {list.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className="bg-white border border-indigo-300 p-4 mb-2 cursor-move"
              draggable={true}
              onDragStart={handleDragStart}
            >
              {item.label}
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
        <p>Drag Items Here</p>
        <ul className="list-none p-0 m-0 bg-indigo-200 border border-indigo-300 min-h-40">
          {draggedList.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className="bg-white border border-indigo-300 p-4 mb-2 cursor-move"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
