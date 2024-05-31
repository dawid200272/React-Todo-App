import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const style: React.CSSProperties = { textAlign: "center" };

  return (
    <div>
      <div style={style}>
        <h1>An error occurred!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>{/* <i>{error.statusText || error.message}</i> */}</p>
        <Link to={"/"}>Go back to Home</Link>
      </div>
    </div>
  );
}
