import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type AccumulationCardProps = {
  title: string;
  onClick?: () => void;
  accumulationContent: string;
  accumulationPercentage?: string;
  colorClasses?: string;
};

const AccumulationCard: React.FC<AccumulationCardProps> = ({
  title,
  onClick,
  accumulationContent,
  accumulationPercentage,
  colorClasses = "bg-accent text-white",
}) => {
  return (
    <Card className={`${colorClasses} gap-2`} onClick={onClick}>
      <CardHeader>
        <CardTitle className="font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{accumulationContent}</p>
        {accumulationPercentage && (
          <p className="text-xs">{accumulationPercentage} from last month</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AccumulationCard;
