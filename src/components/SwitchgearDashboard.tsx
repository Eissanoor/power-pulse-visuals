
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SwitchgearHealthSummary } from './SwitchgearHealthSummary';
import { PartialDischargeMonitor } from './PartialDischargeMonitor';
import { SwitchgearTemperature } from './SwitchgearTemperature';
import { SwitchgearDetails } from './SwitchgearDetails';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AlertTriangle } from 'lucide-react';

const SwitchgearDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Switchgear Monitoring</h1>
              <p className="text-slate-600 mt-1">ES-FTZ943-04 H01/2 (BD) - Google Data Center</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="text-red-700 font-medium">ALARMS: 30k</span>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <SwitchgearHealthSummary />
            <PartialDischargeMonitor />
            <SwitchgearTemperature />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SwitchgearDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchgearDashboard;
