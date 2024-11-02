import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className="flex flex-col justify-center items-center w-full min-h-screen"
      id="error-page"
    >
      <h1 className="text-3xl font-bold mb-6">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-muted-foreground mt-4">
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}
