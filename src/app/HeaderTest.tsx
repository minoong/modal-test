import React from "react";
import { headers } from "next/headers";

function HeaderTest() {
  const headersList = headers();

  console.log(headersList.get("test"));
  return <div>HeaderTest</div>;
}

export default HeaderTest;
