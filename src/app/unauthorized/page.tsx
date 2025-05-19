import Image from "next/image";
import React from "react";

const UnauthorizedPage = () => {
  return (
    <>
      <Image
        src={"/images/unauthorized.jpg"}
        alt="unauthorized-image"
        width={500}
        height={500}
        priority
      />
      <p>{"You don't have access to these resources"}</p>
    </>
  );
};

export default UnauthorizedPage;
