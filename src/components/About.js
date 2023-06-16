export default function About() {
  return (
    <div className="bg-lime-100">
      <div className="container mx-auto text-center lg:text-left xl:px-32 p-10">
        <div className="grid items-center lg:grid-cols-2">
          <div className="mb-12 lg:mb-0">
            <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14 backdrop-blur-[30px]">
              <h2 className="mb-6 text-4xl font-bold">
                Why should learn english?
              </h2>
              <p className="mb-12 text-neutral-500 dark:text-neutral-300">
                English is the language of international communication As of
                2022 English is the official language of 67 different countries
                and the most spoken language in the world for both native and
                non-native speakers. More than 1,100 million people use English
                every day around the globe.
              </p>
              <div className="grid gap-x-6 md:grid-cols-3">
                <div className="mb-12 md:mb-0">
                  <h2 className="text-dark mb-4 text-3xl font-bold">16%</h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    Vietnamese
                  </h5>
                </div>

                <div className="mb-12 md:mb-0">
                  <h2 className="text-dark mb-4 text-3xl font-bold">67</h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    Countries
                  </h5>
                </div>

                <div className="">
                  <h2 className="text-dark mb-4 text-3xl font-bold">60%</h2>
                  <h5 className="mb-0 text-lg font-medium text-neutral-500 dark:text-neutral-300">
                    Website
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div>
            <img
              className="rotate-lg-6 w-full shadow-lg dark:shadow-black/20 rounded-sm"
              src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Funnamed.png?alt=media&token=258467f3-ebc7-4ea6-90a1-d05bdf9e1f72"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
