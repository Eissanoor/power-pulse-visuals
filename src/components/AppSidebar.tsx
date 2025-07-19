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
  SidebarTrigger,
  useSidebar,
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
    title: 'My ioT Devices',
    path: '/my-iot-devices',
    icon: Gauge,
    subItems: [
      { 
        title: 'Industrial Equipment\'s', 
        path: '/my-iot-devices/industrial-equipment',
        subItems: [
          { title: 'Gas Leak', path: '/available-sensor/gas-leak' },
          { title: 'Temperature & Humidity', path: '/available-sensor/temperature-humidity' },
          { title: 'Vibrations Sensor', path: '/available-sensor/vibrations-sensor' },
          { title: 'Motion Detection', path: '/available-sensor/motion-detection' },
          { title: 'ESP32-cam', path: '/available-sensor/esp32-cam' },
          { title: 'Fuel Level', path: '/available-sensor/fuel-level' },
          { title: 'Buzzer', path: '/available-sensor/buzzer' },
        ]
      },
      { 
        title: 'Smart Agriculture', 
        path: '/my-iot-devices/smart-agriculture',
        subItems: [
          { title: 'Soil Moisture', path: '/available-sensor/soil-moisture' },
          { title: 'NPK Sensor', path: '/available-sensor/npk-sensor' },
        ]
      },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { open } = useSidebar();

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isExpanded = (title: string) => expandedItems.includes(title);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border bg-gradient-to-r from-sidebar-background to-sidebar-accent">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-100 shrink-0">
            <Zap className="h-6 w-6 text-white" />
          </div>
          {open && (
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-sidebar-foreground leading-tight">
                Advanced Assets Monitoring
              </h2>
              <p className="text-xs text-sidebar-foreground/70 mt-0.5 font-medium">
                Powered by AI Intelligence
              </p>
            </div>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      
      <SidebarContent className="bg-gradient-to-b from-sidebar-background to-sidebar-accent overflow-y-auto">
        {open ? (
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-xs font-bold text-sidebar-foreground/70 uppercase tracking-wider">
              Asset Categories
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu className="space-y-1">
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
                          className="w-full min-h-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent hover:shadow-sm border border-transparent hover:border-sidebar-border/50 group"
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0 text-sidebar-foreground/70 group-hover:text-sidebar-foreground transition-colors duration-200" />
                          <div className="flex-1 text-left text-sidebar-foreground group-hover:text-sidebar-foreground font-medium leading-tight whitespace-normal pr-2">
                            {item.title}
                          </div>
                          {isExpanded(item.title) ? (
                            <ChevronDown className="h-4 w-4 flex-shrink-0 transition-all duration-200 text-sidebar-foreground/60" />
                          ) : (
                            <ChevronRight className="h-4 w-4 flex-shrink-0 transition-all duration-200 text-sidebar-foreground/60" />
                          )}
                        </SidebarMenuButton>
                        {isExpanded(item.title) && (
                          <SidebarMenuSub className="mt-1 ml-2 space-y-1 border-l-2 border-sidebar-border pl-3">
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                {subItem.subItems ? (
                                  <>
                                    <SidebarMenuSubButton
                                      onClick={() => {
                                        toggleExpanded(subItem.title);
                                        navigate(subItem.path);
                                      }}
                                      isActive={location.pathname === subItem.path || location.pathname.startsWith(subItem.path + '/')}
                                      className="min-h-[2rem] px-2 py-1.5 rounded-md text-sm transition-all duration-200 hover:bg-sidebar-accent hover:shadow-sm border border-transparent hover:border-sidebar-border/30 w-full text-left flex items-center"
                                    >
                                      <div className="flex-1 text-sidebar-foreground/80 hover:text-sidebar-foreground leading-tight font-medium whitespace-normal">
                                        {subItem.title}
                                      </div>
                                      {isExpanded(subItem.title) ? (
                                        <ChevronDown className="h-3 w-3 flex-shrink-0 transition-all duration-200 text-sidebar-foreground/50" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3 flex-shrink-0 transition-all duration-200 text-sidebar-foreground/50" />
                                      )}
                                    </SidebarMenuSubButton>
                                    {isExpanded(subItem.title) && (
                                      <div className="mt-1 ml-3 space-y-1 border-l border-sidebar-border pl-3">
                                        {subItem.subItems.map((subSubItem) => (
                                          <div key={subSubItem.title}>
                                            <button
                                              onClick={() => navigate(subSubItem.path)}
                                              className={`min-h-[1.75rem] px-2 py-1 rounded-sm text-xs transition-all duration-200 hover:bg-sidebar-accent border border-transparent hover:border-sidebar-border/20 w-full text-left flex items-center ${
                                                location.pathname === subSubItem.path 
                                                  ? "bg-sidebar-accent text-sidebar-primary border-sidebar-border font-medium" 
                                                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                                              }`}
                                            >
                                              <div className="flex-1 leading-tight whitespace-normal">
                                                {subSubItem.title}
                                              </div>
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <SidebarMenuSubButton
                                    onClick={() => navigate(subItem.path)}
                                    isActive={location.pathname === subItem.path}
                                    className="min-h-[2rem] px-2 py-1.5 rounded-md text-sm transition-all duration-200 hover:bg-sidebar-accent hover:shadow-sm border border-transparent hover:border-sidebar-border/30 w-full text-left flex items-center"
                                  >
                                    <div className="flex-1 text-sidebar-foreground/80 hover:text-sidebar-foreground leading-tight font-medium whitespace-normal">
                                      {subItem.title}
                                    </div>
                                  </SidebarMenuSubButton>
                                )}
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </>
                    ) : (
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        isActive={location.pathname === item.path}
                        className="w-full min-h-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent hover:shadow-sm border border-transparent hover:border-sidebar-border/50 group"
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0 text-sidebar-foreground/70 group-hover:text-sidebar-foreground transition-colors duration-200" />
                        <div className="flex-1 text-left text-sidebar-foreground group-hover:text-sidebar-foreground font-medium leading-tight whitespace-normal">
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
          <div className="flex flex-col items-center space-y-2 px-2 pt-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <div key={item.title} className="relative group w-full">
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    isActive={isActive}
                    className="flex items-center justify-center h-10 w-full rounded-lg transition-all duration-200"
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                  </SidebarMenuButton>
                </div>
              );
            })}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}