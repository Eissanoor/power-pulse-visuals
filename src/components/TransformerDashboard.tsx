import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthSummary } from './HealthSummary';
import { OilHealthIndex } from './OilHealthIndex';
import { TemperatureMonitor } from './TemperatureMonitor';
import { NEIMonitor } from './NEIMonitor';
import { ActionPanel } from './ActionPanel';
import { TransformerDetails } from './TransformerDetails';
import { AlertTriangle } from 'lucide-react';

const TransformerDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Transformer Monitoring</h1>
          <p className="text-slate-600 mt-1">Real-time power transformer health analytics</p>
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
  );
};

export default TransformerDashboard;
