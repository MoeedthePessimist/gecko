import React from "react";

type TitleValuePairProps = {
  title: string;
  value: string;
};

const TitleValuePair: React.FC<TitleValuePairProps> = ({ title, value }) => {
  return (
    <div>
      <p className="text-center md:text-left text-xs md:text-sm text-accent">
        {title}
      </p>
      <p className="text-center md:text-left text-xs md:text-base">{value}</p>
    </div>
  );
};

export default TitleValuePair;
