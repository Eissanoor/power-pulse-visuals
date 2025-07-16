import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { 
  Zap, 
  Activity, 
  Cable, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  Wrench,
  Shield,
  Lightbulb,
  Battery,
  Cog,
  Power,
  Radio,
  Menu,
  X,
  Gauge
} from 'lucide-react';

const menuItems = [
  {
    title: 'Power Generation & Transmission Equipment',
    path: '/',
    icon: Radio,
    subItems: [
      { title: 'HV Generators', path: '/power-generation-transmission/hv-generators' },
      { title: 'HV Circuit Breakers', path: '/power-generation-transmission/hv-circuit-breakers' },
      { title: 'Disconnectors (Isolators)', path: '/power-generation-transmission/disconnectors' },
      { title: 'Earthing Switches', path: '/power-generation-transmission/earthing-switches' },
      { title: 'Current Transformers (CTs)', path: '/power-generation-transmission/current-transformers' },
      { title: 'Voltage Transformers (VTs) & Capacitive Voltage Transformers (CVTs)', path: '/power-generation-transmission/voltage-transformers' },
      { title: 'Surge Arresters (Lightning Arresters)', path: '/power-generation-transmission/surge-arresters' },
      { title: 'HV Insulators', path: '/power-generation-transmission/hv-insulators' },
      { title: 'HV Bushings', path: '/power-generation-transmission/hv-bushings' },
      { title: 'HV Power Cables', path: '/power-generation-transmission/hv-power-cables' },
      { title: 'Overhead Transmission Lines & Towers', path: '/power-generation-transmission/overhead-transmission-lines' },
      { title: 'Gas-Insulated Switchgear (GIS)', path: '/power-generation-transmission/gas-insulated-switchgear' },
      { title: 'Hybrid Gas-Insulated Switchgear (HGIS)', path: '/power-generation-transmission/hybrid-gas-insulated-switchgear' },
    ],
  },
  {
    title: 'Substation Equipment',
    path: '/substation-equipment',
    icon: Zap,
    subItems: [
      { title: 'Power Transformers', path: '/substation-equipment/power-transformers' },
      { title: 'Autotransformers', path: '/substation-equipment/autotransformers' },
      { title: 'Reactors (Shunt & Series)', path: '/substation-equipment/reactors' },
      { title: 'HV Capacitor Banks', path: '/substation-equipment/hv-capacitor-banks' },
      { title: 'Static VAR Compensators (SVCs)', path: '/substation-equipment/static-var-compensators' },
      { title: 'Flexible AC Transmission Systems (FACTS) Devices', path: '/substation-equipment/facts-devices' },
      { title: 'HV Relays & Protection Systems', path: '/substation-equipment/hv-relays-protection' },
      { title: 'Synchronizing Panels', path: '/substation-equipment/synchronizing-panels' },
      { title: 'HV Busbars & Bus Ducts', path: '/substation-equipment/hv-busbars-bus-ducts' },
    ],
  },
  {
    title: 'Industrial & Specialized HV Equipment',
    path: '/industrial-specialized-hv',
    icon: Activity,
    subItems: [
      { title: 'HV Motors', path: '/industrial-specialized-hv/hv-motors' },
      { title: 'HV Variable Frequency Drives (VFDs)', path: '/industrial-specialized-hv/hv-vfds' },
      { title: 'HV Switchgear Panels', path: '/industrial-specialized-hv/hv-switchgear-panels' },
      { title: 'Ring Main Units (RMUs)', path: '/industrial-specialized-hv/ring-main-units' },
      { title: 'HV Fuses (Expulsion, Current-limiting)', path: '/industrial-specialized-hv/hv-fuses' },
      { title: 'HV Test Equipment', path: '/industrial-specialized-hv/hv-test-equipment' },
      { title: 'HV DC Equipment', path: '/industrial-specialized-hv/hv-dc-equipment' },
    ],
  },
  {
    title: 'Renewable Energy HV Assets',
    path: '/renewable-energy-hv',
    icon: Battery,
    subItems: [
      { title: 'HV Wind Turbine Transformers', path: '/renewable-energy-hv/wind-turbine-transformers' },
      { title: 'Solar Farm Step-up Transformers', path: '/renewable-energy-hv/solar-farm-transformers' },
      { title: 'HV Grid-Tie Inverters', path: '/renewable-energy-hv/hv-grid-tie-inverters' },
    ],
  },
  {
    title: 'Railway & Traction HV Systems',
    path: '/railway-traction-hv',
    icon: Cable,
    subItems: [
      { title: 'Overhead Catenary Systems (OCS)', path: '/railway-traction-hv/overhead-catenary-systems' },
      { title: 'Traction Substations', path: '/railway-traction-hv/traction-substations' },
      { title: 'Railway Autotransformers', path: '/railway-traction-hv/railway-autotransformers' },
    ],
  },
  {
    title: 'Power Distribution & Protection Equipment',
    path: '/switchgear',
    icon: Settings,
    subItems: [
      { title: 'LV Circuit Breakers', path: '/switchgear/lv-circuit-breakers' },
      { title: 'LV Switchgear Panels', path: '/switchgear/lv-switchgear-panels' },
      { title: 'Isolators & Disconnect Switches', path: '/switchgear/isolators-disconnect-switches' },
      { title: 'Fuses (LV Type)', path: '/switchgear/fuses-lv-type' },
      { title: 'Surge Protection Devices (SPDs)', path: '/switchgear/surge-protection-devices' },
      { title: 'Current Transformers (CTs) for LV', path: '/switchgear/current-transformers-lv' },
      { title: 'LV Busbars & Bus Ducts', path: '/switchgear/lv-busbars-bus-ducts' },
      { title: 'Power Factor Correction (PFC) Units', path: '/switchgear/power-factor-correction-units' },
    ],
  },
  {
    title: 'Wiring & Connection Components',
    path: '/wiring-connection',
    icon: Cable,
    subItems: [
      { title: 'LV Cables', path: '/wiring-connection/lv-cables' },
      { title: 'Cable Trays & Conduits', path: '/wiring-connection/cable-trays-conduits' },
      { title: 'Terminal Blocks & Connectors', path: '/wiring-connection/terminal-blocks-connectors' },
      { title: 'Plug & Socket Outlets', path: '/wiring-connection/plug-socket-outlets' },
      { title: 'Junction Boxes & Distribution Boxes', path: '/wiring-connection/junction-distribution-boxes' },
    ],
  },
  {
    title: 'Control & Automation Equipment',
    path: '/control-automation',
    icon: Wrench,
    subItems: [
      { title: 'Contactors & Relays', path: '/control-automation/contactors-relays' },
      { title: 'Motor Starters', path: '/control-automation/motor-starters' },
      { title: 'Programmable Logic Controllers (PLCs)', path: '/control-automation/plcs' },
      { title: 'Human-Machine Interfaces (HMIs)', path: '/control-automation/hmis' },
      { title: 'Sensors & Actuators', path: '/control-automation/sensors-actuators' },
      { title: 'LV Control Panels', path: '/control-automation/lv-control-panels' },
    ],
  },
  {
    title: 'LV Motors & Drives',
    path: '/motors-drives',
    icon: Activity,
    subItems: [
      { title: 'LV Induction Motors', path: '/motors-drives/lv-induction-motors' },
      { title: 'LV Servo & Stepper Motors', path: '/motors-drives/lv-servo-stepper-motors' },
      { title: 'LV Variable Frequency Drives (VFDs)', path: '/motors-drives/lv-vfds' },
      { title: 'Gear Motors & Brake Motors', path: '/motors-drives/gear-brake-motors' },
    ],
  },
  {
    title: 'Lighting & Auxiliary Systems',
    path: '/lighting-auxiliary',
    icon: Lightbulb,
    subItems: [
      { title: 'LED & Fluorescent Lighting Fixtures', path: '/lighting-auxiliary/led-fluorescent-fixtures' },
      { title: 'Emergency Lighting & Exit Signs', path: '/lighting-auxiliary/emergency-lighting-exit-signs' },
      { title: 'Battery Backup Systems (UPS)', path: '/lighting-auxiliary/battery-backup-ups' },
      { title: 'LV Inverters & Solar PV Systems', path: '/lighting-auxiliary/lv-inverters-solar-pv' },
    ],
  },
  {
    title: 'Safety & Testing Equipment',
    path: '/safety-testing',
    icon: Shield,
    subItems: [
      { title: 'Earth Leakage Detectors', path: '/safety-testing/earth-leakage-detectors' },
      { title: 'Insulation Testers (Meggers)', path: '/safety-testing/insulation-testers-meggers' },
      { title: 'Multimeters & Clamp Meters', path: '/safety-testing/multimeters-clamp-meters' },
      { title: 'Portable Residual Current Devices (PRCDs)', path: '/safety-testing/portable-rcd-devices' },
    ],
  },
  {
    title: 'Renewable & Residential LV Assets',
    path: '/renewable-residential',
    icon: Battery,
    subItems: [
      { title: 'Solar Inverters (String & Microinverters)', path: '/renewable-residential/solar-inverters' },
      { title: 'LV Distribution Boards (DBs) for Homes/Offices', path: '/renewable-residential/lv-distribution-boards' },
      { title: 'Smart Meters & Energy Monitors', path: '/renewable-residential/smart-meters-energy-monitors' },
      { title: 'EV Charging Stations (AC Type – 230V/400V)', path: '/renewable-residential/ev-charging-stations' },
    ],
  },
  {
    title: 'Power Cable',
    path: '/power-cable',
    icon: Power,
  },
  {
    title: 'Rotating Machine',
    path: '/rotating-machine',
    icon: Cog,
  },
  {
    title: 'Available Sensor',
    path: '/available-sensor',
    icon: Gauge,
    subItems: [
      { title: 'temperature & Humidity', path: '/available-sensor/temperature-humidity' },
      { title: 'ESP32-cam', path: '/available-sensor/esp32-cam' },
      { title: 'Gas leak', path: '/available-sensor/gas-leak' },
      { title: 'Vibrations Sensor', path: '/available-sensor/vibrations-sensor' },
      { title: 'fuel level', path: '/available-sensor/fuel-level' },
      { title: 'buzzer', path: '/available-sensor/buzzer' },
      { title: 'motion Detection', path: '/available-sensor/motion-detection' },
      { title: 'Soil moisture', path: '/available-sensor/soil-moisture' },
      { title: 'Rely', path: '/available-sensor/rely' },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isExpanded = (title: string) => expandedItems.includes(title);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sidebar className={`transition-all duration-300 ${isOpen ? "w-96" : "w-24"} border-r border-slate-200`}>
      <div className="absolute right-0 top-6 transform translate-x-1/2 z-10">
        <button 
          onClick={toggleSidebar}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <SidebarHeader className={`p-6 border-b border-sidebar-border bg-gradient-to-r from-slate-50 to-blue-50 ${isOpen ? "" : "flex justify-center"}`}>
        <div className={`flex items-center ${isOpen ? "gap-3" : "justify-center"}`}>
          <div className="h-12 w-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-100">
            <Zap className="h-7 w-7 text-white" />
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-slate-800 leading-tight">
                Advanced Assets Monitoring
              </h2>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Powered by AI Intelligence
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-6 bg-gradient-to-b from-white to-slate-50 overflow-y-auto">
        {isOpen ? (
          <SidebarGroup>
            <SidebarGroupLabel className="px-6 py-4 text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 mb-4 bg-slate-50/50">
              Asset Categories
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-4">
              <SidebarMenu className="space-y-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.subItems ? (
                      <>
                        <SidebarMenuButton
                          onClick={() => {
                            toggleExpanded(item.title);
                            navigate(item.path);
                          }}
                          isActive={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
                          className="w-full min-h-[3.5rem] px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md border border-transparent hover:border-blue-200/50 group"
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
                          <div className="flex-1 text-left text-slate-700 group-hover:text-slate-900 font-medium leading-tight whitespace-normal pr-2">
                            {item.title}
                          </div>
                          {isExpanded(item.title) ? (
                            <ChevronDown className="h-4 w-4 flex-shrink-0 transition-all duration-300 text-slate-500 group-hover:text-blue-600" />
                          ) : (
                            <ChevronRight className="h-4 w-4 flex-shrink-0 transition-all duration-300 text-slate-500 group-hover:text-blue-600" />
                          )}
                        </SidebarMenuButton>
                        {isExpanded(item.title) && (
                          <SidebarMenuSub className="mt-3 ml-2 space-y-1 border-l-2 border-blue-100 pl-3 animate-in slide-in-from-top-2 duration-300">
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  onClick={() => navigate(subItem.path)}
                                  isActive={location.pathname === subItem.path}
                                  className="min-h-[2.5rem] px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 hover:shadow-sm border border-transparent hover:border-blue-100 w-full text-left flex items-center"
                                >
                                  <div className="flex-1 text-slate-600 hover:text-slate-900 leading-tight font-medium whitespace-normal">
                                    {subItem.title}
                                  </div>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        isActive={location.pathname === item.path}
                        className="w-full min-h-[3.5rem] px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md border border-transparent hover:border-blue-200/50 group"
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
                        <div className="flex-1 text-left text-slate-700 group-hover:text-slate-900 font-medium leading-tight whitespace-normal">
                          {item.title}
                        </div>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <div className="flex flex-col items-center space-y-4 px-2 pt-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <div key={item.title} className="relative group w-full">
                  <button
                    onClick={() => navigate(item.path)}
                    className={`flex items-center justify-center h-14 w-full rounded-xl ${
                      isActive 
                        ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-md border border-blue-200" 
                        : "bg-white shadow-sm border border-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                    } transition-all duration-200`}
                  >
                    <item.icon className="h-5 w-5" />
                    {isActive && <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>}
                  </button>
                  <div className="absolute left-full ml-2 px-3 py-1.5 bg-white shadow-lg rounded-md text-sm font-medium text-slate-700 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                    {item.title}
                    {item.subItems && (
                      <span className="ml-1.5 text-xs text-slate-400">({item.subItems.length})</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
