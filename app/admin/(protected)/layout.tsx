import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import { SidebarProvider } from "../../../components/admin/SidebarContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-coreui-darkBody">
        <Sidebar />

        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1 p-6 md:p-8 overflow-x-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}