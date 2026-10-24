import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type ErrorPageProps = {
  code?: number;
  title: string;
  children: ReactNode;
  showRetry?: boolean;
};

export default function ErrorPage({
  code,
  title,
  children,
  showRetry = false,
}: ErrorPageProps) {
  return (
    <div className="flex flex-col py-2 min-h-screen">
      <Head>
        <title>{`${title} | Cookie Parser`}</title>
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#005d8f" />
      </Head>

      <main className="flex flex-col flex-1 justify-center items-center px-8 w-full text-center md:px-20">
        <Image
          src="/cookie.svg"
          alt=""
          width="96"
          height="96"
          className="opacity-80"
          priority
        />
        <p className="mt-6 text-sm font-semibold tracking-widest text-sky-600 uppercase">
          {code ? `Error ${code}` : "Unexpected error"}
        </p>
        <h1 className="mt-2 text-5xl font-bold md:text-6xl">{title}</h1>
        <div className="mt-6 max-w-xl text-lg text-gray-700">{children}</div>
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          {showRetry && (
            <button
              type="button"
              className="py-2 px-6 font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          )}
          <Link
            href="/"
            className={
              showRetry
                ? "py-2 px-6 font-medium text-sky-600 rounded-md border border-sky-600 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
                : "py-2 px-6 font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
            }
          >
            Back to Cookie Parser
          </Link>
        </div>
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
