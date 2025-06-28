import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { createContext, useState } from "react";
import Index from "./pages/Index";
import SwitchgearPage from "./pages/SwitchgearPage";
import PowerCablePage from "./pages/PowerCablePage";
import RotatingMachinePage from "./pages/RotatingMachinePage";
import NotFound from "./pages/NotFound";

// Create a context for sidebar state
export const SidebarStateContext = createContext({
  isOpen: true,
  setIsOpen: (value: boolean) => {}
});

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarStateContext.Provider value={{ isOpen: sidebarOpen, setIsOpen: setSidebarOpen }}>
            <SidebarProvider>
              <div className="min-h-screen flex w-full overflow-hidden">
                <AppSidebar />
                <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-12' : 'ml-0'} overflow-x-hidden`}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/switchgear" element={<SwitchgearPage />} />
                    <Route path="/power-cable" element={<PowerCablePage />} />
                    <Route path="/rotating-machine" element={<RotatingMachinePage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </SidebarProvider>
          </SidebarStateContext.Provider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
