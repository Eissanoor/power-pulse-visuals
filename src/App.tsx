
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
              <header className="flex h-16 shrink-0 items-center gap-4 border-b px-4 bg-white shadow-sm">
                <SidebarTrigger className="h-12 w-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center border-2 border-blue-200 hover:border-blue-300">
                  <div className="flex flex-col gap-1">
                    <div className="w-5 h-0.5 bg-white rounded-full"></div>
                    <div className="w-5 h-0.5 bg-white rounded-full"></div>
                    <div className="w-5 h-0.5 bg-white rounded-full"></div>
                  </div>
                </SidebarTrigger>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-700">Advanced Assets Monitoring</div>
                    <div className="text-sm text-slate-500">Powered by AI Intelligence</div>
                  </div>
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
