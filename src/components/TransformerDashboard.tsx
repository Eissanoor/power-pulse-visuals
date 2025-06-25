
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthSummary } from './HealthSummary';
import { OilHealthIndex } from './OilHealthIndex';
import { TemperatureMonitor } from './TemperatureMonitor';
import { NEIMonitor } from './NEIMonitor';
import { ActionPanel } from './ActionPanel';
import { TransformerDetails } from './TransformerDetails';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AlertTriangle } from 'lucide-react';

const TransformerDashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 -m-4">
        <div className="max-w-full mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Transformer Monitoring</h1>
                <p className="text-slate-600 mt-1">Real-time power transformer health analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <AlertTriangle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">ALARMS: 0</span>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <HealthSummary />
              <OilHealthIndex />
              <NEIMonitor />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <TemperatureMonitor />
              <ActionPanel />
              <TransformerDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformerDashboard;
