
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import SwitchgearPage from "./pages/SwitchgearPage";
import PowerCablePage from "./pages/PowerCablePage";
import RotatingMachinePage from "./pages/RotatingMachinePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white shadow-sm">
                <SidebarTrigger className="h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center" />
                <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
                  <span>Advanced Assets Monitoring</span>
                </div>
              </header>
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/switchgear" element={<SwitchgearPage />} />
                  <Route path="/power-cable" element={<PowerCablePage />} />
                  <Route path="/rotating-machine" element={<RotatingMachinePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
