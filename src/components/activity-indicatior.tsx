import { cn } from "@/lib/utils";
import React from "react";

type ActivityIndicatorProps = {
  steps: number;
  currentStep: number;
};

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className={cn("flex flex-row gap-0.5 mx-auto")}>
      {Array.from({ length: steps }).map((_, index: number) => {
        return (
          <div
            className={cn(
              "w-2 h-2 rounded-full bg-accent transition duration-300 ease-in-out",
              {
                "w-4": currentStep === index,
              }
            )}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ActivityIndicator;
