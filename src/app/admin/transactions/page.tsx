/** @format */

import React from "react";
import TransactionCard from "./components/transaction-card";
import TransactionTracking from "./components/transaction-tracking";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/_app/button";

export default function TransactionsPage() {
  return (
    <div className="p-5">
      <div className="mb-5 flex items-center  justify-between">
        <h1 className="text-2xl font-bold ">Transactions</h1>
        <Button className="flex gap-2">
          <Plus size={15} />
          New Transaction
        </Button>
      </div>
      {/* Add your content here */}
      <div className="flex w-full flex-col gap-10">
        <div className="flex grow flex-wrap gap-5">
          <TransactionCard
            status="New"
            numOfCurrentStatus={5}
            numOfYesterdayStatus={5}
          />
          <TransactionCard
            status="In progress"
            numOfCurrentStatus={25}
            numOfYesterdayStatus={8}
          />
          <TransactionCard
            status="Completed"
            numOfCurrentStatus={16}
            numOfYesterdayStatus={5}
          />
          <TransactionCard
            status="Pending insurance"
            numOfCurrentStatus={16}
            numOfYesterdayStatus={5}
          />
        </div>
        <TransactionTracking />
      </div>
    </div>
  );
}
