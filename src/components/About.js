export default function About() {
  return (
    <div className="bg-lime-100">
      <div
        className="carousel relative container mx-auto"
        style={{
          maxWidth: "80%",
        }}
      >
        {" "}
        <section className="bg-green-200 py-8 text-2xl">
          <div className="container py-8 px-6 mx-auto">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
              href="/"
            >
              About
            </a>
            <br />
            <p className="mt-4 mb-4">
              This is an English website, where children have fun while learning
              with play!
              <br />
              You can donate to me through the link: {""}
              <a
                className="text-gray-800 underline hover:text-gray-900"
                href="/"
              >
                https://www.donate.com
              </a>
            </p>
            <br />
            <p className="mb-8">
              Why do Vietnamese want to learn English?
              <br />
              Learning English is important because it contributes to bringing
              Vietnamese people into the world. Using English well also helps
              learners get jobs easily and opportunities to change their status
              in life. Currently, multinational economic groups use English as
              the language of communication.
              <br />
              Benefits of learning English with native teachers:
              <br />
              * Have the opportunity to communicate regularly with native
              speakers to listen and pronounce according to the native language.
              As a result, learners will naturally form reflexes and use natural
              language.
              <br />
              * Knowledge of the language and culture of native teachers will
              help learners have a deep awareness of the English language.
              <br />
              * Create an environment for learners to bathe themselves in
              English to practice skills effectively.
              <br />* Bringing new, modern, and interesting learning methods
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
