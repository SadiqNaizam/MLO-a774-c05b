import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title = "Filters", children, className = "" }) => {
  console.log("Rendering Sidebar with title:", title);

  return (
    <aside className={`w-full md:w-64 lg:w-72 space-y-6 p-4 border-r sticky top-16 h-[calc(100vh-4rem)] ${className}`}> {/* Adjust top based on header height */}
      {title && (
        <>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <Separator className="my-4" />
        </>
      )}
      <ScrollArea className="h-[calc(100%-4rem)] pr-3"> {/* Adjust height based on title presence and padding */}
        <div className="space-y-5">
          {children ? children : (
            <p className="text-muted-foreground">No filters available.</p>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};
export default Sidebar;