import type { NextPageContext } from "next";
import ErrorPage from "../components/ErrorPage";

type Props = {
  statusCode?: number;
};

// Handles errors not covered by the static 404/500 pages, most importantly
// client-side exceptions, which would otherwise show Next's bare
// "Application error" screen.
function CustomError({ statusCode }: Props) {
  if (statusCode === 404) {
    return (
      <ErrorPage code={404} title="This page crumbled">
        <p>
          We couldn&apos;t find the page you were looking for. It may have
          moved, or the link might be mistyped.
        </p>
      </ErrorPage>
    );
  }

  return (
    <ErrorPage code={statusCode} title="Something went wrong" showRetry>
      <p>
        {statusCode
          ? "Our server hit an unexpected problem while loading this page."
          : "Something broke in your browser while running Cookie Parser."}{" "}
        Try again, or head back to the parser and start fresh. Your cookies
        never leave your browser, so nothing was lost.
      </p>
    </ErrorPage>
  );
}

CustomError.getInitialProps = ({ res, err }: NextPageContext): Props => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : undefined;
  return { statusCode };
};

export default CustomError;
