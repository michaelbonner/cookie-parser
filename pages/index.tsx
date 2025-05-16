import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { setCookie } from "../functions/setCookie";

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
    <div className="py-2 min-h-screen">
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

      <Dialog
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-3xl space-y-4 border bg-white p-12 rounded-lg relative">
            <DialogTitle className="font-bold">How to get cookies</DialogTitle>
            <Description>
              Here&apos;s a video of me getting the contents of
              `document.cookie` from the developer tools console.
            </Description>
            <button
              className="absolute top-0 right-2 py-2 px-4 text-red-800"
              onClick={closeModal}
              aria-label="Close"
            >
              X
            </button>
            <div className="flex overflow-auto flex-col gap-4 justify-center items-center mx-auto w-full max-w-5xl h-full">
              <iframe
                className="w-full bg-gray-200 aspect-16/9"
                src="https://www.youtube.com/embed/AJIEl0Sqs3c?si=ENHOaj1SyA1HZQIZ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="flex flex-col flex-1 justify-center items-center px-8 w-full text-center md:px-20">
        <h1 className="mt-12 text-6xl font-bold">Cookie Parser</h1>
        <p className="mt-8 max-w-2xl">
          Just drop in what you got from{" "}
          <code className="py-1 px-2 bg-sky-50 rounded-md">
            document.cookie
          </code>{" "}
          and we&apos;ll tell you what cookies are present. Or if you&apos;d
          prefer, include the cookie string in the URL as a query parameter (
          <a
            className="text-sky-600 underline"
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
          <button className="text-sky-600 underline" onClick={openModal}>
            Need help?
          </button>
        </p>

        <div
          className="mt-16 w-full rounded-lg border border-gray-200 md:flex md:justify-between md:items-stretch"
          style={{ minHeight: "50vh" }}
        >
          <div className="bg-gray-50 rounded-t-lg md:w-1/3 md:rounded-l-lg">
            <textarea
              className="overflow-scroll py-4 px-8 w-full h-full bg-gray-50 rounded-sm border-0 border-r border-gray-100"
              name="cookieString"
              onChange={(event) => cookieStringSetter(event)}
              placeholder="Add your cookie string here..."
              style={{ minHeight: "300px" }}
              value={cookieString}
            />
          </div>

          <div className="col-span-2 py-4 px-8 my-8 w-full md:w-2/3">
            {cookieArray.length ? (
              <div>
                {cookieArray.map((cookie, index) => {
                  return (
                    <div
                      className="grid grid-cols-2 gap-x-4 py-2 text-lg"
                      key={index}
                    >
                      <dt className="font-light text-right break-all">
                        <a
                          className="text-sky-600 underline"
                          href={`https://cookiedatabase.org/?s=${cookie.name}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {cookie.name}
                        </a>
                      </dt>
                      <dd className="font-medium text-left break-all">
                        {cookie.value}
                      </dd>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="flex justify-center items-center w-full italic font-light text-gray-400"
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
          <code className="py-1 px-1 bg-sky-50 rounded-md">
            window.copy(document.cookie)
          </code>
          . This will copy the cookie string to your clipboard. Note: This will
          only copy cookies available to javascript (HTTP only and secure
          cookies will be omitted).
        </p>
      </main>

      <footer className="mx-auto max-w-lg font-light text-center text-gray-700">
        <a
          className="flex justify-center items-center pt-10 space-x-2 w-full"
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
          <a
            className="text-sky-600 underline"
            href="https://bootpackdigital.com/?utm_source=cookie-parser"
          >
            Check out our custom web design, web development, software, and
            mobile apps at Bootpack Digital
          </a>
        </p>
        <p className="block mt-2">
          <span className="text-sm">&copy;</span>
          2021-{new Date().getFullYear()}{" "}
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
