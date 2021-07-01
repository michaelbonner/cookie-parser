import Head from "next/head";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
  const [cookieString, setCookieString] = useState("");
  const [cookieArray, setCookieArray] = useState([]);

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

  return (
    <div className="min-h-screen py-2">
      <Head>
        <title>Cookie Parser</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#005d8f" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mt-12">Cookie Parser</h1>
        <p className="mt-8">
          Just drop in what you got from{" "}
          <code className="bg-blue-100 py-1 px-2 rounded-md">
            document.cookie
          </code>{" "}
          and we'll tell you what cookies are present.
        </p>
        <TextareaAutosize
          className="w-full border shadow-md border-gray-100 my-8 py-4 px-8 rounded"
          name="cookieString"
          onChange={(event) => setCookieString(event.target.value)}
          placeholder="Add the result from document.cookie from any site"
          minRows="10"
          value={cookieString}
        />

        {cookieArray.length ? (
          <div className="border w-full max-w-4xl rounded my-8 bg-gray-50 py-4 px-8">
            {cookieArray.map((cookie) => {
              return (
                <div
                  className="py-2 grid grid-cols-2 gap-x-4 text-lg"
                  key={cookie.name}
                >
                  <dt className="text-right font-light">
                    <a
                      className="underline text-blue-500"
                      href={`https://cookiedatabase.org/?s=${cookie.name}&lang=en`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {cookie.name}
                    </a>
                  </dt>
                  <dd className="text-left font-medium">{cookie.value}</dd>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="border w-full max-w-4xl rounded my-8 bg-gray-50 py-4 px-8 flex items-center justify-center text-gray-400 font-light italic"
            style={{ minHeight: "300px" }}
          >
            Enter your cookie string above
          </div>
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-24 text-gray-700 font-light">
        <a
          className="flex items-center justify-center space-x-2 w-full"
          href="https://bootpackdigital.com/"
        >
          <span>Powered by</span>
          <img
            src="/bootpack-horizontal.svg"
            alt="Bootpack Digital"
            className="h-16 ml-2"
          />
        </a>
      </footer>
    </div>
  );
}
