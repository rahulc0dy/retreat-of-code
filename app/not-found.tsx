import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className={"p-2"}>
      <h1 className={"text-text text-lg"}>404 Page not found</h1>
      <Link href={"/"} className={"text-lavender/50 hover:text-lavender"}>
        retreat
      </Link>
    </div>
  );
};
export default NotFound;
