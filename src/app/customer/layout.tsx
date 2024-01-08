import Navbar from "@/components/admin/Navbar";
import Profile from "@/components/customer/sidebar/Profile";
import SidebarMenuItems from "@/components/customer/sidebar/SidebarMenuItems";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={`fixed bottom-0 left-0 top-0 z-50 flex  w-72 flex-col  border bg-background  transition-transform duration-300 md:translate-x-0`}
      >
        <div className="mx-4 flex items-center justify-between md:justify-center">
          <a href="#" className="flex h-20  items-center"></a>
          <h1 className="text-2xl font-black">
            <span className="text-primary">MiJo </span> Express
          </h1>
          {/* <X
						onClick={closeSidebar}
						className="block cursor-pointer md:hidden"
					/> */}
        </div>
        <ScrollArea>
          <SidebarMenuItems />
        </ScrollArea>
        <Profile />
      </div>

      <div className="ml-72 w-full ">
        <Navbar />
        <ScrollArea className="h-[calc(100vh-72.8px)]">{children}</ScrollArea>
      </div>
    </div>
  );
}
