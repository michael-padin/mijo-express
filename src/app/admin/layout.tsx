import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
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

          {/* <X
						onClick={closeSidebar}
						className="block cursor-pointer md:hidden"
					/> */}
        </div>
        <ScrollArea>
          <Sidebar />
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <h3 className="font-semibold">Dr John Smith</h3>
              <p className="text-sm">drsmith@smithdental.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-72 w-full ">
        <Navbar />
        <ScrollArea className="h-[calc(100vh-69px)]">{children}</ScrollArea>
      </div>
    </div>
  );
}
