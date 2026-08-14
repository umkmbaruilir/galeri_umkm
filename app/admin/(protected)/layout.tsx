import Sidebar from "../../../components/admin/Sidebar";
import { SidebarProvider } from "../../../components/admin/SidebarContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}