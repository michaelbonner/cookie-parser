import ErrorPage from "../components/ErrorPage";

export default function ServerError() {
  return (
    <ErrorPage code={500} title="Something went wrong" showRetry>
      <p>
        Our server hit an unexpected problem while loading this page. Give it
        another try in a moment. Your cookies were never sent anywhere, so
        nothing was lost.
      </p>
    </ErrorPage>
  );
}
