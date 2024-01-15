"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import React from "react";
import {
  Briefcase,
  Calendar,
  Home,
  Inbox,
  LucideIcon,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface IDashProps {
  Icon: LucideIcon;
  className?: string;
  size?: number;
}

const DashIcon: React.FC<IDashProps> = ({
  Icon,
  className = "",
  size,
  ...props
}) => {
  return <Icon className={className} size={size} {...props} />;
};

const SidebarMenuItems: React.FC = () => {
  const pathname = usePathname();
  const session = useSession();
  const { role } = session.data?.user || {};

  const sidebarMenu = [
    {
      groupName: "Working Space",
      items: [
        { name: "Overview", url: "overview", icon: Home },
        // ...(role === "customer"
        //   ? [{ name: "Providers", url: "providers", icon: Briefcase }]
        //   : []),
        { name: "Service Request", url: "service-request", icon: Inbox },
        { name: "Appointments", url: "appointments", icon: Calendar },
        ...(role === "service_provider"
          ? [{ name: "Services", url: "services", icon: Briefcase }]
          : []),
        ...(role === "admin"
          ? [{ name: "Users", url: "users", icon: Briefcase }]
          : []),
      ],
    },
    {
      groupName: "Personal",
      items: [{ name: "Settings", url: "settings/account", icon: Settings }],
    },
  ];

  return (
    <div className="h-[calc(100vh-162px)] px-4">
      <ul className="flex flex-col gap-4 ">
        {sidebarMenu.map((group, index) => (
          <li key={index} className="w-full ">
            <div className="">
              <p className="mb-4 text-sm font-semibold ">{group.groupName}</p>
              <div className="flex flex-col gap-4">
                {group.items.map((item, index2) => (
                  <Link
                    href={`/dashboard/${item.url as string}`}
                    key={index2 + 1}
                    className={cn(
                      buttonVariants({
                        variant: pathname.includes(item.url as string)
                          ? "default"
                          : "ghost",
                      }),
                      "flex flex-row justify-between rounded-md    p-2 px-4 transition-colors  "
                    )}
                  >
                    <div className="flex items-center gap-2 ">
                      <DashIcon Icon={item.icon} size={20} />
                      <p>{item?.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenuItems;
