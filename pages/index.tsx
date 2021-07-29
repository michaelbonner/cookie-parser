import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#__next");

export default function Home() {
  const [cookieString, setCookieString] = useState("");
  const [cookieArray, setCookieArray] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (cookieString === "") {
      setCookieArray([]);
      return;
    }

    setCookieArray(
      cookieString.split("; ").reduce((accumulator, current) => {
        let [name, value] = current.split("=");
        return [
          ...accumulator,
          {
            name,
            value: decodeURIComponent(value),
          },
        ];
      }, [])
    );
  }, [cookieString]);

  const cookieStringSetter = (event) => {
    if (
      event.target.value.substring(0, 1) === '"' &&
      event.target.value.substring(-1, 1) === '"'
    ) {
      setCookieString(
        event.target.value.substring(1, event.target.value.length - 1)
      );
      return;
    }

    setCookieString(event.target.value);
  };

  return (
    <div className="min-h-screen py-2">
      <Head>
        <title>Cookie Parser</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#005d8f" />
      </Head>

      <Modal
        className="inset-8 lg:inset-y-12 lg:inset-x-40 fixed bg-white shadow-lg rounded-md py-8 px-12 text-gray-800 overflow-y-scroll"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2 className="text-gray-800 text-xl">Watch me do it</h2>
        <button
          className="absolute top-2 right-2 py-2 px-4 text-red-800"
          onClick={closeModal}
        >
          Close
        </button>
        <div>
          <video
            className="w-full h-full overflow-auto"
            width="320"
            height="240"
            controls
          >
            <source src="/screen-recording.mp4" type="video/mp4" />
            <source src="/screen-recording.ogv" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-8 sm:px-20 text-center">
        <h1 className="text-6xl font-bold mt-12">Cookie Parser</h1>
        <p className="mt-8 max-w-xl">
          Just drop in what you got from{" "}
          <code className="bg-blue-50 py-1 px-2 rounded-md">
            document.cookie
          </code>{" "}
          and we&apos;ll tell you what cookies are present. We never store any
          of this data (go ahead and check the network tab in the dev tools).
        </p>
        <p className="mt-2 max-w-xl">
          <button className="text-blue-500 underline" onClick={openModal}>
            Need help?
          </button>
        </p>

        <div className="sm:flex sm:items-stretch sm:justify-between w-full border border-gray-200 mt-16 rounded-lg">
          <div className="bg-gray-50 sm:w-1/3 rounded-t-lg sm:rounded-l-lg">
            <textarea
              className="w-full h-full border-0 bg-gray-50 border-gray-100 py-4 px-8 rounded overflow-scroll border-r"
              name="cookieString"
              onChange={(event) => cookieStringSetter(event)}
              placeholder="Add the result from document.cookie from any site"
              style={{ minHeight: "300px" }}
              value={cookieString}
            />
          </div>

          <div className="w-full sm:w-2/3 my-8 py-4 px-8 col-span-2">
            {cookieArray.length ? (
              <div>
                {cookieArray.map((cookie, index) => {
                  return (
                    <div
                      className="py-2 grid grid-cols-2 gap-x-4 text-lg"
                      key={index}
                    >
                      <dt className="text-right font-light break-all">
                        <a
                          className="underline text-blue-500"
                          href={`https://cookiedatabase.org/?s=${cookie.name}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {cookie.name}
                        </a>
                      </dt>
                      <dd className="text-left font-medium break-all">
                        {cookie.value}
                      </dd>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="w-full flex items-center justify-center text-gray-400 font-light italic"
                style={{ minHeight: "300px" }}
              >
                Enter your cookie string above
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 text-gray-700 font-light">
        <a
          className="flex items-center justify-center space-x-2 w-full"
          href="https://bootpackdigital.com/"
        >
          <span>Powered by</span>
          <Image
            src="/bootpack-horizontal.svg"
            alt="Bootpack Digital"
            className="h-16 ml-2"
            width="300"
            height="150"
          />
        </a>
      </footer>
    </div>
  );
}
