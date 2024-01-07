/** @format */

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Info, LucideIcon, Play } from "lucide-react";

interface TransactionCardProps {
  status: string;
  numOfCurrentStatus: number;
  numOfYesterdayStatus: number;
}

const colorMappings = {
  new: {
    content: "text-info-500",
    button: "bg-info-500",
    border: "border-info-400",
    bg: "bg-info-100",
    icon: FileText,
  },
  "in progress": {
    content: "text-warning-500",
    button: "bg-warning-500",
    border: "border-warning-400",
    bg: "bg-warning-100",
    icon: Play,
  },
  completed: {
    content: "text-success-500",
    button: "bg-success-500",
    border: "border-success-400",
    bg: "bg-success-100",
    icon: CheckCircle2,
  },
  "pending insurance": {
    content: "text-secondary-500",
    button: "bg-secondary-500",
    border: "border-secondary-400",
    bg: "bg-secondary-100",
    icon: Info,
  },
};

const TransactionCard: React.FC<TransactionCardProps> = ({
  numOfCurrentStatus,
  numOfYesterdayStatus,
  status,
}) => {
  const colors =
    colorMappings[status.toLowerCase() as keyof typeof colorMappings] || {};

  return (
    <Card
      className={`shrink grow basis-[266px]  ${colors.content} ${colors.border} ${colors.bg}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-black ">{status}</CardTitle>
          <Button className={`${colors.button} `} size="icon">
            {colors.icon && <colors.icon className={`text-white`} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <h1
            className={`text-3xl font-bold`}
            style={{ color: colors.content }}
          >
            {numOfCurrentStatus}
          </h1>
          <p className="text-xs text-[#323842FF]">{`+${numOfYesterdayStatus} from yesterday`}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
