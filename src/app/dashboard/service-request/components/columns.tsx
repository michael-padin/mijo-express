"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServiceRequestAction } from "./service-request-action";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      // return (
      // 	<span className="max-w-[500px] truncate font-medium">
      // 		{row.getValue("name")}
      // 	</span>
      // );
      return <span>id</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "Category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const progress = Number(row.getValue("progress"));

      // return <Progress value={progress} className="w-[60%] h-[6px]" />;
      return <span>category</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      // const status = row.getValue("status") as keyof typeof statusClasses;

      // const statusClasses = {
      // 	Low: "inline-flex items-center m-2 px-3 py-2 bg-success-100  rounded-full text-sm text-success-700",
      // 	Medium:
      // 		"inline-flex items-center m-2 px-3 py-2 bg-warning-100  rounded-full text-sm text-warning-700",
      // 	High: "inline-flex items-center m-2 px-3 py-2 bg-danger-100  rounded-full text-sm text-danger-700",
      // };

      // const statusClass = statusClasses[status];

      // if (statusClass) {
      // 	return (
      // 		<span
      // 			className={`text-xs font-medium me-2 p-2 rounded-full ${statusClass}`}>
      // 			{status}
      // 		</span>
      // 	);
      // } else {
      // 	return null;
      // }
      return <span>description</span>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return <span className="flex flex-col">Date urgency - high</span>;
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Budget" />
    ),
    cell: ({ row }) => {
      return <span>budget</span>;
    },
  },

  {
    enableSorting: false,
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      // return (
      // 	<Avatar>
      // 		<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      // 		<AvatarFallback>CN</AvatarFallback>
      // 	</Avatar>
      // );

      return <span>status</span>;
    },
  },
  {
    enableSorting: false,
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
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
