import Image from "next/image";
import React from "react";
import Avatar from "./avatar";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import TitleValuePair from "./title-value-pair";
import AppButton from "./app-button";
import { EditIcon, Trash2 } from "lucide-react";

type EmployeeCardProps = {
  employee?: any;
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <Card className="rounded-xl flex flex-col p-4 w-full border-2">
      <CardHeader className="relative w-full h-32 ">
        <Image
          src="/images/cover-placeholder.jpg"
          alt="cover placeholder"
          fill
          className="object-cover rounded-xl"
        />
        <div
          className="flex flex-row gap-2 md:gap-4 absolute z-10 -bottom-8 md:-bottom-14 left-10 items-end
        "
        >
          <Avatar
            name={employee?.name}
            avatar={employee?.avatar || "https://github.com/shadcn.png"}
            containerClasses="w-16 h-16 md:w-24 md:h-24"
          />
          {/* <div className="flex md:gap-1 flex-col">
            <p className="text-sm md:text-lg font-bold">
              {employee?.name || "John Doe"}
            </p>
            <p className="text-xs md:text-sm font-light text-accent">
              {employee?.job?.title || "Software Engineer"}
            </p>
          </div> */}
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 mt-10 gap-4">
        <TitleValuePair title="ID" value="0000001" />
        <TitleValuePair title="Name" value="Abdul Moeed" />
        <TitleValuePair title="Email" value="test@gmail.com" />
        <TitleValuePair title="Job Category" value="Manager" />
        <TitleValuePair title="Designation" value="General Directory" />
        <TitleValuePair title="Phone" value="01293128492" />
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-4">
        <AppButton
          buttonOptions={{
            className:
              "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white",
          }}
          title="Edit"
          icon={<EditIcon />}
          iconPosition="start"
        />

        <AppButton
          buttonOptions={{
            className:
              "bg-white text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white",
          }}
          title="Delete"
          icon={<Trash2 />}
          iconPosition="end"
        />
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
