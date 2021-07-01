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
          className="w-full border shadow-md border-gray-100 mt-8 py-4 px-8"
          name="cookieString"
          onChange={(event) => setCookieString(event.target.value)}
          placeholder="Add the result from document.cookie from any site"
          minRows="10"
          value={cookieString}
        />
        {cookieArray.length ? (
          <div className="border w-full max-w-4xl my-8 bg-gray-50 py-4 px-8">
            {cookieArray.map((cookie) => {
              return (
                <div
                  className="py-2 grid grid-cols-2 gap-x-4 text-lg"
                  key={cookie.name}
                >
                  <dt className="text-xl text-right font-light">
                    {cookie.name}
                  </dt>
                  <dd className="text-left font-medium">{cookie.value}</dd>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="border w-full my-8 bg-gray-50 py-6 px-8"
            style={{ minHeight: "300px" }}
          >
            Enter your cookie string above
          </div>
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-24">
        <a
          className="flex items-center justify-center"
          href="https://bootpackdigital.com/"
        >
          Powered by{" "}
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
