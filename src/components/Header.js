export default function Headers() {
  return (
    <div className="bg-lime-100">
      <section
        className="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right relative"
        style={{
          maxWidth: "80%",
          height: "50rem",
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FoagWjI.jpg?alt=media&token=8670ac79-2219-4827-a5f6-d86ea669c650')",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide absolute top-[250px]">
            <h1 className="text-black text-5xl my-4">
              You can do it. We can help.
            </h1>
            <a
              className="text-1xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
              href="https://www.facebook.com/profile.php?id=100041113303327"
            >
              Follow me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
