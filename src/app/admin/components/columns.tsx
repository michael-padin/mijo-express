/** @format */

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("name")}
        </span>
      );
    },
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progress" />
    ),
    cell: ({ row }) => {
      const progress = Number(row.getValue("progress"));

      return <Progress value={progress} className="h-[6px] w-[60%]" />;
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusClasses;

      const statusClasses = {
        Low: "inline-flex items-center m-2 px-3 py-2 bg-success-100  rounded-full text-sm text-success-700",
        Medium:
          "inline-flex items-center m-2 px-3 py-2 bg-warning-100  rounded-full text-sm text-warning-700",
        High: "inline-flex items-center m-2 px-3 py-2 bg-danger-100  rounded-full text-sm text-danger-700",
      };

      const statusClass = statusClasses[status];

      if (statusClass) {
        return (
          <span
            className={`me-2 rounded-full p-2 text-xs font-medium ${statusClass}`}
          >
            {status}
          </span>
        );
      } else {
        return null;
      }
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Calendar size={15} />
          {row.getValue("date")}
        </div>
      );
    },
  },
  {
    enableSorting: false,
    accessorKey: "profile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profile" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    },
  },
];
