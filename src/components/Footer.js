export default function Footer() {
  return (
    <div className="bg-lime-200">
      <footer className="container mx-auto py-8 border-t border-gray-400">
        <div className="container flex px-3 py-8 ">
          <div className="w-full mx-auto flex flex-wrap">
            <div className="flex w-full lg:w-1/2 ">
              <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-900">About</h3>
                <p className="py-4">
                  This is an English website, where children have fun while
                  learning with play!
                  <br />
                  Thank you for using my website. Maecenas vel mi ut felis
                </p>
              </div>
            </div>
            <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
              <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-900">Social</h3>
                <ul className="list-reset items-center pt-3">
                  <li>
                    <a
                      className="inline-block no-underline hover:text-black hover:underline py-1"
                      href="https://www.facebook.com/profile.php?id=100041113303327"
                    >
                      Vu Duc Phuong
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
