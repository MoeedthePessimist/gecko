"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/context/auth-context";
import useAuth from "@/hooks/use-auth";
import React from "react";

const AdminPage = () => {
  const { isLoggedIn, user, role } = useAuthContext();

  console.log(isLoggedIn, "isLoggedIn");
  const { logout } = useAuth();
  return (
    <div className="flex flex-col w-full gap-2">
      {/* Leave notification */}
      <Card className="w-full max-h-48 h-48"></Card>

      {/*
       * claims
       * commissions
       * medical leave
       * annual leaves
       */}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-accent text-white gap-2">
          <CardHeader>
            <CardTitle className="font-normal">Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$25,000</p>
            <p className="text-xs">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-primary gap-2">
          <CardHeader>
            <CardTitle className="font-normal">Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$135,000</p>
            <p className="text-xs">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-accent text-white gap-2">
          <CardHeader>
            <CardTitle className="font-normal">Medical Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">30 Leaves</p>
            <p className="text-xs">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-primary gap-2">
          <CardHeader>
            <CardTitle className="font-normal">Annual Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">40 Leaves</p>
            <p className="text-xs">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/*
       * employee salaries for the month
       * remaining leave balance
       */}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card></Card>
        <Card></Card>
      </div>

      {/* Calendar showing leave dates, and public holidays */}
      <Card></Card>
    </div>
  );
};

export default AdminPage;
