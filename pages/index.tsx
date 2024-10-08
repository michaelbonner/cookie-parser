import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { setCookie } from "../functions/setCookie";

Modal.setAppElement("#modal-root");

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
    // set an example cookie
    setCookie("bootpack", "awesome", 30);
  }, []);

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

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.cookie) {
      if (
        params.cookie.substring(0, 1) === '"' &&
        params.cookie.substring(-1, 1) === '"'
      ) {
        setCookieString(params.cookie.substring(1, params.cookie.length - 1));
        return;
      }

      setCookieString(params.cookie);
    }
  }, []);

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
        <title>
          Cookie Parser is an easy way to understand your browser cookies
        </title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://cookie-parser.michaelbonner.dev/" />
        <meta name="theme-color" content="#005d8f" />
        <meta
          name="description"
          content="A little tool to parse a cookie string and figure out what they mean"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta
          property="og:url"
          content="https://cookie-parser.michaelbonner.dev/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Cookie Parser is an easy way to understand your browser cookies"
        />
        <meta
          property="og:description"
          content="A little tool to parse a cookie string and figure out what they mean"
        />
        <meta
          property="og:image"
          content="https://cookie-parser.michaelbonner.dev/og-image.png"
        />
      </Head>

      <Modal
        className="inset-8 md:inset-y-24 md:inset-x-40 fixed bg-white shadow rounded-lg py-8 px-12 text-gray-800 overflow-y-scroll border"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="fixed inset-0 bg-blue-400 bg-opacity-70"
      >
        <button
          className="absolute top-2 right-2 py-2 px-4 text-red-800"
          onClick={closeModal}
        >
          Close
        </button>
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center h-full overflow-auto">
          <p>
            Here&apos;s a video of me getting the contents of `document.cookie`
            from the developer tools console.
          </p>
          <iframe
            className="bg-gray-200 aspect-[16/9] w-full"
            src="https://www.youtube.com/embed/AJIEl0Sqs3c?si=ENHOaj1SyA1HZQIZ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-8 md:px-20 text-center">
        <h1 className="text-6xl font-bold mt-12">Cookie Parser</h1>
        <p className="mt-8 max-w-2xl">
          Just drop in what you got from{" "}
          <code className="bg-blue-50 py-1 px-2 rounded-md">
            document.cookie
          </code>{" "}
          and we&apos;ll tell you what cookies are present. Or if you&apos;d
          prefer, include the cookie string in the URL as a query parameter (
          <a
            className="text-blue-600 underline"
            href={`https://cookie-parser.michaelbonner.dev/?cookie="bootpack=awesome; you=also awesome"`}
            rel="noreferrer"
            target="_blank"
          >
            like this
          </a>
          ). We never store any of this data (go ahead and check the network tab
          in the dev tools).
        </p>
        <p className="mt-2 max-w-xl">
          <button className="text-blue-600 underline" onClick={openModal}>
            Need help?
          </button>
        </p>

        <div
          className="md:flex md:items-stretch md:justify-between w-full border border-gray-200 mt-16 rounded-lg"
          style={{ minHeight: "50vh" }}
        >
          <div className="bg-gray-50 md:w-1/3 rounded-t-lg md:rounded-l-lg">
            <textarea
              className="w-full h-full border-0 bg-gray-50 border-gray-100 py-4 px-8 rounded overflow-scroll border-r"
              name="cookieString"
              onChange={(event) => cookieStringSetter(event)}
              placeholder="Add your cookie string here..."
              style={{ minHeight: "300px" }}
              value={cookieString}
            />
          </div>

          <div className="w-full md:w-2/3 my-8 py-4 px-8 col-span-2">
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
                          className="underline text-blue-600"
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
                <span className="md:hidden">
                  &uarr; Enter your cookie string above
                </span>
                <span className="hidden md:block">
                  &larr; Enter your cookie string in the box on the left
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-sm">
          Tip: Navigate to a website to test and run{" "}
          <code className="bg-blue-50 py-1 px-1 rounded-md">
            window.copy(document.cookie)
          </code>
          . This will copy the cookie string to your clipboard. Note: This will
          only copy cookies available to javascript (HTTP only and secure
          cookies will be omitted).
        </p>
      </main>

      <footer className="text-gray-700 font-light text-center max-w-lg mx-auto">
        <a
          className="flex items-center justify-center space-x-2 w-full pt-10"
          href="https://bootpackdigital.com/?utm_source=cookie-parser"
        >
          <Image
            src="/bootpack-horizontal.svg"
            alt="Bootpack Digital"
            width="300"
            height="90"
          />
        </a>
        <p className="block mt-4">
          Check out our custom web design, web development, software, and mobile
          apps at{" "}
          <a
            className="text-blue-600 underline"
            href="https://bootpackdigital.com/?utm_source=cookie-parser"
          >
            Bootpack Digital
          </a>
        </p>
        <p className="block mt-2">
          <span className="text-sm">&copy;</span>
          {new Date().getFullYear()}{" "}
          <a
            className="hover:underline underline-offset-2"
            href="https://bootpackdigital.com/?utm_source=cookie-parser"
          >
            Bootpack Digital
          </a>
        </p>
      </footer>
    </div>
  );
}
