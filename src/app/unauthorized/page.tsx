import Image from "next/image";
import React from "react";

type UnauthorizedPageProps = {
  text?: string;
};

const UnauthorizedPage: React.FC<UnauthorizedPageProps> = ({
  text = "You don't have access to these resources",
}) => {
  return (
    <>
      <Image
        src={"/images/unauthorized.jpg"}
        alt="unauthorized-image"
        width={500}
        height={500}
        priority
      />
      <p>{text}</p>
    </>
  );
};

export default UnauthorizedPage;
