import React from "react";

import leaves from "../../../public/data/leaves-applications.json";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Eye } from "lucide-react";
import AppButton from "../app-button";

const LeaveCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Leave Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            {leaves.map((leave, idx) => (
              <TableRow key={idx}>
                <TableCell>{leave.name}</TableCell>
                <TableCell>{leave.from}</TableCell>
                <TableCell>{leave.to}</TableCell>
                <TableCell>{leave.type}</TableCell>
                <TableCell>{leave.status}</TableCell>
                <TableCell className="">
                  <Eye
                    className="cursor-pointer text-primary hover:text-primary/80 float-end"
                    size={20}
                    onClick={() => {
                      console.log(
                        `Viewing leave application for ${leave.name}`
                      );
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}{" "}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <AppButton title="View All Applications" />
      </CardFooter>
    </Card>
  );
};

export default LeaveCard;
