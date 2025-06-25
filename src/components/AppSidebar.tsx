
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
  Meter,
  Power
} from 'lucide-react';

const menuItems = [
  {
    title: 'Power Transformer',
    path: '/',
    icon: Zap,
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
    icon: Meter,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isExpanded = (title: string) => expandedItems.includes(title);

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Advanced Assets Monitoring</h2>
            <p className="text-xs text-slate-600">Powered by AI</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>List of Assets</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
                        className="w-full"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {isExpanded(item.title) ? (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                      {isExpanded(item.title) && (
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                onClick={() => navigate(subItem.path)}
                                isActive={location.pathname === subItem.path}
                              >
                                <span>{subItem.title}</span>
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
                      className="w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
