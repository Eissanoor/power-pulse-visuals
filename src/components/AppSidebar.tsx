
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
import { Zap, Activity, Cable, Settings, ChevronDown, ChevronRight } from 'lucide-react';

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
    title: 'Power Cable',
    path: '/power-cable',
    icon: Cable,
  },
  {
    title: 'Rotating Machine',
    path: '/rotating-machine',
    icon: Activity,
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
