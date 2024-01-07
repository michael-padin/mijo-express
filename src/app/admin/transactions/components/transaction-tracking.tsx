/** @format */
"use client";

import { Button } from "@/components/ui/_app/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/_app/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import React from "react";
import { DataTable } from "../../components/data-table";
import { columns } from "../../components/columns";
import { transactionData } from "../../components/data";

const TransactionTracking = () => {
  return (
    <div className="">
      <div className="mb-5 flex items-center  justify-between">
        <h1 className="text-2xl font-bold ">Transactions Tracking</h1>
        <Button className="flex gap-2">
          <Plus size={15} />
          New Task
        </Button>
      </div>
      <Card>
        <Tabs defaultValue="new">
          <CardHeader>
            <div className="flex justify-between">
              <TabsList>
                <div className="flex justify-between">
                  <div className="flex lg:w-[327px]">
                    <TabsTrigger value="new" className="grow">
                      New
                    </TabsTrigger>
                    <TabsTrigger value="in progress" className="grow">
                      In progress
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="grow">
                      Completed
                    </TabsTrigger>
                  </div>
                </div>
              </TabsList>
              <div className="flex gap-5">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Sort by</SelectLabel> */}
                      <SelectItem value="apple">Due date</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="new">
              <DataTable columns={columns} data={transactionData} />
            </TabsContent>
            <TabsContent value="in progress">
              <DataTable columns={columns.reverse()} data={transactionData} />
            </TabsContent>
            <TabsContent value="completed">
              <DataTable columns={columns} data={transactionData} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TransactionTracking;
