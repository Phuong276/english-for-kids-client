export default function QuizTest() {
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1 class="text-green-400 text-5xl font-bold">GeeksforGeeks</h1>
        <div className="mt-20 text-3xl ">
          <b>Tailwind CSS Grid Auto Columns Class</b>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FoagWjI.jpg?alt=media&token=8670ac79-2219-4827-a5f6-d86ea669c650"
          alt="anh"
          width={600}
          height={500}
          className="mx-auto mt-10 mb-20"
        />
      </div>

      <div
        class="m-8 p-8 grid bg-green-400 grid-rows-2 
                     grid-flow-col gap-4 auto-cols-fr"
      >
        <div class="p-4 bg-green-200">
          <div class="flex items-center h-5">
            <input
              id="helper-radio"
              aria-describedby="helper-radio-text"
              type="radio"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            A
          </div>
        </div>
        <div class="p-4 bg-green-200">
          <div class="flex items-center h-5">
            <input
              id="helper-radio"
              aria-describedby="helper-radio-text"
              type="radio"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            A
          </div>
        </div>
        <div class="p-4 bg-green-200">
          <div class="flex items-center h-5">
            <input
              id="helper-radio"
              aria-describedby="helper-radio-text"
              type="radio"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            A
          </div>
        </div>
        <div class="p-4 bg-green-200">
          <div class="flex items-center h-5">
            <input
              id="helper-radio"
              aria-describedby="helper-radio-text"
              type="radio"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            A
          </div>
        </div>
      </div>
    </div>
  );
}
