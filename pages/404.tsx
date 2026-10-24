import ErrorPage from "../components/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage code={404} title="This page crumbled">
      <p>
        We couldn&apos;t find the page you were looking for. It may have moved,
        or the link might be mistyped. The cookie parser itself is right where
        you left it.
      </p>
    </ErrorPage>
  );
}
