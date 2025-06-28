import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthSummary } from './HealthSummary';
import { OilHealthIndex } from './OilHealthIndex';
import { TemperatureMonitor } from './TemperatureMonitor';
import { NEIMonitor } from './NEIMonitor';
import { ActionPanel } from './ActionPanel';
import { TransformerDetails } from './TransformerDetails';
import { AlertTriangle } from 'lucide-react';
import { SidebarStateContext } from '@/App';

const TransformerDashboard = () => {
  const { isOpen } = useContext(SidebarStateContext);

  return (
    <div className="p-4 md:p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Transformer Monitoring</h1>
          <p className="text-slate-600 mt-1">Real-time power transformer health analytics</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
          <AlertTriangle className="h-5 w-5 text-green-600" />
          <span className="text-green-700 font-medium">ALARMS: 0</span>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className={`grid gap-4 md:gap-6 ${
        isOpen 
          ? 'grid-cols-1 lg:grid-cols-3' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {/* Left Column - adjusts based on sidebar state */}
        <div className={`${
          isOpen 
            ? 'lg:col-span-2' 
            : 'lg:col-span-2 xl:col-span-3'
        } space-y-4 md:space-y-6`}>
          <HealthSummary />
          <OilHealthIndex />
          <NEIMonitor />
        </div>

        {/* Right Column */}
        <div className="space-y-4 md:space-y-6">
          <TemperatureMonitor />
          <ActionPanel />
          <TransformerDetails />
        </div>
      </div>
    </div>
  );
};

export default TransformerDashboard;
