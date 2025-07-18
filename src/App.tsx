
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import SwitchgearPage from "./pages/SwitchgearPage";
import PowerCablePage from "./pages/PowerCablePage";
import RotatingMachinePage from "./pages/RotatingMachinePage";
import TemperatureHumidityPage from "./pages/TemperatureHumidityPage";
import VibrationPage from "./pages/VibrationPage";
import GasLeakPage from "./pages/GasLeakPage";
import MotionDetectionPage from "./pages/MotionDetectionPage";
import SoilMoisturePage from "./pages/SoilMoisturePage";
import NPKSensorPage from "./pages/NPKSensorPage";
import ESP32CamPage from "./pages/ESP32CamPage";
import FuelLevelPage from "./pages/FuelLevelPage";
import BuzzerPage from "./pages/BuzzerPage";
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
            <SidebarInset className="flex-1 w-full overflow-hidden">
              <div className="w-full h-full">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/switchgear" element={<SwitchgearPage />} />
                  <Route path="/power-cable" element={<PowerCablePage />} />
                  <Route path="/rotating-machine" element={<RotatingMachinePage />} />
                  <Route path="/available-sensor/temperature-humidity" element={<TemperatureHumidityPage />} />
                  <Route path="/available-sensor/vibrations-sensor" element={<VibrationPage />} />
                  <Route path="/available-sensor/gas-leak" element={<GasLeakPage />} />
                  <Route path="/available-sensor/motion-detection" element={<MotionDetectionPage />} />
                  <Route path="/available-sensor/esp32-cam" element={<ESP32CamPage />} />
                  <Route path="/available-sensor/fuel-level" element={<FuelLevelPage />} />
                  <Route path="/available-sensor/buzzer" element={<BuzzerPage />} />
                  <Route path="/available-sensor/soil-moisture" element={<SoilMoisturePage />} />
                  <Route path="/available-sensor/npk-sensor" element={<NPKSensorPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
