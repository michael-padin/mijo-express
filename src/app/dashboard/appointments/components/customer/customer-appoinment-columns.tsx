"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MeDatePickerWithRange } from "@/components/me/me-date-range-picker";
import Link from "next/link";

export const customerAppointmentColumns: ColumnDef<any>[] = [
  {
    accessorKey: "requestId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate ">
          {row.getValue("requestId")}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "serviceProviderName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PROVIDER" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("serviceProviderName")}</span>;
    },
  },
  {
    accessorKey: "serviceTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ITEM" />
    ),
    cell: ({ row }) => {
      return (
        <div className="fle-wrap flex space-x-2">
          <span className="truncate ">
            {row.original.serviceOffer.serviceTitle}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: "startEndDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATE" />
    ),
    cell: ({ row }) => {
      const due = (row.getValue("startEndDate") as { to: Date }).to;
      return <span className="flex flex-col">{format(due, "LLL dd, y")}</span>;
    },
    enableSorting: false,
  },

  // {
  //   enableSorting: false,
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="STATUS" />
  //   ),
  //   cell: ({ row }) => {
  //     // generate badges by status
  //     // generate badges by status
  //     const status = row.getValue("status") as string;

  //     if (status === "pending") {
  //       return (
  //         <Badge
  //           className={cn("bg-yellow-100 text-yellow-800")}
  //           variant="outline"
  //         >
  //           {status}
  //         </Badge>
  //       );
  //     } else if (status === "accepted") {
  //       return (
  //         <Badge className="bg-green-100 text-green-800" variant="outline">
  //           {status}
  //         </Badge>
  //       );
  //     } else if (status === "completed") {
  //       return (
  //         <Badge className="bg-indigo-100 text-indigo-800" variant="outline">
  //           {status}
  //         </Badge>
  //       );
  //     } else if (status === "cancelled") {
  //       return (
  //         <Badge className="bg-purple-100 text-purple-800" variant="outline">
  //           {status}
  //         </Badge>
  //       );
  //     } else if (status === 'rejected') {
  //       return (
  //         <Badge className="bg-red-100 text-red-800" variant="outline">
  //           {status}
  //         </Badge>
  //       );
  //     }
  //     return <Badge>{status}</Badge>;
  //   },
  // },
  {
    accessorKey: "serviceProviderContactNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CONTACT" />
    ),
    cell: ({ row }) => {
      return (
        <span className="">{row.getValue("serviceProviderContactNumber")}</span>
      );
    },
    enableSorting: false,
  },

  // {
  //   enableSorting: false,
  //   accessorKey: "action",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ACTION" />
  //   ),
  //   cell: ({ row }) => {
  //     return <ProviderServiceRequestAction id="eheheh" requestInfo={row.original} />;
  //   },
  // },
];
