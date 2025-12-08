import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  UserCircle,
  Clock,
  Mail,
  FileText,
  TrendingUp,
} from "lucide-react";

type LeaveInfoPanelProps = {
  dateJoin?: string;
  dateLeft?: string;
  leaveTable?: string;
  taken?: number;
  carriedForward?: number;
  leaveEntitlement?: number;
  balanceEntitlement?: number;
};

const LeaveInfoPanel: React.FC<LeaveInfoPanelProps> = ({
  dateJoin = "19 Feb 2024",
  dateLeft = "",
  leaveTable = "Female - FT",
  taken = 0,
  carriedForward = 0,
  leaveEntitlement = 0,
  balanceEntitlement = 0,
}) => {
  const infoItems = [
    {
      label: "Date Join",
      value: dateJoin,
      icon: Calendar,
      color: "text-blue-600",
    },
    // {
    //   label: "Date Left",
    //   value: dateLeft || "N/A",
    //   icon: Clock,
    //   color: "text-gray-600",
    // },
    {
      label: "Leave Table",
      value: leaveTable,
      icon: UserCircle,
      color: "text-purple-600",
    },
    {
      label: "Taken",
      value: taken,
      icon: FileText,
      color: "text-orange-600",
    },
    {
      label: "Carried Forward",
      value: carriedForward,
      icon: Mail,
      color: "text-green-600",
    },
    // {
    //   label: "Leave Entitlement",
    //   value: leaveEntitlement,
    //   icon: TrendingUp,
    //   color: "text-indigo-600",
    // },
    // {
    //   label: "Balance Entitlement For This Calendar Year",
    //   value: balanceEntitlement,
    //   icon: TrendingUp,
    //   color: "text-teal-600",
    // },
  ];

  return (
    <div className="px-6">
      <Card className="shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 flex py-2 justify-center items-center">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Leave Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {infoItems.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`${item.color} bg-gray-50 p-2 rounded-lg`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="font-semibold text-gray-800 px-4 py-1"
                >
                  {item.value}
                </Badge>
              </div>
              {index < infoItems.length - 1 && <Separator className="mt-2" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Summary Card
      <Card className="mt-4 shadow-md border-2 border-blue-100">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              Available Leave Balance
            </span>
            <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600">
              {balanceEntitlement} days
            </Badge>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default LeaveInfoPanel;
