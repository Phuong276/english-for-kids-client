export default function TrueFalse(props) {
  const { titelModal, colorModal, messModal, setShowModal } = props;
  const setShowModalChil = (status) => {
    setShowModal(status);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full ${
              colorModal ? "bg-green-200" : "bg-red-200"
            } outline-none focus:outline-none`}
          >
            <div className="flex items-start justify-between p-6 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{titelModal}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModalChil(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-3xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-12 flex-auto">
              <p className="my-4 text-slate-500 text-3xl leading-relaxed">
                {messModal}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
