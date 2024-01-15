"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServiceRequestAction } from "./service-request-action";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MeDatePickerWithRange } from "@/components/me/me-date-range-picker";

export const columns: ColumnDef<any>[] = [
  // {
  //   accessorKey: "_id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="max-w-[500px] truncate font-medium">
  //         {row.getValue("_id")}
  //       </span>
  //     );
  //   },
  //   enableSorting: false,
  // },
  {
    accessorKey: "customerDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const { serviceCategory } = row.getValue("serviceOffer") as any;
      return (
        <div className="flex space-x-2">
          {serviceCategory && (
            <Badge variant="outline">{serviceCategory}</Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("customerDescription")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "startEndDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date - End Date" />
    ),
    cell: ({ row }) => {
      return (
        <span className="flex flex-col">
          <MeDatePickerWithRange date={row.getValue("startEndDate")} disabled />
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "serviceOffer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" Price " />
    ),
    cell: ({ row }) => {
      const serviceOffered: any = row.getValue("serviceOffer");
      console.log(serviceOffered);

      return <span>₱ {serviceOffered?.servicePrice}</span>;
    },
  },

  {
    enableSorting: false,
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      // generate badges by status
      // generate badges by status
      const status = row.getValue("status") as string;

      if (status === "pending") {
        return (
          <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
        );
      } else if (status === "accepted") {
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      } else if (status === "completed") {
        return (
          <Badge className="bg-indigo-100 text-indigo-800">{status}</Badge>
        );
      } else if (status === "cancelled") {
        return (
          <Badge className="bg-purple-100 text-purple-800">{status}</Badge>
        );
      }
      return <Badge>{status}</Badge>;
    },
  },
  {
    enableSorting: false,
    accessorKey: "serviceProviderName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => {
      return <p className="font-bold">{row.getValue("serviceProviderName")}</p>;
    },
  },
  {
    enableSorting: false,
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      return <ServiceRequestAction id="eheheh" />;
    },
  },
];
