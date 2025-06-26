
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
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white/80 backdrop-blur-sm">
                <SidebarTrigger className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200" />
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
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
